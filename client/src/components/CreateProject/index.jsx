import "./style.css";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRef, useState } from "react";

import API from "../../utils/API";
import AddedUsers from "./AddedUsers";
import SearchUsers from "./SearchUsers";

const CreateProject = (props) => {
  const nodeRef = useRef(null);
  const [name, setName] = useState();
  const [created_by, setCreatedBy] = useState();
  const [owners, setOwners] = useState();
  const [contributors, setContributors] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleRemoveContributor = (toRemove) => {
    let tempContributors = contributors.filter(
      contributor => contributor.username !== toRemove.username
    );

    setContributors(tempContributors);
  };

  const handleAddContributor = (toAdd) => {
    let contributorPresent = false;
    let tempContributors = contributors;

    for (let contributor in tempContributors) {
      if (tempContributors[contributor].username === toAdd.username) {
        contributorPresent = true;
      }
    }

    if (!contributorPresent) {
      setContributors([...tempContributors, toAdd]);
    }
  };

  const handleRemoveOwner = (toRemove) => {
    if (toRemove.username === user.username) return;
    let tempOwners = owners.filter(owner => owner.username !== toRemove.username);
    setOwners(tempOwners);
  };

  const handleAddOwner = (toAdd) => {
    let ownerPresent = false;
    let tempOwners = owners;

    for (let owner in tempOwners) {
      if (tempOwners[owner].username === toAdd.username) {
        ownerPresent = true;
      }
    }

    if (!ownerPresent) {
      setOwners([...tempOwners, toAdd]);
    }
  };

  const handleInviteContributor = (username) => {
    API.createUser(username).then(user => {
      setContributors([...contributors, user]);
    });
  };

  const handleInviteOwner = (username) => {
    API.createUser(username).then(user => {
      setOwners([...owners, user]);
    });
  };

  const handleCreateProject = () => {
    let owners = owners.map(owner => owner._id);
    let contributors = contributors.map(
      contributor => contributor._id
    );

    if (name === "") {
      setErrorMessage("Please enter a project name.");
      (() => {
        setTimeout(() => {
         setErrorMessage(null);
        }, 3000);
      })();
      return;
    }

    if (name.length > 40) {
      setErrorMessage("Project names must be under 40 characters.");
      (() => {
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      })();
      return;
    }

    let newProject = {
      name: name,
      created_by: created_by,
      owners,
      contributors
    };

    API.createProject(newProject).then(project => {
      window.location = `/project/${project._id}`;
    });
  };

  return (
    <div>
      <TransitionGroup>
        <CSSTransition
          key={1}
          nodeRef={nodeRef}
          classNames="modal-animation"
          appear={true}
          timeout={{ appear: 500, enter: 500, exit: 300 }}
        >
        <div
          key="1"
          ref={nodeRef}
          className="modal-backdrop"
          onClick={props.toggleCreateProjectDialog}
        >
          <div className="modal">
            <div className="modal-header">Create a New Project</div>
            <div className="modal-input">
              <label htmlFor="projectTitle">Project Title</label>
              <input
                autoFocus
                name="projectTitle"
                placeholder="Project Title"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="error-message">{errorMessage}</div>
            <div className="modal-input">
              <label>Project Owners</label>
              <AddedUsers
                handleRemoveUser={handleRemoveOwner}
                currentUser={created_by}
                users={owners}
              />
              <SearchUsers
                type="owners"
                handleInviteUser={handleInviteOwner}
                users={owners}
                handleAddUser={handleAddOwner}
              />
            </div>
            <div className="modal-input">
              <label>Contributors</label>
              <AddedUsers
                handleRemoveUser={handleRemoveContributor}
                users={contributors}
              />
              <SearchUsers
                type="contributors"
                handleInviteUser={handleInviteContributor}
                users={contributors}
                handleAddUser={handleAddContributor}
              />
            </div>
            <div className="submit-btn">
              <div
                className="add-project-button"
                onClick={handleCreateProject}
              >
                Create Project
            </div>
            </div>

          </div>
        </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default CreateProject;
