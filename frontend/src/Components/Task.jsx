import React from "react";
import "./Task.css";

const Task = (props) => {
  return (
    <div className="task" class="card mb-3" style={{ "max-width": "600px" }}>
      <div className="card-body" class="card-body">
        <h5 class="card-title">{props.task.task}</h5>
        <div className="btn-container">
          <button
            className="btn btn-outline-dark  "
            onClick={() => props.modify(props.task.task)}
          >
            Edit
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() => props.delete(props.task.task)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
