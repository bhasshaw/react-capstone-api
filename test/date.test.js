'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const expect = chai.expect;

const { app, runServer, closeServer } = require('../server');
const { Date } = require('../dates/router');
const { JWT_SECRET, DATABASE_URL } = require('../config');

chai.use(chaiHttp);

const token = jwt.sign(
    {
        user :{
            username: "user4"
        }
    },
    JWT_SECRET,
    {
        algorithm: 'HS256',
        expiresIn: '7d'
    }
);

describe('Date', function () {
    before(() => {
        return runServer(DATABASE_URL);
    });
    after(() => {
        return closeServer();
    });
    it('Should list dates after GET', function () {
        return chai 
            .request(app)
            .get('/api/dates/date')
            .set('Authorization', `Bearer ${token}`)
            .then(function(res) {
                expect(res).to.have.status(200)
            })
    });
    it('Should add date on POST', function () {
        const newPost = {
            park: "Test Park",
            date: "01/01/2019",
            startTime: "5:00PM",
            endTime: "5:30PM"
        }
        return chai
            .request(app)
            .post('/api/dates/date')
            .set('Authorization', `Bearer ${token}`)
            .send(newPost)
            .then(function(res) {
                expect(res).to.have.status(201)
            })
    });
    it('Should delete date on DELETE', function () {
        return chai 
            .request(app)
            .get('/api/dates/date')
            .set('Authorization', `Bearer ${token}`)
            .then(function(res) {
                return chai.request(app)
                    .delete(`/api/dates/date/${res.body[0].id}`)
                    .set('Authorization', `Bearer ${token}`)
            })
            .then(function(res) {
                expect(res).to.have.status(204)
            })
    });
});