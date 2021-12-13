var admin = require("firebase-admin");
var { PROJECT_ID, PRIVATE_KEY_ID, PRIVATE_KEY,
  CLIENT_EMAIL, CLIENT_ID, AUTH_URI,
  TOKEN_URI, AUTH_PROVIDER_X509_CERT_URL, CLIENT_X509_CERT_URL } = require("../config/firebase-notification.config")

var serviceAccount = {
  "type": "service_account",
  "project_id": PROJECT_ID,
  "private_key_id": PRIVATE_KEY_ID,
  "private_key": PRIVATE_KEY,
  "client_email": CLIENT_EMAIL,
  "client_id": CLIENT_ID,
  "auth_uri": AUTH_URI,
  "token_uri": TOKEN_URI,
  "auth_provider_x509_cert_url": AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": CLIENT_X509_CERT_URL
}

admin.initializeApp({
  //credential: admin.credential.cert(serviceAccount),
  projectId: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
  databaseURL: "https://uplog-99fc1-default-rtdb.firebaseio.com"
});

const options = {
  priority: "high",
  timeToLive: 60 * 60 * 24
};

const send = function (registrationToken, message, onSuccess, onFailed) {
  admin.messaging().sendToDevice(registrationToken, message, options)
    .then(response => {
      onSuccess("Notification sent successfully")
    })
    .catch(error => {
      onFailed(error);
    });
}

module.exports = {
  send
}