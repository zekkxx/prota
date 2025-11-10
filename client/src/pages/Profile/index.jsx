import "./style.css";

import { useEffect, useState } from "react";

import API from "../../utils/API";
import CreateProject from "../../components/CreateProject";
import MyTasks from "../../components/MyTasks";
import NavBar from "../../components/NavBar";
import ProjectCard from "../../components/ProjectCard";
import ProjectList from "../../components/ProjectList";

const Profile = () => {
    const [user, setUser] = useState();
    const [tasks, setTasks] = useState();
    const [creatingProject, setCreatingProject] = useState();
    const [blur, setBlur] = useState();

  useEffect(() => {
    (async () => {
      if (!user) {
        let tempUser = await API.getUser()
        if (tempUser.projects) {
          tempUser.projects = tempUser.projects.reverse();
        }
        let tempTasks = await API.getTasksByUser(tempUser._id)
        setUser(tempUser);
        setTasks(tempTasks);
      }
    })();
  }, [user]);

  const handleChangeStatus = (taskId, status) => {
    API.updateTask(taskId, { status }).then(newTask => {
      newTask.assignee = newTask.assignee._id;
      let newTasks = tasks.map(task => {
        if (task._id === taskId) {
          return newTask;
        } else {
          return { ...task };
        }
      });
      setTasks(newTasks);
    });
  };

  const toggleCreateProjectDialog = e => {
    let targetElement = e.target;
    if (targetElement.closest(".modal")) return;
    
    setCreatingProject(!creatingProject);
    setBlur(!blur);
  };

  return (
    <>
      {user ? (
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
                  project={{ name: user.display_name }}
                  team={[]}
                />
              </div>
            </div>

            <div className="row">
              <div className="col half">
                {user.projects ? (
                  <ProjectList
                    toggleCreateProjectDialog={toggleCreateProjectDialog}
                    projects={user.projects}
                  />
                ) : ""}
              </div>
              <div className="col half">
                <MyTasks
                  handleChangeStatus={handleChangeStatus}
                  projects={user.projects}
                  tasks={tasks}
                  username={user.username}
                />
              </div>
            </div>
          </div>
          {creatingProject ? (
            <CreateProject
              toggleCreateProjectDialog={toggleCreateProjectDialog}
              user={user}
            />
          ) : null}
        </>
      ) : ""}
    </>
  );
}

export default Profile;
