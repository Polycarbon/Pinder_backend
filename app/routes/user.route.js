const users = require('../controllers/user.controller');

module.exports = (app) => {
    app.route('/user')
        .get(users.findAll)

    // Create a new Note
    app.get('/user/generate', users.generate);

    // Update a user Profile
    app.post('/user/update', users.updateProfile);

    //Update like list
    app.post('/user/like', users.like);

    //Update dislike list
    app.post('/user/dislike', users.dislike);

    app.route('/user/:userId')
        .delete(users.deleteById)
        .get(users.findById);
}
