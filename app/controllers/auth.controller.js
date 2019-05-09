const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "GQDstcKsx0NHjPOuXOYg5MbeJ1XT0uFiwDVvVBrk";
// Create and Save a new User
exports.register = (req, res) => {
    // Validate request
    if(!req.body.username && !req.body.password && !req.body.email) {
        return res.status(400).send({
            success : false,
            message: "please fill user and password"
        });
    }
    // Create a User
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const user = new User(req.body);
    // Save User in the database
    user.save()
        .then(data => {
            res.send({
                success: true,
                message:"registeration complete"
            });
        }).catch(err => {
            if(err.name === 'MongoError' && err.code === 11000) {
                res.status(500).send({
                    success : false,
                    message: "username or email already exist"
                });
            }

    });
};

exports.login = (req, res) => {
    // Validate request
    if(!req.body.username && !req.body.password) {
        return res.status(400).send({
            message: "please fill user and password"
        });
    }
    User.findOne({username:req.body.username})
        .then(user => {
            if(!user) {
                return res.status(404).send('No user found.');
            }
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
            let token = jwt.sign({ id: user.username }, secret, { expiresIn: 86400 });
            res.send({auth: true, token: token ,user:user});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(500).send('error');
        }
        return res.status(500).send('error');
    });
};
