import "./style.css";

import { DONE, IN_PROGRESS, OPEN } from "../../helpers";

const displayValues = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN PROGRESS",
  DONE: "DONE"
};
const statuses = [OPEN, IN_PROGRESS, DONE];

// interface StatusDropdownProps {
//   selectedStatus: String;
//   taskId: String;
//   handleChangeStatus: (taskId: String, status: String) => void;
// }

const StatusDropdown = ({
  selectedStatus,
  taskId,
  handleChangeStatus
}) => {
  return (
    <div className="selected-status">
      {displayValues[selectedStatus]}
      <div className="options-wrapper">
        <div className="options">
          {statuses.map((status, i) => {
            if (status !== selectedStatus) {
              return (
                <div
                  key={i}
                  alt={status}
                  className={"status"}
                  onClick={() => {
                    handleChangeStatus(taskId, status);
                  }}
                >
                  {displayValues[status]}
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default StatusDropdown;
