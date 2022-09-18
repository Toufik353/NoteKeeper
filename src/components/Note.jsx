import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

const Note = (props) => {
  const handleClick = () => {
    props.onDelete(props.id);
  };

  return (
    <div className={props.isEdit === false ? "note" : "hide-note"}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button onClick={props.onEdit}>
        <EditIcon />
      </button>

      <button onClick={props.onBookmark}>
        {props.isBookmark ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </button>
    </div>
  );
};

export default Note;
