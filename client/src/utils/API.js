import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "https://prota.onrender.com/" : "http://localhost:3001/";

export default {
  getUser: async () =>
    await axios.get("/api/user", { withCredentials: true }).then(response => response.data).catch(err => console.log(err)),
  createUser: async (username) =>
    await axios.post(`api/users/${username}`).then(response => response.data).catch(err => console.log(err)),
  logout: async () =>
    await axios.delete("/auth/logout").then(response => response.data).catch(err => console.log(err)),
    // LOGOUT route has a catch to log errors, but it still redirects even on error -- look into this later
  isLoggedIn: async () =>
    await axios.get("/auth/status", { withCredentials: true }).then(response => response.data).catch(err => console.log(err)),
  getUsersFuzzy: async (username) =>
    await axios.get(`/api/user/${username}/fuzzy`, { withCredentials: true }).then(response => response.data).catch(err => console.log(err)),
  getProject: async (id) =>
    await axios.get(`/api/project/${id}`, { withCredentials: true }).then(response => response.data).catch(err => console.log(err)),
  createProject: async (project) =>
    await axios.post("/api/projects", project, { withCredentials: true }).then(response => response.data).catch(err => console.log(err)),
  addSprint: async (sprint) =>
    await axios.post("/api/sprints", sprint, { withCredentials: true }).then(response => response.data).catch(err => console.log(err)),
  updateSprint: async (sprintId, sprint) =>
    await axios.put(`/api/sprints/${sprintId}`, sprint, { withCredentials: true }).then(response => response.data).catch(err => console.log(err)),
  deleteSprint: async (sprintId) =>
    await axios.delete(`/api/sprints/${sprintId}`, { withCredentials: true }).then(response => response.data).catch(err => console.log(err)),
  getTasksByUser: async (id) =>
    await axios.get(`/api/tasks/user/${id}`, { withCredentials: true }).then(response => response.data).catch(err => console.log(err)),
  updateTask: async (taskId, task) =>
    await axios.put(`/api/tasks/${taskId}`, task, { withCredentials: true }).then(response => response.data).catch(err => console.log(err)),
  createTask: async (task) =>
    await axios.post('/api/tasks', task, { withCredentials: true }).then(response => response.data).catch(err => console.log(err)),
  deleteTask: async (taskId) =>
    await axios.delete(`/api/tasks/${taskId}`, { withCredentials: true }).then(response => response.data).catch(err => console.log(err))
};
