const User = require('../models/user.model');
const axios = require('axios');
const bcrypt = require('bcrypt');

// Generate new User
exports.generate = (req, res) =>{
    let n = 10;
    axios.get('https://randomuser.me/api/?inc=gender,name,login,email,picture,cell,location&nat=us&results='+n)
        .then(response => {
            let data = response["data"]["results"]
            for (let i=0; i < data.length; i++) {
                // Create a User
                const user = new User({
                    username : data[i].login.username,
                    password : bcrypt.hashSync(data[i].login.password, 8),
                    firstName: data[i].name.first,
                    lastName: data[i].name.last,
                    email : data[i].email,
                    phoneNumber : data[i].cell,
                    postCode : data[i].location.postcode,
                    picture : data[i].picture,
                    filter_setting : {
                        type: {
                            cat: true,
                            dog: true,
                            exotic :true
                        },
                        age: {
                            baby:true,
                            adult:true,
                            senior:true
                        },
                        gender: {
                            male:true,
                            female:true
                        },
                        size: {
                            small:true,
                            medium:true,
                            large:true,
                            extra_large:true
                        }
                    }
                });
                // Save User in the database
                user.save()
                    .then(data => {
                        // res.send(data);
                    }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the User."
                    });
                });
            }
            res.send({
                message: "success"
            });
        });
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Delete a note with the specified noteId in the request
exports.deleteById = (req, res) => {
    User.findOneAndDelete(req.params.userId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.userId
        });
    });
};

exports.findById = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not get user with id " + req.params.userId
        });
    });
};
//append pet_id to like list
exports.like = (req,res)=>{
    let conditions = {_id:req.body.user_id}
        , update = {$push: {like: req.body.pet_id}};
    User.findOneAndUpdate(conditions, update,(error, user)=>{
        if (error) {
            res.status(500).send({
                success:false,
                message:error
            });
        } else {
            res.send({
                success:true,
                message:user
            });
        }
    });
};

//append pet_id to dislike list
exports.dislike = (req,res)=>{
    let conditions = {_id:req.body.user_id}
        , update = {$push: {dislike: req.body.pet_id}};
    User.findOneAndUpdate(conditions, update,(error, user)=>{
        if (error) {
            res.status(500).send({
                success:false,
                message:error
            });
        } else {
            res.send({
                success:true,
                message:user
            });
        }
    });
};
exports.updateProfile = (req,res)=>{
    // Validate Request
    if(!req.body.criteria) {
        return res.status(400).send({
            message: "User content can not be empty."
        });
    }
    let conditions = req.body.criteria
        , update = req.body.data;

    User.findOneAndUpdate(conditions, update,(error, success)=>{
        if (error) {
            res.send(error);
        } else {
            res.send(success);
        }
    });
};
