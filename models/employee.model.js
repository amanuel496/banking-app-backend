var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

try {
    mongoose.connect( process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log("DB connected"));
}catch (error) {
    console.log("could not connect the DB");
}
mongoose.set('useCreateIndex', true);

//Employee schema
var EmployeeSchema = new Schema({
    name: String,
    email: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true, select: true }
});

EmployeeSchema.pre('save', function(next) {
    var Employee = this;

    //hash the password
    if (!Employee.isModified('password')) return next();

    bcrypt.hash(Employee.password, null, null, function(err, hash) {
        if (err) return next(err);

        //change the password
        Employee.password = hash;
        next();
    });
});

//return the model to server
module.exports = mongoose.model('Employee', EmployeeSchema);