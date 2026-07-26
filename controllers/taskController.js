import db from "../models/index.js";

const assignTaskToSprint = async (taskId, sprintId) => { 
    return db.Sprint.findOne({ _id: sprintId })
        .then(result => { 
            result.tasks.push(taskId);
            db.Sprint.updateOne({ _id: sprintId }, result, { new: true, useFindAndModify: false }) 
                .then(update => update);
        }).catch(err => err);
}

const removeTaskFromSprint = async (taskId, sprintId) => { 
    return db.Sprint.findOne({ _id: sprintId })
        .then(result => { 
            result.tasks = result.tasks && result.tasks.length > 0 ? result.tasks.filter( 
                id => id != taskId 
            ) : [];
            db.Sprint.updateOne({ _id: sprintId }, result, { new: true, useFindAndModify: false })
                .then(update => update);
        }).catch(err => err);
}

export default {

    getAllByProject: function (projectId) { 
        return db.Task
            .find({ project_ref: projectId })
            .then(results => results) 
            .catch(err => err);
    },

    getAllBySprint: function (sprintId) { 
        return db.Sprint
            .findOne({ _id: sprintId }).populate({ path: 'tasks' }) 
            .then(result => result.tasks) 
            .catch(err => err);
    },

    getAllByUser: function (userId) { 
        return db.Task
            .find({ assignee: userId })
            .then(results => results)
            .catch(err => err);
    },

    create: function (task) { 
        return db.Task
            .create(task)
            .then(results => { 
                assignTaskToSprint(results._id, task.sprint_ref); 
                return db.Task.findById({ _id: results._id }).populate({ path: "assignee" })
                    .then(result => result); 
            })
            .catch(err => err);
    },

    updateOneById: function (taskId, task) { 
        return db.Task
            .findByIdAndUpdate(
                taskId,
                task,
                { new: true, useFindAndModify: false }
            ).populate({ path: "assignee" })
            .then(results => results)
            .catch(err => err);
    },

    deleteOneById: function (taskId) { 
        return db.Task
            .findByIdAndDelete({ _id: taskId })
            .then(results => {
                removeTaskFromSprint(taskId, results.sprint_ref); 
            })
            .catch(err => err);
    }
}