import mongoose from "mongoose";

const { Schema, model } = mongoose;

var UserSchema = new Schema({
    username: {
        //Github.username
        type: String,
        required: true
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    avatar_url: {
        //Github.photos[0].value
        type: String,
    },
    display_name: {
        //Github.displayName
        type: String,
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }]
});

const User = model("User", UserSchema);
export default User;
