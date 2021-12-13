const { graphql } = require('graphql');
const { dataSchema } = require('../../schema/rootSchema');
const { send } = require('../../service/pushNotification.service');
const { dailyNotification } = require('../../service/schedule.service');

const sendNotificationToUser = function (req, res) {
  //cronjob get all user then send notification to users who have notification enabled

  graphql(dataSchema, `{users}`).then((response) => {
    let allUsers = response.data;
    if (allUsers) {
      allUsers.forEach(function (item) {
        if (item.productRegister) {
          let payload = {
            "notification": {
              "title": "Shopping notification ",
              "body": "This is your shopping notification "
            }
          }

          dailyNotification(
            send(item.firebaseToken, payload, function (msg) {
              console.log(msg);
            },
              function (err) {
                console.log("There is a error when send notification to user with error", err);
              })
          );
        }
      });
    }
  });
};

sendNotificationToUser();

const faceBookLoginCallback = function (req, res) {
  res.redirect('/home');
}

//user send firebaseToken in body
const userEnableNotification = function (req, res) {
  graphql(dataSchema, `{enable(${req.body.firebaseToken})}`).then((response) => { `132@{123}`
      if (response.data) {
        res.send("success");
      } else {
        res.send("failed");
      }
    });
}

module.exports = {
  faceBookLoginCallback,
  userEnableNotification
}