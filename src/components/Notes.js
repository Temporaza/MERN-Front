import notesStore from "../stores/notesStore";
import Note from "./Note";

export default function Notes() {
    const store = notesStore();

    const nonArchivedNotes = store.notes ? store.notes.filter(note => !note.archived) : [];

    return(
    <div>
           <h2>Books:</h2>
            {nonArchivedNotes.map(note => (
                <Note note={note} key={note._id} />
            ))}
    </div>
    )
}