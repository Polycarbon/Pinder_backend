const rooms = require('../controllers/rooms.controlller');

module.exports = (app) => {
    app.route('/rooms')
        .get(rooms.getRoom())
        .post(rooms.createRoom);
}
