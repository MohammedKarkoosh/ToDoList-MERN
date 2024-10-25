import { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";
import { CiBookmarkCheck } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get")
      .then((result) => setTodos(result.data))
      .catch((error) => console.log(error));
  }, [todos]);

  const handleCompletion = (id) => {
    axios.put("http://localhost:5000/update/" + id);
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/delete/" + id)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };
  return (
    <div className="home">
      <h2>ToDo List</h2>
      <Create />

      {todos.length === 0 ? (
        <div>
          <h2>No Todos</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div
            className="task"
            key={index}
            onClick={() => handleCompletion(todo._id)}
          >
            <div className="checkbox">
              {todo.done ? (
                <FaBookmark className="icon" />
              ) : (
                <CiBookmarkCheck className="icon" />
              )}
              <p
                className={`
                ${todo.done === true ? "completed" : ""}
                `}
              >
                {todo.task}
              </p>
            </div>
            <div>
              <span>
                <MdDelete
                  className="icon"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
