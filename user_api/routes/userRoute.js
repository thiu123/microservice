const userController = require("../controllers/userController");
const verifyAut = require("../middleware/authMiddleware");

module.exports = app => {
    app
        .route('/users') // Endpoint: /users, Methods: GET, POST
        .get(verifyAut, userController.getUsers); // Get all users

    app
        .route('/users/:userId') // Endpoint: /users/:userId, Methods: GET, PUT, DELETE
        .get(verifyAut, userController.getUserById) // Get a user by ID
        .put(verifyAut, userController.updateUser) // Update a user by ID
        .delete(verifyAut, userController.deleteUser); // Delete a user by ID

    app.post('/register', userController.createUser);
    app.post('/login', userController.login);
};
