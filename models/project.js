import Sprint from "./sprint.js";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

var ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["OPEN", "IN_PROGRESS", "CLOSED"],
        default: "OPEN"
    },
    owners: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    contributors: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    sprints: [{
        type: Schema.Types.ObjectId,
        ref: "Sprint"
    }]
});

ProjectSchema.post('remove', document => {
    Sprint.find({project_ref: document._id}).then(sprints => {
        sprints.map(sprint => sprint.remove());
    }).catch(err => err);
});

const Project = model("Project", ProjectSchema);

export default Project;