const Room = require('../models/rooms.model');

//get All Conversation
exports.getRoom= (req,res)=>{
    Room.find()
        .then(room =>{
            res.send(room)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            })
        })
};

exports.createRoom= (req,res)=>{
    Room.find()
        .then(room =>{
            res.send(room)
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        })
    })
};
