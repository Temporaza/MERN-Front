import notesStore from "../stores/notesStore";
import React, { useState } from "react";
import "../CSS/Note.css";
import { FaTrash, FaEdit, FaArchive } from "react-icons/fa";

export default function Note({ note }) {
  const store = notesStore((store) => {
    return {
      deleteNote: store.deleteNote,
      toggleUpdate: store.toggleUpdate,
      archiveNote: store.archiveNote,
    };
  });

  const [loading, setLoading] = useState(false);

  const handleArchive = async (id) => {
    try {
      setLoading(true); // Set loading to true when starting the archive process
      const shouldArchive = window.confirm(
        "Are you sure you want to archive this note?"
      );
      if (shouldArchive) {
        await store.archiveNote(id);
      }
    } finally {
      setLoading(false); // Set loading to false when the process is completed
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (shouldDelete) {
      await store.deleteNote(id);
    }
  };

  return (
    <div className="noteContainer" key={note._id}>
      <div className="noteHeader">
        <div className="buttonContainer">
          <button
            className="deleteButton"
            onClick={() => handleDelete(note._id)}
          >
            <FaTrash />
          </button>
          <button
            className="updateButton"
            onClick={() => store.toggleUpdate(note)}
          >
            <FaEdit />
          </button>
          <button
            className="archiveButton"
            onClick={() => handleArchive(note._id)}
          >
            <FaArchive />
          </button>
        </div>
      </div>
      <div className="noteContent">
        <h3>Book Title: {note.title}</h3>
        <h3>Book Type: {note.body}</h3>
        {/* <p className="noteSkills">Genre: {note.skills && note.skills.join(', ')}</p> */}
        <h5>Genres: </h5>
        <div className="skillsContainer">
          {note.skills &&
            note.skills.map((skill, index) => (
              <span key={index} className="skillBubble">
                {skill}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
