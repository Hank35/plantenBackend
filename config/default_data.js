const User = require('../src/models/user');
const Climate = require('../src/models/climate');

function addDefaultClimate() {
    Climate.findOne({
            name: 'default'
        })
        .then(climate => {
            if (climate === null) {
                Climate.create({
                    name: 'default',
                    averageTemp: 32,
                    humidity: 10
                })
            } else {
                climate.delete()
                    .then(() => addDefaultClimate());
            }
        })
}

function getDefaultClimate() {
    Climate.findOne({
            name: 'default'
        })
        .then(climate => {
            return climate
        })
};

function addTestUser() {
    User.findOne({
            name: 'TestUser'
        })
        .then(founduser => {
            if (founduser === null) {
                User.create({
                    name: 'TestUser',
                    password: 'TestPassword'
                })
            } else {
                founduser.delete()
                    .then(() => addTestUser());
            }
        });
}

module.exports = {
    addDefaultClimate,
    getDefaultClimate,
    addTestUser
}