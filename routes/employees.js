const router = require('express').Router();
let User = require('../models/employee.model');
const jwt = require('jsonwebtoken');

// var bodyParser = require('body-parser');
// var passport = require('passport');
const bcrypt = require("bcrypt-nodejs");

router.post('/signup', function(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please include name, email and password to signup.'})
    } else {

      const email = req.body.email;
        User.findOne({email: email})
            .then(user => {
                let errors = {};
                if(user) {
                    if(user.email === req.body.email){
                        errors.email = "account already exists";
                    }
                    return res.status(400).json(errors);
                }
                else {
                  //  const { name, email, password } = req.body;
                    const createdUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });
                    try {
                        createdUser.save()
                    } catch (err) {
                    }
                    res.status(201).json({ success: true, msg: 'Successfully created new user.'});
                }}).catch(err => {
            return res.status(500).json({
                error: err
            })
        });
}});

router.post('/signin', function (req, res) {

    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'You need to include email and password to signin.'})
    } else {
        console.log("inside the second else");

        const email = req.body.email;
        const password = req.body.password;
        User.findOne({email: email})
            .then(user => {
                        if(user.email === req.body.email){
                            console.log(password);
                            console.log(user.password);
                        //    console.log("user exists");
                            bcrypt.compare(req.body.password, user.password, (err, isMatch)=>{
                                if(err) return res.status(500).json({
                                    error: err
                                })
                                if(isMatch){
                                    console.log("user exists");
                                    let token;
                                    token = jwt.sign(
                                        { name: user.name, email: user.email },
                                        process.env.SECRET_KEY,
                                        // { expiresIn: '5s' }
                                    );
                                    return  res.status(200).json({ token: token, name: user.name });
                                }
                                else  return res.status(400).json('Invalid credentials, could not log you in.');




                            })
                        } else  return res.status(400).json('Invalid credentials, could not log you in.');
                    }).catch(err => {
            return res.status(500).json({
                error: err
            })
        });
    }});
module.exports = router;