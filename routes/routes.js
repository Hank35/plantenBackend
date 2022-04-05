const UserController = require('../src/controllers/user_controller');
const AuthController = require('../src/controllers/auth_controller');
const PlantController = require('../src/controllers/plant_controller');
const ClimateController = require('../src/controllers/climate_controller');

module.exports = (app) => {
    //
    //Login routes
    //
    //create a new user with 'name, password'
    app.post('/api/user/register', UserController.create);
    //create a token with 'name, password'
    app.post('/api/user/login', AuthController.login);

    //
    //User routes
    //
    //change password of an existing user with 'name, password, newPassword'
    app.put('/api/user/', AuthController.validateToken, UserController.edit);
    //remove a user from the database with 'name, password'
    app.delete('/api/user/', AuthController.validateToken, UserController.remove);

    //
    //Plant routes
    //
    //create new plant with name, family, description, waterneed, sunneed
    app.post('/api/plant/', AuthController.validateToken, PlantController.create);
    app.get('/api/plant/', PlantController.getAll);

    //
    //Climate routes
    //
    //get all climates
    app.get('/api/climate/', ClimateController.getAll);
    //create new climate with name, averageTemp, humidity
    app.post('/api/climate/', AuthController.validateToken, ClimateController.create)
};