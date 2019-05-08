const pets = require('../controllers/pets.controller');

module.exports = (app) => {
    app.route('/pets')
        .get(pets.findAll)
        .post(pets.create);

    // Create a new Note
    app.get('/pets/generate', pets.generate);

};
