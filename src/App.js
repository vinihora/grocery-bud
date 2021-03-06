import "./App.css";
import { React, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [actualTask, setActualTask] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [show, setShow] = useState("none");

  const clearAll = () => {
    setTasks([]);
    setMessage("Empty List");
    setColor("#ffd4dc");
  };

  const addTask = () => {
    if (actualTask === "") {
      setMessage("Please Enter Value");
      setColor("#ffd4dc");
      return;
    }
    if (edit) {
      tasks[id] = actualTask;
      setTasks([...tasks]);
      setEdit(false);
      setMessage("Value Changed");
      setColor("#d8ecdc");
      return;
    }
    setMessage("Item Added To The List");
    setColor("#d8ecdc");
    setActualTask("");
    setTasks([...tasks, actualTask]);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setActualTask(e.target.value);
  };

  const excludeTask = (count) => {
    tasks.splice(count, 1);
    setMessage("Item Removed");
    setColor("#ffd4dc");
    setTasks([...tasks]);
  };

  const editTask = (count) => {
    setActualTask(tasks[count]);
    setId(count);
    setEdit(true);
  };

  useEffect(() => {
    console.log(tasks.length);
    if (tasks.length !== 0) {
      return setShow("flex");
    }
    setShow("none");
  }, [tasks]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage("");
      setColor("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <section className="body">
      <div className="card">
        <div className="notification" style={{ background: color }}>
          {message}
        </div>
        <h1>Grocery Bud</h1>
        <div className="search-line">
          <input
            type="text"
            placeholder="e.g eggs"
            onChange={handleChange}
            id="searchInput"
            value={actualTask}
          ></input>
          <button className="btn" onClick={() => addTask()} type="submit">
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
        <div class="clear">
          <button
            class="btn-warn"
            style={{ display: show }}
            onClick={() => clearAll()}
          >
            <h4>Clear Items</h4>
          </button>
        </div>
      </div>
    </section>
  );
};

export default App;
