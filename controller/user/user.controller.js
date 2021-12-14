const {
  send
} = require('../../service/pushNotification.service');
const {
  dailyNotification
} = require('../../service/schedule.service');
const {
  QUERY_GRAPHQL_URL,
  GRAPHQL_URL
} = require("../../constant/common.constant");

const {connect,findAll} = require('../../service/mongo.service');
const {MONGO_CONNECTION_STRING, MONGO_DB, TABLE_USER} = require("../../config/mongo.config");


const sendNotificationToUser = async function () {
  //cronjob get all user then send notification to users who have notification enabled
  try {
    let db = await connect(MONGO_CONNECTION_STRING, MONGO_DB);
    let tList = await findAll(db, TABLE_USER);

    //get all user
    console.log("sendNotificationToUser", tList);
    let allUsers = tList;
    if (allUsers) {
      allUsers.forEach(function (item) {
        if (item.productRegister) {
          let payload = {
            "notification": {
              "title": "Shopping notification ",
              "body": "This is your shopping notification "
            }
          }

          send(item.firebaseToken, payload, function (msg) {
              console.log(msg);
            },
            function (err) {
              console.log("There is a error when send notification to user with error", err);
            });

        }
      });
    }
  } catch (err) {
    console.log("sendNotificationToUser err", err);
  }
};

//cronjob to send notification
dailyNotification(
  sendNotificationToUser
);

//callback url for login facebook successfully
const faceBookLoginCallback = async function (req, res) {
  console.log("req",req,"res",res,"is authen",req.isAuthenticated());
  //res.redirect(GRAPHQL_URL);
}

module.exports = {
  faceBookLoginCallback
}