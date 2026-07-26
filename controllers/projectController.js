import db from "../models/index.js";

const assignProjectToUser = async (userId, projectId) => {
    return db.User.findOne({_id: userId})
        .then(result => {
            if(result.projects.indexOf(projectId) == -1){
                result.projects.push(projectId);
                return db.User.updateOne({_id: userId}, result, {new: true, useFindAndModify: false}) //update returns the new user with new: true
                    .then(update => "Success");
            } else {
                throw new Error("User already has this project.");
            }
        }).catch(err => err);
}

const removeProjectFromUser = async (userId, projectId) => {
    return db.User.findOne({_id: userId})
        .then(result => {
            result.projects = result.projects && result.projects.length > 0 ? result.projects.filter(
                id => id != projectId
            ) : [];
            return db.User.updateOne({_id: userId}, result, {new: true, useFindAndModify: false})
                .then(update => "Success");
        }).catch(err => err);
}

const assignUserToProject = async (params, userType) => {
    return db.Project.findOne({_id: params.projectId})
        .then(result => {
            if(result.owners.indexOf(params.userId) != -1 || result.contributors.indexOf(params.userId) != -1){
                throw new Error("User is already a part of the project.");
            }
            if(userType === "owner"){
                result.owners.push(params.userId);
            }
            if(userType === "contributor"){
                result.contributors.push(params.userId);
            }
            return db.Project.updateOne({_id: params.projectId}, result, {new: true, useFindAndModify: false})
                .then(update => "Success");
        }).catch(err => err);
}

const removeUserFromProject = async (params, userType) => {
    return db.Project.findOne({_id: params.projectId})
        .then(result => {
            if(userType === "owner" && result.owners.length == 1){
                throw new Error("Prota does not allow for ownerless projects.");
            } else if(userType === "owner"){
                result.owners = result.owners && result.owners.length > 0 ? result.owners.filter(
                    id => id !== params.userId
                ) : [];
            }
            if(userType === "contributor"){
                result.contributors = result.contributors && result.contributors.length > 0 ? result.contributors.filter(
                    id => id !== params.userId
                ) : [];
            }
            return db.Project.updateOne({_id: params.projectId}, result, {new: true, useFindAndModify: false})
                .then(update => "Success");
        }).catch(err => err);
}

export default {
    getAllByUser: function(userId){
        return db.User
            .findOne({_id: userId}).populate({path: 'projects'})
            .then(result => result.projects)
            .catch(err=> err); 
    },

    getOneById: function(projectId){
        return db.Project.findById({_id: projectId})
            .populate([{path: "sprints", populate: {path: "tasks", populate: {path: "assignee"}}}, {path: "owners"}, {path: "contributors"}])
            .then(result => result)
            .catch(err => err);
    },

    create: function(project){
        return db.Project.create(project)
            .then(result => {
                result.owners.map(owner => {
                    return assignProjectToUser(owner, result._id);
                });
                result.contributors.map(contributor => {
                    return assignProjectToUser(contributor, result._id);
                });
                return result;
            })
            .catch(err => err);
    },
    
    updateOneById: function(projectId, project){
        return db.Project
            .findByIdAndUpdate(
                projectId, 
                project,
                {new: true, useFindAndModify: false}
            )
            .then(results => results)
            .catch(err => err);
    },
    
    deleteOneById: function(projectId){
        return db.Project
            .findById({ _id: projectId})
            .then(results => {
                results.owners.map(owner => removeProjectFromUser(owner, projectId));
                results.contributors.map(contributor => removeProjectFromUser(contributor, projectId));
                return results.remove();
            })
            .catch(err => err);
    },

    addUser: function(parameters, userType){
        return assignUserToProject(parameters, userType)
        .then(result1 => {
            if(result1 == "Success") {
                return assignProjectToUser(parameters.userId, parameters.projectId)
                .then(result2 => result2);        
            } else {
                return result1;
            }
        }).catch(err => err);
        
    },

    removeUser: function(parameters, userType){
        return removeUserFromProject(parameters, userType)
        .then(result1 => {
            if(result1 == "Success") {
                return removeProjectFromUser(parameters.userId, parameters.projectId)
                .then(result2 => result2);
            } else {
                return result1;
            }
        }).catch(err => err);
    }
}