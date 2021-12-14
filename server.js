const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');
// const cors = require('cors');

const { router } = require('./router/router');
const { PASSPORT_SECRET, PASSPORT_KEY, PORT, GRAPHQL_URL } = require("./constant/common.constant");
const { FACEBOOK_API_KEY, FACEBOOK_API_SECRET, CALLBACK_URL } = require("./config/facebook.config");


(async ()=>{
// Passport session setup
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

//use passport-facebook FacebookStrategy.
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_API_KEY,
  clientSecret: FACEBOOK_API_SECRET,
  callbackURL: CALLBACK_URL
},
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(accessToken, refreshToken, profile, done);
      
      return done("profile", profile);
    });
  }
));

app.use(cookieParser()); //Parse cookie
app.use(bodyParser.urlencoded({ extended: false })); //Parse body
app.use(bodyParser.json());
app.use(session({ secret: PASSPORT_SECRET, key: PASSPORT_KEY,saveUninitialized: true,
  resave: true, }));  //create session
  
app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

const httpServer = http.createServer(app);

const { user, userResolvers }  = require('./schema/user/user.schema');
const { product, productResolvers }  = require('./schema/product/product.schema');
const { merge } = require('lodash');
// const {makeExecutableSchema} = require('@graphql-tools/schema');

const dataSchema = {
  typeDefs: [ user,product ],
  resolvers: merge(userResolvers, productResolvers),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: ({ req }) => {
    // retrict user that not login
    if (!req.isAuthenticated()) {
      throw new Error('you must be logged in though facebook');
    }
  },
};

const apoloServer = new ApolloServer(dataSchema);

await apoloServer.start();
apoloServer.applyMiddleware({
  app,
  //cors: true, // set cors for disable connection from out side
  path: GRAPHQL_URL 
});

//whitelist
// var corsOptions = {
//   origin: true,
//   optionsSuccessStatus: 200 
// }

httpServer.listen({ port: PORT }, ()=>{
  console.log(`Server is listening on port ${PORT}`);
});
})()
