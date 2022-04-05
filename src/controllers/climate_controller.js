const Climate = require('../models/climate');
const defS = require('../../config/default_data');

function getAll(req, res) {
    Climate.find({}, {
            __v: 0
        })
        .then(climates => {
            res.status(200).send(climates);
            console.log('>>climates returned');
        });
};

function getOne(req, res) {
    Climate.findOne({
            _id: req.headers._id
        })
        .then(climate => {
            if (climate === null) {
                res.status(401).send({
                    Error: 'climate does not exist.'
                })
            } else {
                res.status(200).send(climate);
                console.log('>>climate returned');
            }
        })
}

function getOneById(req, res) {
    Climate.findById(req.params.id)
        .then(climate => {
            if (climate === null) {
                res.status(401).send({
                    Error: 'climate does not exist.'
                })
            } else {
                res.status(200).send(climate);
                console.log('>>climate returned');
            }
        })
}

function create(req, res) {
    Climate.create({
            name: req.body.name,
            averageTemp: req.body.averageTemp,
            humidity: req.body.humidity,
        })
        .then(() =>
            res.status(200).send({
                Message: "climate created succesfully."
            }),
            console.log('>>climate created'))
        .catch((err) => {
            if (err.name == 'MongoError' && err.code == 11000) {
                res.status(401).send({
                    Error: 'An climate with this name already exists.'
                });
            } else {
                res.status(401).send({
                    err
                });
            }
        });
};

function edit(req, res) {
    Climate.findOne({
            _id: req.body._id
        })
        .then(climate => {
            if (climate === null) {
                res.status(401).send({
                    Error: 'climate does not exist.'
                })
            } else {
                let nameToSet = req.body.name;
                let averageTempToSet = req.body.averageTemp;
                let humidityToSet = req.body.humidity;

                if (req.body.name === '' || req.body.name === null) nameToSet = climate.name
                if (req.body.averageTemp === '' || req.body.averageTemp === null) descToSet = climate.averageTemp
                if (req.body.humitidy === '' || req.body.humitidy === null) imgToSet = climate.humitidy

                climate.set({
                    name: nameToSet,
                    humidity: averageTempToSet,
                    humitidy: humidityToSet,

                })
                climate.save()
                    .then(() => {
                        res.status(200).send({
                            Message: "climate edited succesfully"
                        })
                        console.log('>>>climate edited')
                    })
                    .catch((err) => res.status(401).send({
                        err
                    }));
            }
        });
};

function remove(req, res) {
    Climate.findOne({
            _id: req.headers._id
        })
        .then(climate => {
            if (climate === null) {
                res.status(401).send({
                    Error: 'climate does not exist.'
                })
            } else {
                climate.delete()
                    .then(() => {
                        res.status(200).send({
                            Message: 'climate succesfully removed.'
                        })
                        console.log('>>>climate removed')
                    });
            }
        });
};

module.exports = {
    getAll,
    getOne,
    getOneById,
    create,
    edit,
    remove
}