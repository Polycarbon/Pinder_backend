const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user_id : String,
    user_password :String,
    first_name: String,
    last_name: String,
    gender : String,
    email : String,
    mobile : String,
    facebook : String,
    pic_url : String

}, {
    timestamps: true
});

module.exports = mongoose.model('user', UserSchema,'users');
