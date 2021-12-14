//routes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  GRAPHQL_URL,
  PLAYGORUND_URL
} = require("../constant/common.constant");

const {
  faceBookLoginCallback
} = require('../controller/user/user.controller');

const { getAllProducts } = require('../controller/product/product.controller');

router.get('/', function (req, res) {
  console.log("get",req.isAuthenticated());
  res.send("This is a test sample");
});

//call this API to register via shopping mall login using Facebook ID
router.get('/registration', passport.authenticate('facebook', { scope: 'email' }));

//API callback when facebook Login

router.get('/registration/facebook/callback',
passport.authenticate('facebook', { successRedirect : '/', failureRedirect: '/' }),
function(req, res) {
  console.log("callback",req.isAuthenticated());
  //res.redirect('/');
});

//The API for viewing the product list
router.get('/getAllProducts', getAllProducts);


module.exports = {
  router
}