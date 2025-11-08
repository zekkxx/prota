import { useParams, withRouter } from "react-router-dom";

import ProjectCard from "../../components/ProjectCard";
import mockAPI from "../../utils/mockAPI";
import { useEffect } from "react";

const ProjectTest = () => {
  const { id } = useParams();
  const [projectId, setProjectId] = useState(null);
  const [name, setName] = useState(null);
  const [status, setStatus] = useState(null);
  const [created_by, setCreatedBy] = useState(null);

  useEffect(() => {
    mockAPI.getProject(id).then(project => {
      if (project.unauthorized) window.location = "/";
      const { _id, name, status, created_by } = project;
      setName(name);
      setStatus(status);
      setCreatedBy(created_by);
      setProjectId(_id);
    });
  }, []);

  return projectId ? (
    <div>
      <ProjectCard
        name={name}
        status={status}
        created_by={created_by}
      />
    </div>
  ) : null;
}

export default withRouter(ProjectTest);
