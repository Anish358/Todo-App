import { React, useState, useEffect } from "react";
import "./App.css";
import Task from "./Components/Task";
import axios from "axios";

// BASE URL
const baseURL = "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);

  // get tasks on every change
  useEffect(() => {
    console.log("I am called(useEffect)");
    axios.get(`${baseURL}/api/get`).then((res) => {
      setTasks(res.data);
    });
  }, [count]);

  // task adding handler
  const onClickHandler = () => {
    if (input !== "") {
      setInput("");
      let obj = { task: input, time: 10 };
      axios.post(`${baseURL}/api/create`, obj).then((res) => {
        console.log(res.data);
      });
      setCount(count + 1);
    } else {
      alert("Enter a task");
    }
  };

  // task edit handler
  const modifyHandler = (temp) => {
    let newTask = prompt("New Task:");
    if (newTask === null || newTask === "") {
      alert("Enter the task");
    } else {
      axios
        .post(`${baseURL}/api/modify`, { old: temp, new: newTask })
        .then((res) => {
          console.log(res.data);
        });
      setCount(count + 1);
    }
  };

  // task delete handler
  const deleteHandler = (temp) => {
    axios.post(`${baseURL}/api/delete`, { task: temp }).then((res) => {
      console.log(res.data);
    });
    setCount(count + 1);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 style={{ margin: "30px", color: "white" }}>
          What's Plan For Today ?
        </h1>

        <div
          class="input-group mb-3"
          style={{ maxWidth: "600px", margin: "30px" }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            type="text"
            class="form-control"
            placeholder="Task"
            aria-label="Task"
            aria-describedby="button-addon2"
            style={{ backgroundColor: "#fa9d39" }}
          ></input>
          <button
            class="btn btn-outline-light"
            type="submit"
            id="button-addon2"
            onClick={onClickHandler}
          >
            Add Task
          </button>
        </div>

        <div style={{ margin: "30px" }}>
          {tasks.map((task, index) => (
            <Task
              task={task}
              key={index}
              delete={deleteHandler}
              modify={modifyHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
