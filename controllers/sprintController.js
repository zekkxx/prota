import db from "../models/index.js";

const assignSprintToProject = async (sprintId, projectId) => {
    return db.Project.findOne({ _id: projectId })
        .then(result => {
            result.sprints.push(sprintId);
            db.Project.updateOne({ _id: projectId }, result, { new: true, useFindAndModify: false })
                .then(update => update);
        }).catch(err => err);
}

const removeSprintFromProject = async (sprintId, projectId) => {
    return db.Project.findOne({ _id: projectId })
        .then(result => { 
            result.sprints = result.sprints && result.sprints.length > 0 ? result.sprints.filter( 
                id => id != sprintId 
            ) : [];
            db.Project.updateOne({ _id: projectId }, result, { new: true, useFindAndModify: false })
                .then(update => update);
        }).catch(err => err);
}

export default {

    getAllByProject: async function (projectId) { 
        return db.Project
            .findOne({ _id: projectId }).populate({ path: 'sprints', populate: { path: 'tasks' } }) 
            .then(result => result.sprints) 
            .catch(err => err);
    },

    create: async function (sprintBody) { 
        return db.Sprint
            .create(sprintBody)
            .then(async (results) => { 
                await assignSprintToProject(results._id, sprintBody.project_ref);
                return results; 
            })
            .catch(err => err);
    },

    updateOneById: async function (sprintId, sprint) { 
        return db.Sprint
            .findByIdAndUpdate(
                sprintId,
                sprint,
                { new: true, useFindAndModify: false }
            )
            .then(results => results)
            .catch(err => err);
    },

    deleteOneById: async function (sprintId) { 
        return db.Sprint
            .findById({ _id: sprintId }).populate({ path: "tasks" }) 
            .then(async (results) => {
                await removeSprintFromProject(sprintId, results.project_ref);
                return results.remove();
            })
            .catch(err => err);
    }
}