'use strict';
const express = require('express');
const passport = require('passport');
const {Date} = require('./models');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/date', jwtAuth, (req, res) => {
    Date
        .find(req.params)
        .then(dates => {
            res.json(dates.map(date => date.serialize()));
        })
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'});
		})
});

router.post('/date', jsonParser, (req, res) => {
    console.log(req.body);
    const requiredFields = ['street', 'city', 'state', 'zip', 'date', 'time'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
        }
    }
    Date
        .create(req.body)
        .then( dateLog => res.status(201).json(dateLog.serialize()))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong' });
        });

});

router.put('/date/:id', jwtAuth, jsonParser, (req, res) => {
    const requiredFields = ['street', 'city', 'state', 'zip', 'date', 'time'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
        }
    }
    const toUpdate = {
        id: req.body.id,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        date: req.body.date,
        time: req.body.time
    };

    Date
        .findByIdAndUpdate(req.params.id, {$set: toUpdate})
        .then(updatedDate => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});

router.delete('/date/:id', jwtAuth, (req, res) => {
    Date
          .findByIdAndRemove(req.params.id)
          .then(() => {
              res.status(204).end()
          })
          .catch(err => {
              console.error(err);
              res.status(500).json({ error: 'Something went wrong' });
          });
  });

module.exports = {router};