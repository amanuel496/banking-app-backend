const router = require('express').Router();
let Customer = require('../models/customers.model');
var authJwtController = require('./auth_jwt.js');

router.route('/').get((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post(authJwtController.isAuthenticated, (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const gender = req.body.gender;
    const accountType = req.body.accountType;
    const accountNumber = req.body.accountNumber;
    const amount = req.body.amount;

    const newCustomer = new Customer({
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        accountType: accountType,
        accountNumber : accountNumber,
        amount: amount
    });
    newCustomer.save()
        .then(() => res.json('Customer added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:accountNumber').get(authJwtController.isAuthenticated, (req, res) => {
    Customer.find({accountNumber: req.params.accountNumber})
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').delete(authJwtController.isAuthenticated, (req, res) => {
    Customer.deleteOne({accountNumber: req.body.accountNumber})
        .then(() => res.json('Customer deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').put(authJwtController.isAuthenticated, (req, res) => {
    Customer.find({accountNumber: req.body.accountNumber})
        .then(customer => {
            newCustomer = new Customer({
                name: req.body.name,
                accountNumber: req.body.accountNumber,
                amount: req.body.amount,
            });
            newCustomer.save()
                .then(() => res.json('Customer updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
            Customer.deleteOne({accountNumber: req.body.accountNumber})
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;