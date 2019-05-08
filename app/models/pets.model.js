const mongoose = require('mongoose');
const petSchema = mongoose.Schema({
    pet_id: {
        type: Number,
        required: true,
        unique: true
    },
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
    },
    contact: {}
});
module.exports = mongoose.model('pet', petSchema,'pets');
