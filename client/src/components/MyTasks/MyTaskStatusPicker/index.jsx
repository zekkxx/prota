import "./style.css";

import { ALL, DONE, IN_PROGRESS, OPEN } from "../../../helpers";

import { useState } from "react";

const MyTaskStatusPicker = ({ handleSelectStatus }) => {
  const [status, setStatus] = useState(OPEN);

  const selectStatus = status => {
    setStatus(status);
    handleSelectStatus(status);
  };

  return (
    <div className="container selector-row">
      <div
        className={`button-bg ${status === ALL ? "active" : ""}`}
        id="all-tasks"
      >
        <button onClick={() => selectStatus(ALL)}>all</button>
      </div>
      <div
        className={`button-bg ${status === OPEN ? "active" : ""}`}
        id="open-tasks"
      >
        <button onClick={() => selectStatus(OPEN)}>open</button>
      </div>
      <div
        className={`button-bg ${status === IN_PROGRESS ? "active" : ""}`}
        id="in-progress-tasks"
      >
        <button onClick={() => selectStatus(IN_PROGRESS)}>
          in progress
            </button>
      </div>
      <div
        className={`button-bg ${status === DONE ? "active" : ""}`}
        id="done-tasks"
      >
        <button onClick={() => selectStatus(DONE)}>done</button>
      </div>
    </div>
  );
}

export default MyTaskStatusPicker;
