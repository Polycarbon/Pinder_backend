const Pet = require('../models/pets.model');
const User = require('../models/user.model');

const axios = require('axios');
var petfinder = require("@petfinder/petfinder-js");
const apiKey = '1k8oNLMPdrjZWkUKMoT7yyxpp7w9PkOyKGTq6LBNBPvcsYeHxj';
const secret = 'qlvqwIzRxswaebX8v5CNffCz6RTLf6AjL138IPp6';
var petFind = new petfinder.Client({apiKey: apiKey, secret: secret});

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }
    // Create a User
    const pet = new Pet({
        user_id : req.body.user_id,
        user_password :req.body.user_password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email : req.body.email,
        mobile : req.body.mobile,
        facebook : req.body.facebook,
        pic_url : req.body.pic_url
    });
    // Save Pet in the database
    pet.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Pet."
        });
    });
};
// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Pet.find()
        .then(pet => {
            res.send(pet);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};
exports.update = (req, res) => {
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
// Get List
exports.findByList = (req, res) => {
    Pet.find({
        '_id': { $in: req.body.list}
    }, function(err, pets){
        res.send(pets);
    });
};
// Generate new Pet
exports.generate = (req, res) =>{
    petFind.animal.search({limit:100})
        .then(function (response) {
            // Do something with `response.data.animals`
            var animals = response.data.animals;
            for (let i=0; i < animals.length; i++) {
                // Create a User
                const pet = new Pet({
                    pet_id: animals[i].id,
                    type: animals[i].type,
                    species: animals[i].species,
                    breeds: animals[i].breeds,
                    age: animals[i].age,
                    gender: animals[i].gender,
                    size: animals[i].size,
                    name: animals[i].name,
                    description: animals[i].description,
                    pictures: (animals[i].photos.length==1) ? animals[i].photos: null,
                    status: animals[i].status,
                    contact: animals[i].contact,
                    filter_setting: {
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
                pet.save()
                    .then(data => {
                        res.send(data);
                    }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Pet."
                    });
                });
            }
        })
        .catch(function (error) {
            // Handle the error
        });
};


