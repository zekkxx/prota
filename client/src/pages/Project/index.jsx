import { ALL, OPEN } from "../../helpers";
import { useEffect, useState } from "react";

import API from "../../utils/API";
import AddSprintModal from "../../components/AddSprintModal";
import NavBar from "../../components/NavBar";
import ProjectCard from "../../components/ProjectCard";
import SprintList from "../../components/SprintList";
import SprintModal from "../../components/SprintModal";
import TaskListSelector from "../../components/TaskListSelector";
import TaskModal from "../../components/TaskModal";
import { useParams } from "react-router-dom";

const Project = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [team, setTeam] = useState([]);
  const [project, setProject] = useState({});
  const [sprints, setSprints] = useState([]);
  const [currentSprint, setCurrentSprint] = useState({});
  const [viewedSprint, setViewedSprint] = useState({});
  const [viewingSprint, setViewingSprint] = useState(false);
  const [addingSprint, setAddingSprint] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [expandedTask, setExpandedTask] = useState({});
  const [viewingTask, setViewingTask] = useState(false);
  // const [showTaskModal, setShowTaskModal] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [context, setContext] = useState("");
  const [trackedStatus, setTrackedStatus] = useState(OPEN);
  const [blur, setBlur] = useState(false);

  // Fetches the user object and project object when component first renders
  useEffect(() => {
    fetchUser();
    fetchProject(id);
  }, []);

  // -------------------------------------------
  // Methods for fetching data and setting state
  // -------------------------------------------

  // Fetches user object
  const fetchUser = async () => {
    let user = await API.getUser();
    if (user && user._id) {
      setUser(user);
    } else {
      setUser({});
    }
  };

  // Fetches the project and sets state accordingly
  const fetchProject = async (projectId) => {
    const project = await API.getProject(projectId);

    // send user to / if unauthorized
    if (project.unauthorized) return (window.location = "/"); // This will never fire unless backend adds unauthorized property to response
    if (!project || !project._id) return (window.location = "/"); // This will fire if the project doesn't exist
    
    const sprints = project.sprints && project.sprints.length ? [...project.sprints] : [];
    const currentSprint = sprints && sprints.length > 0 ? sprints[0] : {};
    const selectedTasks = currentSprint && currentSprint.tasks ? currentSprint.tasks.filter(task => task.status === trackedStatus) : [];
    const team = project.contributors && project.owners ? project.contributors.concat(project.owners) : [];

    setProject(project);
    setSprints(sprints);
    setCurrentSprint(currentSprint);
    setSelectedTasks(selectedTasks);
    setTeam(team);
    setIsLoaded(true);
  };

  // -------------------------------------------
  //               Event handlers
  // -------------------------------------------

  // Runs when a sprint is selected in SprintList component
  const selectSprint = async (sprintId) => {
    const tempCurrentSprint = sprints && sprints.length > 0 ? sprints.filter(sprint => sprint._id === sprintId)[0] : {};
    const tempSelectedTasks = tempCurrentSprint && tempCurrentSprint.tasks ? tempCurrentSprint.tasks.filter(task =>
      trackedStatus === ALL ?
        task :
        task.status === trackedStatus
    ) : [];
    
    setCurrentSprint(tempCurrentSprint);
    setSelectedTasks(tempSelectedTasks);

    return { currentSprint: tempCurrentSprint, selectedTasks: tempSelectedTasks }
  }


  // Toggles the visibility of a modal when user clicks backdrop
  const toggleModalVisibility = (e) => {
    let targetElement = e.target;
    if (targetElement.closest(".task-modal") || targetElement.closest(".modal") || targetElement.closest(".sprint-modal")) return;
    
    setViewingTask(false);
    setAddingSprint(false);
    setViewingSprint(false);
    setBlur(false);
    // eventually merge addingSprint with viewingSprint (similar functionality to TaskModal)
  };

  // Allows state to keep track of status, which allows for this component to send 
  // tasks filtered by status to the child component upon creation of a new task
  const trackStatus = (status) => {
    setTrackedStatus(status)
  }

  // Triggered when a project owner selects the 'add a project' button
  const openAddSprintModal = () => {
    setAddingSprint(true);
    setBlur(true);
  };

  const openSprintModal = (sprint) => {
      setViewedSprint(sprint ? sprint : null);
      setViewingSprint(true);
      setContext(sprint ? 'edit' : 'create');
      setBlur(true);
  }

  // Fires when a user clicks on a task in the TaskList component
  // Dynamically sets the context to 'edit' or 'create' depending where the event came from
  const openTaskModal = (e, task) => {
    if (e) {
      // Won't open the modal if user is selecting a status
      if (!e.target.closest('.selected-status')) {
        setExpandedTask(task);
        setViewingTask(true); 
        setContext(task ? 'edit' : 'create');
        setBlur(true);
      }
    }

    // if the user tries to create a task, e won't exist -- could handle this in the event it came from but, meh
    if (!e) {
      setExpandedTask(task);
      setViewingTask(true);
      setContext(task ? 'edit' : 'create');
      setBlur(true);
    }
  }

  // Adds a new sprint to the database and updates state 
  const handleAddSprint = async (sprintName) => {
    const data = {
      name: sprintName,
      project_ref: project._id
    };

    let newSprint = await API.addSprint(data);

    let updatedProject = { ...project };
    updatedProject.sprints.push(newSprint);

    let updatedSprints = [...sprints];
    updatedSprints.push(newSprint);

    setProject(updatedProject);
    setSprints(updatedSprints);
    setCurrentSprint(newSprint);
    setSelectedTasks([]);
    setAddingSprint(false);
    setBlur(false);
  };

  // Decides between creating or editing a task
  const handleTask = (task) => {
    if (context === 'create') {
      createTask(task)
    }
    if (context === 'edit') {
      editTask(task)
    }
  };


  const handleSprint = (sprint) => {
    if (context === 'create') {
      handleAddSprint(sprint) // change name of function to `createSprint`
    }
    if (context === 'edit') {
      editSprint(sprint)
    }
  }


  const editSprint = async (sprint) => {
    let updatedSprint = await API.updateSprint(sprint.id, { name: sprint.name });
    let newSprints = sprints && sprints.length > 0 ? [...sprints] : [];
    newSprints.forEach(sprint => {
      if (sprint._id === updatedSprint._id) {
        sprint.name = updatedSprint.name
      }
    });
    setSprints(newSprints);
    setViewingSprint(false);
    setBlur(false);
  }


  // Delete a sprint
  const deleteSprint = async (sprintId) => {
    let deletedSprint = await API.deleteSprint(sprintId);
    let newSprints = sprints && sprints.length > 0 ? [...sprints].filter(sprint => sprint._id !== sprintId) : [];
    setCurrentSprint({});
    setSprints(newSprints);
    setSelectedTasks(null);
    setViewingSprint(false);
    setBlur(false);
  }


  // Creates a new task in the database and sets state accordingly
  const createTask = async (task) => {
    if (!currentSprint || !currentSprint._id) return;
    let newTask = await API.createTask({
      name: task.name,
      description: task.description,
      assignee: task.assignee,
      project_ref: project._id,
      sprint_ref: currentSprint._id
    });

    let newCurrentSprint = currentSprint;
    newCurrentSprint.tasks.push(newTask);

    let newSprints = sprints.map(sprint =>
      sprint._id === newCurrentSprint._id ?
        newCurrentSprint :
        sprint
    );

    let newSelectedTasks = newCurrentSprint.tasks.filter(task =>
      trackedStatus === ALL ?
        task :
        task.status === trackedStatus
    );

    setCurrentSprint(newCurrentSprint);
    setSprints(newSprints);
    setSelectedTasks(newSelectedTasks);
    setViewingTask(false);
    setBlur(false);
  }

  // Sends an updated task object to the database and updates state accordingly
  const editTask = async (task) => {
    if (!currentSprint || !currentSprint._id) return;
    let updatedTask = await API.updateTask(task.id, {
      name: task.name,
      description: task.description,
      assignee: task.assignee
    })

    let newCurrentSprint = currentSprint;
    newCurrentSprint.tasks.forEach(task => {
      if (task._id === updatedTask._id) {
        task.name = updatedTask.name
        task.description = updatedTask.description
        task.assignee = updatedTask.assignee
      }
    });

    let newSprints = sprints.map(sprint =>
      sprint._id === newCurrentSprint._id ?
        newCurrentSprint :
        sprint
    );

    let newSelectedTasks = newCurrentSprint.tasks.filter(task =>
      trackedStatus === ALL ?
        task :
        task.status === trackedStatus
    );

    setCurrentSprint(newCurrentSprint);
    setSprints(newSprints);
    setSelectedTasks(newSelectedTasks);
    setViewingTask(false);
    setBlur(false);
  }

  const handleChangeStatus = async (taskId, status) => {
    if (!currentSprint || !currentSprint._id) return;
    let updatedTask = await API.updateTask(taskId, { status: status })

    let newCurrentSprint = currentSprint;
    newCurrentSprint.tasks.forEach(task => {
      if (task._id === updatedTask._id) {
        task.name = updatedTask.name
        task.description = updatedTask.description
        task.assignee = updatedTask.assignee
        task.status = updatedTask.status
      }
    });

    let newSprints = sprints.map(sprint =>
      sprint._id === newCurrentSprint._id ?
        newCurrentSprint :
        sprint
    );

    let newSelectedTasks = newCurrentSprint.tasks.filter(task =>
      trackedStatus === ALL ?
        task :
        task.status === trackedStatus
    );

    setCurrentSprint(newCurrentSprint);
    setSprints(newSprints);
    setSelectedTasks(newSelectedTasks);
    setViewingTask(false);
    setBlur(false);
  }

  const handleChangeStatusSprint = async (sprintId, status) => {
    let updatedSprint = await API.updateSprint(sprintId, { status: status })

    let newSprints = sprints && sprints.length > 0 ? [...sprints] : [];
    newSprints.forEach(sprint => {
      if (sprint._id === updatedSprint._id) {
        sprint.status = updatedSprint.status
      }
    })
      
    setSprints(newSprints);
    setViewingSprint(false);
    setBlur(false);
  }

  // Deletes a task by id
  const deleteTask = async (taskId) => {
    if (!currentSprint || !currentSprint._id) return;
    let deletedTask = await API.deleteTask(taskId);

    let newCurrentSprint = currentSprint;
    let newTasks = newCurrentSprint.tasks.filter(task => task._id !== taskId);
    newCurrentSprint.tasks = newTasks;

    let newSprints = sprints.map(sprint =>
      sprint._id === newCurrentSprint._id ?
        newCurrentSprint :
        sprint
    );

    let newSelectedTasks = newCurrentSprint.tasks.filter(task =>
      trackedStatus === ALL ?
        task :
        task.status === trackedStatus
    );

    setCurrentSprint(newCurrentSprint);
    setSprints(newSprints);
    setSelectedTasks(newSelectedTasks);
    setViewingTask(false);
    setBlur(false);
  }

  // -------------------------------------------
  //                 Rendering
  // -------------------------------------------

  return (
    <>
      {isLoaded && user ?
        (
          <>
            <NavBar
              avatarUrl={user.avatar_url}
              displayName={user.display_name}
              style={blur ? { filter: 'blur(3px)' } : null}
            />
            <div className="page" style={blur ? { filter: 'blur(3px)' } : null}>
              <div className="row">
                <div className="col full">
                  <ProjectCard
                    project={project}
                    team={team}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col half">
                  <SprintList
                    sprints={sprints}
                    selectSprint={sprintId => selectSprint(sprintId)}
                    openAddSprintModal={() => openAddSprintModal()}
                    openSprintModal={sprint => openSprintModal(sprint)}
                    currentSprintId={currentSprint && currentSprint._id ? currentSprint._id : null}
                    handleChangeStatus={handleChangeStatusSprint}
                  />
                </div>
                <div className="col half">
                  {
                    currentSprint ?
                      <TaskListSelector
                        tasks={currentSprint && currentSprint.tasks ? currentSprint.tasks : []}
                        selectedTasks={selectedTasks}
                        trackStatus={status => trackStatus(status)}
                        handleTaskModal={openTaskModal}
                        handleChangeStatus={handleChangeStatus}
                      />
                      :
                      null
                  }
                </div>
              </div>
            </div>
          </>
        )
        :
        null // return null when loading (instead of loading gif, loading is quick)
      }

      {/* *** MODALS *** */}

      {addingSprint ? (
        <AddSprintModal
          handleModal={e => toggleModalVisibility(e)}
          handleAddSprint={sprintName => handleAddSprint(sprintName)}
        />
      ) : null}

      {viewingTask ? (
        <TaskModal
          handleModal={e => toggleModalVisibility(e)}
          handleTask={task => handleTask(task)}
          handleDeleteTask={taskId => deleteTask(taskId)}
          team={team}
          currentUser={user}
          expandedTask={expandedTask}
          context={context}
        />
      ) : null}

      {viewingSprint ? (
        <SprintModal
          sprint={viewedSprint}
          handleSprint={sprint => handleSprint(sprint)}
          handleModal={e => toggleModalVisibility(e)}
          handleDeleteSprint={sprintId => deleteSprint(sprintId)}
        />
      ) : null}
    </>
  );
}

export default Project;