// import User model
const User = require('../model/user.model');
const { HASH_STRING } = process.env;

// import jsonwebtoken
const jwt = require('jsonwebtoken'),
const bcrypt = require('bcryptjs');

//DEFINE CONTROLLER FUNCTIONS

// User Register function
exports.register = (req, res) => {
    let newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        user.hash_password = undefined;
        res.status(201).json(user);
    });
};

// User Sign function
exports.signIn = (req, res) => {
    User.findEmail({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        if (!data) {
            res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else {
            bcrypt.compare(req.body.password, data.password,
                (err, res) => {
                    if (err) {
                        return res.status(401).send({
                            msg: 'Username or password is incorrect!'
                        });
                    }
                    if (res) {
                        const token = jwt.sign({
                            username: result[0].username,
                            userId: result[0].id
                        },
                            'SECRETKEY', {
                            expiresIn: '7d'
                        }
                        );

                    }
                });
        }
    };

    // User Register function
    exports.loginRequired = (req, res, next) => {
        if (req.user) {
            res.json({ message: 'Authorized User, Action Successful!' });
        } else {
            res.status(401).json({ message: 'Unauthorized user!' });
        }
    };