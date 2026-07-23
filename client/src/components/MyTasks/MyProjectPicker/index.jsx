import "./style.css";

import { ALL } from "../../../helpers";
import { useState } from "react";

// interface MyProjectPickerProps {
//   projects: Project[];
//   handleSelectProject: (projectId: String) => void;
// }

const MyProjectPicker = ({ projects, handleSelectProject }) => {
  const [selectedProject, setSelectedProject] = useState(ALL);
  const selectProject = id => {
    setSelectedProject(id);
    handleSelectProject(id);
  };

  return (
    <div className="project-picker-container">
      {projects && projects.length > 0 && projects.map(project => {
            return (
              <div
                className={`project-button ${
                  selectedProject === project._id ? "active" : ""
                }`}
                id={project._id}
                key={project._id}
              >
                <button
                  onClick={() => {
                    selectProject(project._id);
                  }}
                >
                  {project.name}
                </button>
              </div>
            );
          })
      }
      {!projects || projects.length === 0 && (
        <div className="no-projects-message">
          You are not part of any projects yet.
        </div>
      )}
    </div>
  );
}

export default MyProjectPicker;