const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    postCode: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    picture: {
        large: String,
        medium: String,
        thumbnail: String
    },
    favorite:[{type: mongoose.Schema.ObjectId, ref: 'pet'}],
    filter_setting:{
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
}, {
    timestamps: true
});

module.exports = mongoose.model('user', UserSchema,'users');
