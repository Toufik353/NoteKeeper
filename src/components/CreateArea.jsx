import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [isExpanded, setIsExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function showAlert() {
    const div = document.createElement("div");
    div.className = "alert error";
    div.appendChild(document.createTextNode("Please add all fields."));
    const createArea = document.querySelector(".create-area");
    const form = document.querySelector(".create-note");
    createArea.insertBefore(div, form);

    // Timeout after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  function submitNote(event) {
    // validate no empty fields
    if (note.title === "" || note.content === "") {
      // show alert
      showAlert();
    } else {
      props.onAdd(note);

      setNote({
        title: "",
        content: ""
      });
    }

    event.preventDefault();
  }

  function expand() {
    // Change display to none
    setIsExpanded(true);
    // Change rows to 3
  }

  return (
    <div className="create-area">
      <form className="create-note">
        {isExpanded && (
          <input
            className="title"
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          className="textarea"
          name="content"
          onChange={handleChange}
          onClick={expand}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
