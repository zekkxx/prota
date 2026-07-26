import Controller from "../controllers/index.js";
import {Router} from "express";

const router = Router();

const checkLogin = (req, res, next) => {
    if(req.user){
      next();
    } else {
      res.send("401 Error: User must be logged in.");
    }
  };

//GET ROUTES:
router.get("/user", (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: { message: "User not authenticated" } });
    }
    Controller.User.getOne(req.user._id)
        .then(result => res.json(result))
        .catch(err => res.json(
            {error: 
                {message: "Couldn't Retrieve User",
                value: err}
            }));
});

router.get("/user/:userId", checkLogin, (req, res) => {
    Controller.User.getOne(req.params.userId)
        .then(result => res.json(result))
        .catch(err => res.json(
            {error: 
                {message: "Couldn't Retrieve User",
                value: err}
            }));
});

//Get 5 usernames like given username
router.get("/user/:userName/fuzzy", checkLogin, (req, res) => {
    Controller.User.getFuzzy(req.params.userName)
        .then(result => res.json(result))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve User",
                value: err}
            }));
});

router.get("/projects", checkLogin, (req, res) => {
    Controller.Project.getAllByUser(req.user._id)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve Project",
                value: err}
            }));
});

router.get("/projects/user/:userId", checkLogin, (req, res) => {
    Controller.Project.getAllByUser(req.params.userId)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve Project",
                value: err}
            }));
});

router.get("/project/:projectId", checkLogin, (req, res) => {
    Controller.Project.getOneById(req.params.projectId)
        .then(result => { res.json(result) })
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve Project",
                value: err}
            }));
});

router.get("/sprints/:projectId", checkLogin, (req, res) => {
    Controller.Sprint
        .getAllByProject(req.params.projectId)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve Sprint",
                value: err}
            }));
});

router.get("/tasks/project/:projectId", checkLogin, (req, res) => {
    Controller.Task
        .getAllByProject(req.params.projectId)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve Task",
                value: err}
            }));
});

router.get("/tasks/sprint/:sprintId", checkLogin, (req, res) => {
    Controller.Task
        .getAllBySprint(req.params.sprintId)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve Tasks",
                value: err}
            }));
});

router.get("/tasks/user/:userId", checkLogin, (req, res) => {
    Controller.Task
        .getAllByUser(req.params.userId)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Retrieve Project",
                value: err}
            }));
});

//POST ROUTES:
router.post("/users/:userName", checkLogin, (req, res) => {
    Controller.User.invite(req.params.userName)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Create User",
                value: err}
            }));
});

router.post("/projects", checkLogin, (req, res) => {
    Controller.Project.create(req.body)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Create Project",
                value: err}
            }));
});

router.post("/sprints", checkLogin, (req, res) => {
    Controller.Sprint
        .create(req.body)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Create Sprint",
                value: err}
            }));
});

router.post("/tasks", checkLogin, (req, res) => {
    Controller.Task
        .create(req.body)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Create Task",
                value: err}}
        ));
});

//PUT ROUTES
router.put("/projects/:projectId", checkLogin, (req, res) => {
    Controller.Project
        .updateOneById(req.params.projectId, req.body)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Edit Prjoect",
                value: err}
            }));
});

router.put("/projects/:projectId/addContributor/:userId", checkLogin, (req, res) => {
    Controller.Project.addUser(req.params, "contributor")
        .then(result => res.send(result))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Edit Prjoect",
                value: err}
            }));
});

router.put("/projects/:projectId/addOwner/:userId", checkLogin, (req, res) => {
    Controller.Project.addUser(req.params, "owner")
        .then(result => res.send(result))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Edit Prjoect",
                value: err}
            }));
});

router.put("/projects/:projectId/removeContributor/:userId", checkLogin, (req, res) => {
    Controller.Project.removeUser(req.params, "contributor")
        .then(result => res.send(result))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Edit Prjoect",
                value: err}
            }));
});

router.put("/projects/:projectId/removeOwner/:userId", checkLogin, (req, res) => {
    Controller.Project.removeUser(req.params, "owner")
        .then(result => res.send(result))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Edit Prjoect",
                value: err}
            }));
});

router.put("/sprints/:sprintId", checkLogin, (req, res) => {
    Controller.Sprint
        .updateOneById(req.params.sprintId, req.body)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Update Sprint",
                value: err}
            }));
});

router.put("/tasks/:taskId", checkLogin, (req, res) => {
    Controller.Task
        .updateOneById(req.params.taskId, req.body)
        .then(results => res.json(results))
        .catch(err => res.json(
            {error: 
                { message: "Couldn't Update Task",
                value: err}
            }));
});

//DELETE ROUTES
router.delete("/:table/:id", checkLogin, (req, res) => {
    let tableParam = req.params.table
    const table = tableParam.charAt(0).toUpperCase() + tableParam.slice(1, tableParam.length-1)
    Controller[table]
        .deleteOneById(req.params.id)
        .then(results => res.json(results))
        .catch(err => res.json({
            error:
                {
                    message: `Couldn't delete from ${table}`,
                    value: err
                }
        }))
})

export default router;
