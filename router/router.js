//routes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  faceBookLoginCallback
} = require('../controller/user/user.controller');

const { getAllProducts } = require('../controller/product/product.controller');

router.get('/', function (req, res) {
  res.send("This is a test sample");
});

//call this API to register via shopping mall login using Facebook ID
router.get('/registration', passport.authenticate('facebook', { scope: 'email' }));

//API callback when facebook Login
router.get('/registration/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }),
  faceBookLoginCallback
);

//The API for viewing the product list
router.get('/getAllProducts', getAllProducts);

module.exports = {
  router
}