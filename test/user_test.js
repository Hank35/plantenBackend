var User = require('../src/models/user');
var app = require('../server'),
    chai = require('chai'),
    request = require('supertest'),
    chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

describe('The usercontroller can', function () {
    this.timeout(0);
    var user = {
        name: 'UserRegisterTest',
        password: 'testpasswordChai',
        newPassword: 'nieuwepas'
    };

    it('log in and edit a users password', function (done) {
        User.collection.drop(() => {
            var token = 'Bearer ';
            request(app)
                .post('/api/user/register')
                .send(user)
                .end(function (err, res) {
                    expect(res.body.auth).to.equal(true);
                    expect(res.statusCode).to.equal(200);
                    token = 'Bearer ' + res.body.token;
                    chai.request(app)
                        .put('/api/user/')
                        .set({ 'Authorization': token })
                        .send(user)
                        .end(function (err, res) {
                            expect(res.statusCode).to.equal(200);
                            done();
                        });
                });
        });
    });
});