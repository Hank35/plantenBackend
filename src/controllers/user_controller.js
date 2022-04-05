const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/auth_config');

function create(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name: req.body.name,
        password: hashedPassword
    })  
    .then(madeUser => {
        console.log('>>user saved')
        var token = jwt.sign({ id: madeUser._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ Message: "User created succesfully.", auth: true, token: token });
    })
    .catch((err) => {
            if (err.name == 'MongoError' && err.code == 11000) {
                res.status(401).send({ Error: 'Username is taken.'});
            } else {
                res.status(401).send({err});
            }
    });
};

function edit(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.newPassword, 8);
    User.findOne( { name: req.body.name } )
    .then(user => {
        if(user === null){
            res.status(401).send({ Error :'User does not exist.'})
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            res.status(401).send({ Error :'Current password does not match.'})
        }
        else {
            user.set({password: hashedPassword})
            user.save()
            .then(() => res.status(200).send({Message: "password changed succesfully"}))
            .catch((err) => res.status(401).send({err}));
        }
    });
};

function remove(req, res) {
    User.findOne( { name: req.headers.name } )
    .then(user => {
        if(user === null){
            res.status(401).send({ Error :'User does not exist. ' + req.headers.name})
        }
        var passwordIsValid = bcrypt.compareSync(req.headers.password, user.password);
        if(!passwordIsValid) {
            res.status(401).send({ Error :'Current password does not match.'})
        }
        else {
            user.delete()
            .then(() => res.status(200).send({ Message :'User succesfully removed.'}));
        }
    });
};

module.exports = {
    create,
    edit,
    remove
}