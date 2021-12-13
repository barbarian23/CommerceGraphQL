//routes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

const { graphqlHTTP }  = require('express-graphql');

const {
  faceBookLoginCallback,
  userEnableNotification
} = require('../controller/user/user.controller');

const { getAllProducts } = require('../controller/product/product.controller');

const { dataSchema } = require('../schema/rootSchema');

router.get('/', function (req, res) {
  res.send("hello");
});

//call this API to register via shopping mall login using Facebook ID
router.get('/registration', passport.authenticate('facebook', { scope: 'email' }));

//API callback when facebook Login
router.get('/registration/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }),
  faceBookLoginCallback
);

//shopping notification should be sent every day to users who have notification enabled
router.post('/receiveNoti', userEnableNotification);

//The API for viewing the product list
router.get('/getAllProducts', getAllProducts);

//GraphQL query

router.get('/schemas',graphqlHTTP(dataSchema));

module.exports = {
  router
}