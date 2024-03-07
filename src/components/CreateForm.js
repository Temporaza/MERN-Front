import notesStore from "../stores/notesStore";
import '../CSS/CreateForm.css'

export default function CreateForm() {
  const store = notesStore();

  if (store.updateForm._id) return <></>;
  

  return (
    <div className="createFormContainer">
      <h2>Create a New Book</h2>
      <form onSubmit={store.createNote} className="createForm">
        <div className="formGroup">
          <label htmlFor="title">Book Title:</label>
          <input
            type="text"
            id="title"
            onChange={store.updateCreateFormField}
            value={store.createForm.title}
            name="title"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="body">Book Type:</label>
          <textarea
            id="body"
            onChange={store.updateCreateFormField}
            value={store.createForm.body}
            name="body"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="skills">Genres (comma-separated):</label>
            <div className="skillsContainer">
              {store.createForm.skills && store.createForm.skills.split(',').map((skill, index) => (
                <span key={index} className="skillBubble">{skill}</span>
              ))}
            </div>
            <input
              type="text"
              id="skills"
              onChange={store.updateCreateFormField}
              value={store.createForm.skills || ""}
              name="skills"
            />
        </div>
          <button className="button" type="submit">Create Book</button>
      </form>
    </div>
  );
}