import "./style.css"

import { ALL, IN_PROGRESS, OPEN } from '../../../helpers';

import StatusDropdown from '../../StatusDropdown'
import unassignedAvatarImg from '../../../assets/img/unassigned-avatar.png';

// interface TaskListProps {
//   tasks: Task[];
//   handleTaskModal: (e: Event, task: Task) => void;
//   status: String;
//   handleChangeStatus: (taskId: String, status: String) => void;
// }

const TaskList = ({ tasks, handleTaskModal, status, handleChangeStatus }) => {

  // // click handler for assigning a task
  // const openTaskModal = (e, task) => {
  //   // passes up the task ID up to the direct parent component
  //   handleTaskModal(e, task)
  // }

  return (
    <>
      {
        tasks.length ?
          tasks.map((task, i) => {
            return (
              <div
                className="task-item"
                key={i}
                onClick={e => handleTaskModal(e, task)}
              >
                <div className="task-upper">
                  <span className="task-name">{task.name}</span>
                  {/* <span className="task-status">{task.status}</span> */}
                  <StatusDropdown
                    selectedStatus={task.status}
                    taskId={task._id}
                    handleChangeStatus={handleChangeStatus}
                  />
                </div>
                <div className="task-lower">
                  <p className="task-description">{task.description}</p>
                  {
                    task.assignee ?
                      <img
                        className="sm-avatar"
                        src={task.assignee.avatar_url}
                        alt=""
                      />
                      :
                      <img className="unassigned-avatar" src={unassignedAvatarImg} alt=""></img>
                  }
                </div>

              </div>
            )
          })
          :
          <div className="empty-task-list">
            {
              status === ALL ? <p>No tasks are currently assigned to this sprint</p>
                :
                status === OPEN ? <p>No open tasks</p>
                  :
                  status === IN_PROGRESS ? <p>No tasks in progress</p>
                    :
                    <p>No closed tasks</p>
            }
          </div>
      }
    </>
  )
}

export default TaskList