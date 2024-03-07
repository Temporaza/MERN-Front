import notesStore from "../stores/notesStore";
import "../CSS/UpdateForm.css"

export default function UpdateForm() {
  const store = notesStore();

  if (!store.updateForm._id) return <></>;

  return (
    <div className="updateFormContainer">
      <h2>Update note</h2>
      <form onSubmit={store.updateNote} className="updateForm">
        <div className="formGroup">
          <label htmlFor="title">Book Title:</label>
          <input
            type="text"
            onChange={store.handleUpdateFieldChange}
            value={store.updateForm.title}
            name="title"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="body">Book Type:</label>
          <textarea
            onChange={store.handleUpdateFieldChange}
            value={store.updateForm.body}
            name="body"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="skills">Genres (comma-separated):</label>
          <div className="skillsContainer">
            {store.updateForm.skills &&
              store.updateForm.skills.map((skill, index) => (
                <span key={index} className="skillBubble">
                  {skill}
                </span>
              ))}
          </div>
          <input
            type="text"
            onChange={store.handleUpdateFieldChange}
            defaultValue={store.updateForm.skills && store.updateForm.skills.join(', ')}
            name="skills"
          />
        </div>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}