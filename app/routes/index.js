module.exports = app => {
    const User = require("../controller/user.controller");
    const Auth = require('../controllers/auth.controller');

    // Create a new Customer
    app.post("/user", User.create);

    // Retrieve all Customers
    app.get("/users", Auth.loginRequired, User.findAll);

    // Retrieve a single Customer with customerId
    app.get("/user/:id", Auth.loginRequired, User.findOne);

    // Update a Customer with customerId
    app.put("/user/:id", Auth.loginRequired, User.updateOne);

    // Delete a Customer with customerId
    app.delete("/user/:id", Auth.loginRequired, User.deleteOne);

    // Create each Customer
    app.delete("/users", Auth.loginRequired, User.deleteEach);
};