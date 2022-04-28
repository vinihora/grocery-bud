import "./App.css";
import { React, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [actualTask, setActualTask] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const addTask = () => {
    if (edit) {
      tasks[id] = actualTask;
      setTasks([...tasks]);
      setEdit(false);
      return;
    }
    setTasks([...tasks, actualTask]);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setActualTask(e.target.value);
  };

  const excludeTask = (count) => {
    tasks.splice(count, 1);
    setTasks([...tasks]);
  };

  const editTask = (count) => {
    setActualTask(tasks[count]);
    setId(count);
    setEdit(true);
  };

  return (
    <section className="body">
      <div className="card">
        <h1>Grocery Bud</h1>
        <div className="search-line">
          <input
            type="text"
            placeholder="e.g eggs"
            onChange={handleChange}
            id="searchInput"
            value={actualTask}
          ></input>
          <button className="btn" onClick={() => addTask()}>
            <h5>Submit</h5>
          </button>
        </div>
        <li className="task-list">
          {tasks.map((task, count) => {
            return (
              <ul className="task">
                <h3>{task}</h3>
                <div className="icons">
                  <AiOutlineEdit
                    style={{ color: "var(--clr-green-dark)" }}
                    className="icon"
                    onClick={() => editTask(count)}
                  />
                  <FaRegTrashAlt
                    style={{ color: "var(--clr-red-dark" }}
                    className="icon"
                    onClick={() => excludeTask(count)}
                  />
                </div>
              </ul>
            );
          })}
        </li>
      </div>
    </section>
  );
};

export default App;
