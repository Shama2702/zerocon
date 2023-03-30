const express = require("express");
const router = express.Router();
const conn = require('./../../db_conn');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var checkToken = require('./../auth/validateToken');

const { signupSchema, signinSchema } = require('./../models/user');

router.post("/signup", (req, res, next) => {
    const { error, value } = signupSchema.validate(req.body);
    if (error) {
        return res.status(501).json({
            msg: 'Validation error',
            error: error.message
        });
    }
    const numberCheckingQry = `SELECT user_id FROM user WHERE contact_number LIKE '${value.contact_number}';`;
    conn.query(numberCheckingQry, (err, result) => {
        if (err) {
            return res.status(501).json({
                msg: "Number checking error",
                error: err.message
            })
        }

        if (result.length) {
            return res.status(406).json({
                msg: "This number already exist",
                error: "This number already exist"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        bcrypt.hash(value.password, salt, (err, hash) => {
            if (err) {
                return res.status(501).json({
                    msg: "Password can't bcrypt",
                    error: err.message
                });
            }
            value.password = hash;
            let signupQry = "INSERT INTO user (user_id, first_name, last_name, gender, contact_number, address, password) VALUES (?);";
            let signupValues = [null, value.first_name, value.last_name, value.gender, value.contact_number, value.address, value.password];
            conn.query(signupQry, [signupValues], (err, result, fields) => {
                if (err) {
                    return res.status(501).json({
                        msg: "User info fail to insert in database",
                        error: err.message,
                    });
                }

                return res.status(200).json({
                    msg: 'Registration success',
                    data: {
                        user_id: result.insertId
                    }
                });
            })

        })

    })
})

router.post("/signin", (req, res, next) => {
    const { error, value } = signinSchema.validate(req.body);
    if (error) {
        return res.status(501).json({
            msg: 'Validation error',
            error: error.message
        });
    }
    const numberCheckingQry = `SELECT user_id, password FROM user WHERE contact_number LIKE '${value.contact_number}';`;
    conn.query(numberCheckingQry, (err, result) => {
        if (err) {
            return res.status(501).json({
                msg: "Number checking error",
                error: err.message
            })
        }

        if (result.length < 1) {
            return res.status(404).json({
                msg: "User not found",
                error: "User not found"
            })
        }

        const user = result[0];

        bcrypt.compare(value.password, user.password)
            .then(result => {
                if (!result) {
                    return res.status(401).json({
                        msg: "Wrong Password",
                        error: "Wrong Password"
                    })
                }

                var token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
                    expiresIn: "7 days"
                });

                if (token) {
                    return res.status(200).json({
                        msg: "Login success",
                        data: {
                            token: token
                        }
                    })
                }

                return res.status(501).json({
                    msg: "JWT token generate fail",
                    error: "JWT Error"
                })

            })

    })
})


router.get("/auth", checkToken, (data, req, res, next) => {

    // const userInfoQry = `SELECT * FROM user WHERE user_id LIKE '${data.user_id}';`;
    const userInfoQry = `
    SELECT user.*, profile_pic.profile_pic_url
    FROM user 
    LEFT JOIN profile_pic 
    ON user.user_id=profile_pic.user_id`;

    conn.query(userInfoQry, (err, result)=> {
        if (err) {
            return res.status(501).json({
                msg: "Fetching user info fail",
                error: err.message
            })
        }

        var userInfo = result[0];
        delete userInfo.password;

        return res.status(200).json({
            msg: "Fetching user info success",
            data: userInfo
        })

    })
})



module.exports = router;