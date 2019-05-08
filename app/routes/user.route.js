const users = require('../controllers/user.controller');

module.exports = (app) => {
    app.route('/user')
        .get(users.findAll)
        .post(users.create);

    // Create a new Note
    app.get('/user/generate', users.generate);

    // Update a Note with noteId
    app.put('/user/update', users.update);

    // Delete a Note with noteId
    app.delete('/user/:userId', users.delete);

    app.route('/user/:userId')
        .delete(users.delete)
        .get(users.get);
}
