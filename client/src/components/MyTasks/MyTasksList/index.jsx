import "./style.css";

import { ALL, IN_PROGRESS, OPEN } from "../../../helpers";

import StatusDropdown from "../../StatusDropdown";

const MyTaskList = ({ tasks, status, handleChangeStatus }) => {
  return (
    <div className="mytasks-content">
      {tasks.length ? (
        tasks.map((task, i) => {
          return (
            <div className="task-item profile" key={task._id}>
              <div className="task-upper">
                <span>{task.name}</span>
                <span>
                  <StatusDropdown
                    selectedStatus={task.status}
                    taskId={task._id}
                    handleChangeStatus={handleChangeStatus}
                  />
                </span>
              </div>
              <div className="task-lower">
                <p className="task-description">{task.description}</p>
              </div>
            </div>
          );
        })
      ) : (
          <div className="empty-task-list">
            {status === ALL ? (
              <p>You have no assigned tasks</p>
            ) : status === OPEN ? (
              <p>No open tasks</p>
            ) : status === IN_PROGRESS ? (
              <p>No tasks in progress</p>
            ) : (
                    <p>No completed tasks</p>
                  )}
          </div>
        )}
    </div>
  );
}

export default MyTaskList;