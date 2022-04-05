const Plant = require('../models/plant');
const defS = require('../../config/default_data');

function getAll(req, res) {
    plant.find({}, {
            __v: 0
        })
        .then(plants => {
            res.status(200).send(plants);
            console.log('>>plants returned');
        });
};

function getOne(req, res) {
    Plant.findOne({
            _id: req.headers._id
        })
        .then(plant => {
            if (plant === null) {
                res.status(401).send({
                    Error: 'plant does not exist.'
                })
            } else {
                res.status(200).send(plant);
                console.log('>>plant returned');
            }
        })
}

function getOneById(req, res) {
    Plant.findById(req.params.id)
        .then(plant => {
            if (plant === null) {
                res.status(401).send({
                    Error: 'plant does not exist.'
                })
            } else {
                res.status(200).send(plant);
                console.log('>>plant returned');
            }
        })
}

function create(req, res) {
    Plant.create({
            name: req.body.name,
            family: req.body.family,
            description: req.body.description,
            imageLink: req.body.imageLink,
            waterNeed: req.body.waterNeed,
            sunNeed: req.body.sunNeed
        })
        .then(() =>
            res.status(200).send({
                Message: "plant created succesfully."
            }),
            console.log('>>plant created'))
        .catch((err) => {
            if (err.name == 'MongoError' && err.code == 11000) {
                res.status(401).send({
                    Error: 'An plant with this name already exists.'
                });
            } else {
                res.status(401).send({
                    err
                });
            }
        });
};

function edit(req, res) {
    Plant.findOne({ _id: req.body._id })
        .then(plant => {
            if (plant === null) {
                res.status(401).send({ Error: 'plant does not exist.' })
            }
            else {
                let nameToSet = req.body.name;
                let descToSet = req.body.description;
                let familyToSet = req.body.family;
                let climateToSet = req.body.climate;
                let imgToSet = req.body.imageLink;
                let waterNeedToSet = req.body.waterNeed;
                let sunNeedToSet = req.body.sunNeed;
                if (req.body.name === '' || req.body.name === null) nameToSet = plant.name
                if (req.body.description === '' || req.body.description === null) descToSet = plant.description
                if (req.body.family === '' || req.body.family === null) descToSet = plant.family
                if (req.body.imageLink === '' || req.body.imageLink === null) imgToSet = plant.imageLink
                if (req.body.waterNeed === '' || req.body.waterNeed === null) waterNeedToSet = plant.waterNeed
                if (req.body.sunNeed === '' || req.body.sunNeed === null) sunNeed = plant.sunNeed;
                

                plant.set({
                    name: nameToSet,
                    description: descToSet,
                    family : familyToSet,
                    imageLink: imgToSet,
                    waterNeed: waterNeedToSet,
                    sunNeed: sunNeedToSet
                })
                plant.save()
                    .then(() => {
                        res.status(200).send({ Message: "plant edited succesfully" })
                        console.log('>>>plant edited')
                    })
                    .catch((err) => res.status(401).send({ err }));
            }
        });
};

function remove(req, res) {
    Plant.findOne({ _id: req.headers._id })
        .then(plant => {
            if (plant === null) {
                res.status(401).send({ Error: 'plant does not exist.' })
            }
            else {
                plant.delete()
                    .then(() => {
                        res.status(200).send({ Message: 'plant succesfully removed.' })
                        console.log('>>>plant removed')
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