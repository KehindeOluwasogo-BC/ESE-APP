import { useState } from "react";

function Form(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  function handleSubmit(event) {
    event.preventDefault();
    props.addTask(title, description);
    setTitle("");
    setDescription("");
  }

  function handleChange(event) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={title}
        onChange={handleChange}
      />
      <label htmlFor="new-todo-description" className="label__lg">
        Description (optional)
      </label>
      <textarea
        id="new-todo-description"
        className="input input__lg"
        name="description"
        rows="3"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
