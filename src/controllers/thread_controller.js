const Thread = require('../models/thread')

function getAll(req, res) {
    Thread.find({}, {
            __v: 0
        })
        .then(threads => {
            res.status(200).send(threads)
        })
}

function getOne(req, res) {
    Thread.findOne({
            _id: req.headers._id
        })
        .then(thread => {
            if (thread === null) {
                res.status(401).send({
                    Error: 'thread does not exist'
                })
            } else {
                res.status(200).send(thread);
                console.log('>>thread returned')
            }
        })
}

function create(req, res) {
    Thread.create({
            title: req.body.title,
            text: req.body.text,
            imageLink: req.body.imageLink,
            plant: req.body.plant,
        })
        .then(() =>
            res.status(200).send({
                Message: "thread created succesfully"
            }), console.log('>>thread created'))
        .catch((err) => {
            if (err.name == 'MongoError' && err.code == 11000) {
                res.status(401).send({
                    Error: 'An thread with this title already exists.'
                });
            } else {
                res.status(401).send({
                    err
                });
            }
        });
};

function edit(req, res) {
    Thread.findOne({
        _id: req.body._id
    })
    .then(thread => {
        if( thread === null){
            res.status(401).send({
                Error: "Thread does not exist"
            })
        } else {
            let titleToSet = req.body.title;
            let textToSet = req.body.text;
            let imageLinkToSet = req.body.imageLink;
            let plantToSet = req.body.imageLink;

            if (req.body.title === '' || req.body.title === null) titleToSet = thread.title

        }
    })
}
module.exports = {
    getAll,
    getOne,
    create
}