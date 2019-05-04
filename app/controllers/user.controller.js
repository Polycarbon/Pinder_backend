const User = require('../models/user.model');
const faker = require('faker');
// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Create a User
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        middle_name : req.body.middle_name,
        gender : req.body.gender,
        email : req.body.email,
        mobile : req.body.mobile
    });

    // Save User in the database
    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Generate new User
exports.generate = (req, res) =>{
    let n = 30
    for (let i=1; i <= n; i++) {
        // Create a User
        const user = new User({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            middle_name : "",
            gender : faker.name.prefix(),
            email : faker.internet.email(),
            mobile : "035424244"
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
        message: "Success"
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

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    // if(!req.body.criteria) {
    //     return res.status(400).send({
    //         message: "User content can not be empty"
    //     });
    // }

    // Find user and update it with the request body
    var conditions = req.body.criteria
        , update = req.body.data
        , options = req.body.opts;

    User.update(conditions, update, options, (err,numAffected)=>{
        res.send({
            message : numAffected+" is the number of updated documents"
        })
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
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

exports.get = (req, res) => {
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
