import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "/" : "http://localhost:3001/";

export default {
  getUser: async () =>
    await axios.get("/api/user", { withCredentials: true }).then(response => response.data),
  createUser: async (username) =>
    await axios.post(`api/users/${username}`).then(response => response.data),
  logout: async () =>
    await axios.delete("/auth/logout").then(response => response.data).catch(err => console.log(err)),
    // LOGOUT route has a catch to log errors, but it still redirects even on error -- look into this later
  isLoggedIn: async () =>
    await axios.get("/auth/status", { withCredentials: true }).then(response => response.data),
  getUsersFuzzy: async (username) =>
    await axios.get(`/api/user/${username}/fuzzy`).then(response => response.data),
  getProject: async (id) =>
    await axios.get(`/api/project/${id}`).then(response => response.data),
  createProject: async (project) =>
    await axios.post("/api/projects", project).then(response => response.data),
  addSprint: async (sprint) =>
    await axios.post("/api/sprints", sprint).then(response => response.data),
  updateSprint: async (sprintId, sprint) =>
    await axios.put(`/api/sprints/${sprintId}`, sprint).then(response => response.data),
  deleteSprint: async (sprintId) =>
    await axios.delete(`/api/sprints/${sprintId}`).then(response => response.data),
  getTasksByUser: async (id) =>
    await axios.get(`/api/tasks/user/${id}`).then(response => response.data),
  updateTask: async (taskId, task) =>
    await axios.put(`/api/tasks/${taskId}`, task).then(response => response.data),
  createTask: async (task) =>
    await axios.post('/api/tasks', task).then(response => response.data),
  deleteTask: async (taskId) =>
    await axios.delete(`/api/tasks/${taskId}`).then(response => response.data)
};
