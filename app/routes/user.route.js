const users = require('../controllers/user.controller');

module.exports = (app) => {
    app.route('/user')
        .get(users.findAll)
        .post(users.create);

    // Create a new Note
    app.get('/user/generate', users.generate);

    // Update a Note with noteId
    app.put('/user/update', users.updateProfile);

    //Update favorite list
    app.post('/user/like', users.like);

    app.route('/user/:userId')
        .delete(users.deleteById)
        .get(users.findById);
}
