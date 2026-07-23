import ProjectController from "./projectController.js";
import SprintController from "./sprintController.js";
import TaskController from "./taskController.js";
import UserController from "./userController.js";

export default {
    User: UserController,
    Project: ProjectController,
    Sprint: SprintController,
    Task: TaskController
};