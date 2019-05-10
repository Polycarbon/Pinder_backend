const pets = require('../controllers/pets.controller');

module.exports = (app) => {
    app.route('/pets')
        .get(pets.findAll)
        .post(pets.findByList);

    //find pet by Id
    app.route('/pets/:petId')
        .get(pets.findById)
    // Create a new Note
    app.get('/pets/generate/:n', pets.generate);

};
