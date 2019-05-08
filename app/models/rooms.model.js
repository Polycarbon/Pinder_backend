const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    participants: {
        type: [],
        required: false,
        unique: false
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('rooms', RoomSchema,'rooms');
