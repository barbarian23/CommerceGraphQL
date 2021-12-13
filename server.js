const express = require('express');
const passport = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;
const session  = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {router} = require('./router/router');
const app = express();

const { PASSPORT_SECRET, PASSPORT_KEY, PORT } = require("./constant/common.constant");
const { FACEBOOK_API_KEY, FACEBOOK_API_SECRET, CALLBACK_URL } = require("./config/facebook.config");


// Passport session setup
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//use passport-facebook FacebookStrategy.
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_API_KEY,
    clientSecret: FACEBOOK_API_SECRET ,
    callbackURL: CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(accessToken, refreshToken, profile, done);
      return done("profile", profile);
    });
  }
));

//app.set('views', __dirname + '/views');
app.use(cookieParser()); //Parse cookie
app.use(bodyParser.urlencoded({ extended: false })); //Parse body
app.use(session({ secret: PASSPORT_SECRET, key: PASSPORT_KEY}));  //create session
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}`);
});