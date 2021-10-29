const Model = require("../model/user.model");
const { HASH_STRING } = process.env;
// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a User
    const User = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        postcode: req.body.postcode,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    // Save User in the database
    Model.insertOne(User, (err, data) => {
        const errMsg = "Error occurred while creating the User.";
        if (err)
            res.status(500).send({ message: err.message || errMsg });
        else res.send(data);
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const errMsg = "Error occurred while retrieving Users.";
    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]) {
        return res.status(422).json({
            message: "Please provide the token",
        });
    }
    Model.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || errMsg
            });
        else res.send(data);
    });
};

// Find a single User with a UserId
exports.findOne = (req, res) => {
    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]) {
        return res.status(422).json({
            message: "Please provide the token",
        });
    }
    Model.findOne(req.params.UserId, (err, data) => {
        if (err) {
            if (err.msg === "Not_Found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.UserId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.UserId
                });
            }
        } else res.send(data);
    });
};

// Update a User identified by the UserId in the request
exports.updateOne = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]) {
        return res.status(422).json({
            message: "Please provide the token",
        });
    }
    Model.updateOne(
        req.params.UserId,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.msg === "Not_Found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.UserId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating User with id " + req.params.UserId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a User with the specified UserId in the request
exports.deleteOne = (req, res) => {
    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]) {
        return res.status(422).json({
            message: "Please provide the token",
        });
    }
    Model.deleteOne(req.params.UserId, (err, data) => {
        if (err) {
            if (err.msg === "Not_Found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.UserId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.UserId
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};

// Delete all Users from the database.
exports.deleteEach = (req, res) => {
    if (!req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]) {
        return res.status(422).json({
            message: "Please provide the token",
        });
    }
    Model.deleteEach(req.body.ids, (err, data) => {
        const errMsg = "Some error occurred while removing all Users.";
        if (err) res.status(500).send({ message: err.message || errMsg });
        else res.send({ message: `All Users were deleted successfully!` });
    });
};