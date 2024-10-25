import { useRef, useState } from "react";
import axios from "axios";

export default function Create() {
  const [task, setTask] = useState();

  const todoListRef = useRef(null);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!task) return;
    axios
      .post("http://localhost:5000/add", { task: task })
      .then((result) => {
        console.log(result), setTask("");
        todoListRef.current.value = "";
      })
      .catch((error) => console.log(error));

    setTask(todoListRef.current);
  };

  return (
    <form className="create_form">
      <input
        type="text"
        ref={todoListRef}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task"
      />
      <button type="button" onClick={(e) => handleAdd(e)}>
        Add Task
      </button>
    </form>
  );
}
