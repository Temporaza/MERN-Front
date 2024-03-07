import React, { useEffect } from "react";
import notesStore from "../stores/notesStore";
import "../CSS/Archive.css";

export default function Archive() {
  const store = notesStore((store) => {
    return {
      archivedNotes: store.archivedNotes,
      fetchArchivedNotes: store.fetchArchivedNotes,
      deleteArchivedNote: store.deleteArchivedNote,
      unArchiveNotes: store.unArchiveNotes,
    };
  });

  useEffect(() => {
    store.fetchArchivedNotes();
  }, []);

  // Filter archivedNotes to display only notes with archived set to true
  const filteredArchivedNotes = store.archivedNotes
    ? store.archivedNotes.filter((note) => note.archived)
    : [];

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this archived note?"
    );
    if (confirmDelete) {
      await store.deleteArchivedNote(_id);
    }
  };

  const handleReturnArchive = async (_id) => {
    const confirmReturn = window.confirm(
      "Are you sure you want to return this note?"
    );
    if (confirmReturn) {
      await store.unArchiveNotes(_id);
    }
  };

  return (
    <div className="list">
      <h2>Book Archives:</h2>
      <div className="note-cards">
        {filteredArchivedNotes.map((archivedNote) => (
          <div key={archivedNote._id} className="note-card">
            <div className="ArcBut">
              {/* <button onClick={() => handleDelete(archivedNote._id)}>
                Delete Book
              </button> */}
              <button onClick={() => handleReturnArchive(archivedNote._id)}>
                Return Book
              </button>
            </div>
            <h3>Book Title : {archivedNote.title}</h3>
            <h3>Book Type : {archivedNote.body}</h3>
            <h5>Genres: </h5>
            <p className="noteSkills">
              {archivedNote.skills &&
                archivedNote.skills.map((skill, index) => (
                  <span key={index} className="skillBubble">
                    {skill}
                  </span>
                ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
