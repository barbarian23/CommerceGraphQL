var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-notification.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://uplog-99fc1-default-rtdb.firebaseio.com"
});

const options = {
  priority: "high",
  timeToLive: 60 * 60 * 24
};

const send = function (registrationToken, message, onSuccess, onFailed){
  admin.messaging().sendToDevice(registrationToken, message, options)
  .then( response => {
    onSuccess("Notification sent successfully")})
  .catch( error => {
    onFailed(error);
  });
}

module.exports = {
  send
}