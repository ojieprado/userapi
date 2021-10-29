const mySql = require('./db.model');

class User {
    constructor(user) {
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.address = user.address;
        this.postcode = user.postcode;
        this.phone = user.phone;
        this.email = user.email;
        this.username = user.username;
        this.password = user.password;
    };

    // Create New User
    static insertOne(newUser, result) {
        mySql.query("INSERT INTO usertbl SET ?", newUser, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newUser });
        });
    }

    // FindOne User
    static findOne(UserId, result) {
        mySql.query(`SELECT * FROM usertbl WHERE id = ${UserId}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found User: ", res[0]);
                result(null, res[0]);
                return;
            }
            result({ msg: "Not_Found" }, null);
        });
    }

    static findEmail(email, result) {
        mySql.query(`SELECT * FROM usertbl WHERE email = ${email}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found User: ", res[0]);
                result(null, res[0]);
                return;
            }
            result({ msg: "Not_Found" }, null);
        });
    }

    // Get All User
    static findAll(result) {
        mySql.query("SELECT * FROM usertbl", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("usertbl: ", res);
            result(null, res);
        });
    }

    // UpdateOne User
    static updateOne(id, User, result) {
        mySql.query(
            "UPDATE usertbl SET email = ?, name = ?, active = ? WHERE id = ?",
            [User.email, User.name, User.active, id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                    // not found User with the id
                    result({ msg: "Not_Found" }, null);
                    return;
                }

                console.log("updated User: ", { id: id, ...User });
                result(null, { id: id, ...User });
            }
        );
    }

    // removeOne User
    static deleteOne(id, result) {
        mySql.query("DELETE FROM usertbl WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted User with id: ", id);
            result(null, res);
        });
    }

    // removeEach User
    static deleteEach(ids, result) {
        mySql.query("DELETE FROM usertbl WHERE id IN (?)", ids, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} usertbl`);
            result(null, res);
        });
    }
};

module.exports = User;