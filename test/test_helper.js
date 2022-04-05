const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const mongodb = require('../config/mongo_connector');
const User = require('../src/models/user');

    //this.timeout("10s");

    before(() => {
        mongoose.disconnect();
        mongodb.createTestConnection();
    });

    // beforeEach((done) => {
    //     //mongoose.connection.db.dropCollection('users', function(err, result) { done()});
    //     User.collection.drop(() => {
    //                     done();
    //                 });
    //             });
    //         });
    //     });
    // });