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

const sendNotificationToUser = async function () {
  //cronjob get all user then send notification to users who have notification enabled
  try {
    const fetch = createApolloFetch({
      uri: QUERY_GRAPHQL_URL,
    });
    let result = await fetch({
      query: `query sendNotificationToUser {
                users {
                    userName
                    userEnableNotification
                    productName
                    firebaseToken
                  }
                }
        `
    });

    //get all user
    let allUsers = result.data.users;
    console.log("sendNotificationToUser", allUsers);
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