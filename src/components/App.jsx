import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import CancelIcon from "@material-ui/icons/Cancel";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function App() {
  const [notes, setNotes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentNote, setCurrentNote] = useState({});
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(page - 1);

  const addNote = (newNote) => {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  };

  const deleteNote = (i) => {
    setIsEdit(false);
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== i;
      });
    });
  };
  const editNote = (i) => {
    setId(i);
    setIsEdit(true);
    setCurrentNote(...notes.filter((item, index) => index === i));
  };

  const handleInputEdit = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    var res = notes.map((item, index) =>
      index === id ? { ...currentNote } : { ...item }
    );
    setNotes([...res]);
    setIsEdit(false);
  };

  const handleCancel = (e) => {
    setIsEdit(false);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const handleBookmark = (i) => {
    var data = notes.map((item, index) => {
      if (index === i) {
        return { ...item, isBookmark: !item.isBookmark };
      } else {
        return { ...item };
      }
    });
    setNotes([...data]);
  };

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.slice((page - 1) * 6, page * 6) &&
        notes.slice((page - 1) * 6, page * 6).map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
              onEdit={() => editNote((page - 1) * 6 + index)}
              isEdit={isEdit}
              isBookmark={noteItem.isBookmark}
              onBookmark={() => handleBookmark((page - 1) * 6 + index)}
              // className={isEdit ? "hide-note" : ""}
            />
          );
        })}
      {/* pop-up */}
      <div className={isEdit ? "edit-window" : "hide-window"}>
        <span onClick={handleCancel} className="cancel-button">
          <CancelIcon />
        </span>
        <form className="form-popup">
          <label>
            Tilte:
            <input
              type="text"
              name="title"
              value={currentNote.title}
              onChange={handleInputEdit}
            />
          </label>
          <br />
          <label>
            Content:
            <input
              type="text"
              name="content"
              value={currentNote.content}
              onChange={handleInputEdit}
            />
          </label>
        </form>
        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </div>
      {/*  */}
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination
          count={Math.ceil(notes.length / 6)}
          page={page}
          onChange={handleChangePage}
        />
      </Stack>
      <Footer />
    </div>
  );
}

export default App;
