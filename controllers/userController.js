import db from "../models/index.js";

export default {
  getAll: function() {
    return db.User.find({})
      .then(dbUsers => dbUsers)
      .catch(err => res.json(err));
  },

  getOne: function(userId) {
    return db.User.findOne({ _id: userId })
      .populate({ path: "projects" })
      .then(dbUser => dbUser)
      .catch(err => err);
  },

  getFuzzy: function(userName) { //get a fuzzy selection of users by req.params
    const regex = new RegExp(userName, "i"); //creates regex equivalent to /username/i where username is a variable
    return db.User.find({ username: regex })
      .limit(5)
      .then(result => result)
      .catch(err => err);
  },

    invite: function(userName) {
        return db.User
            .find({username: userName})
            .then(dbUser => {
                if(dbUser.length > 0){
                    throw new Error("User Exists");
                } else {
                    return this.create({username: userName});
                }
            }).catch(err => err);
    },

    create: function(userBody) { //create a new user
        return db.User.create(userBody)
            .then(result => result)
            .catch(err => err);
    },

    update: function(userBody) {
        return db.User.findOneAndUpdate(
            {username: userBody.username}, 
            userBody,
            {new: true, useFindAndModify: false}
        ).populate({path: "projects"})
        .catch(err => err);
    },

    createOrUpdate: function(user) {
        return db.User
            .find({username: user.username})
            .then(dbUser => {
                if(dbUser.length > 0){
                    return this.update(user);
                } else {
                    return this.create(user);
                }
            }).catch(err => err);
    }
}
