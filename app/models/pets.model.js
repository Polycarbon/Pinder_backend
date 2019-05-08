const mongoose = require('mongoose');
const petSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    breeds: {
        primary: String,
        secondary: String,
        mixed: Boolean,
        unknown: Boolean
    },
    age: {
        type: String
    },
    gender: {
        type: String,
        enum:['Male','Female','Unknown']
    },
    size: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    pictures:{
        type :Array,
        default : null
    },
    status: {
        type: String
    }
});
module.exports = petSchema
