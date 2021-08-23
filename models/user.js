const mongose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongose.model("User",UserSchema);