import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import Notes from "../components/Notes";
import UpdateForm from "../components/UpdateForm";
import CreateForm from "../components/CreateForm";
import "../CSS/NotesPage.css"

export default function NotesPage() {
    const store = notesStore();

    useEffect(() => {
        store.fetchNotes();
        },[])
      
    return (
       <div className="NotesPage">
            <div className="Notes">
            <Notes />
            </div>
            <div className="Forms">
            <UpdateForm />
            <CreateForm />
            </div>
      </div>
    )
}
