var app = require('../server'),
    chai = require('chai'),
    request = require('supertest');
var expect = chai.expect;
var Climate = require('../src/models/climate');

describe('the climatecontroller can', function () {
    
    this.timeout(0);

    var user = {
        name: 'ClimateCreateTest',
        password: 'testpasswordChai'
    };

    var climate = {
        name: 'climateTest',
        averageTemp: '32',
        humidity: '12'
    };

    it('fetch all climates', function (done) {
        request(app)
            .get('/api/climate/')
            .end(function (err, res) {
                if (err) console.log(err);
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
    
    it('log in and create a climate', function (done) {
        Climate.collection.drop(() => {
            var token = 'Bearer';
            request(app)
                .post('/api/user/register')
                .send(user)
                .end(function (err, res) {
                    expect(res.body.authenticated).to.equal(true);
                    expect(res.body.statusCode).to.equal(200);
                    token = 'Bearer' + res.body.token;
                    chai.request(app)
                        .post('/api/climate/')
                        .set({'Authorization': token})
                        .send(climate)
                        .end(function (err, res) {
                            if(err) console.log(err);
                            expect(res.statusCode).to.equal(200);
                            done();
                        })
                })
        })
    })
})