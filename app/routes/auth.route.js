const auth = require('../controllers/auth.controller');

module.exports = (app) => {
    // Login
    app.post('/login', auth.login);

    //Register
    app.post('/register', auth.register);

    //verify token
    app.post('/verify', auth.verify);
};
