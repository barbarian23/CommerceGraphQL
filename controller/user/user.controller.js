const { createApolloFetch } = require('apollo-fetch');
const { send } = require('../../service/pushNotification.service');
const { dailyNotification } = require('../../service/schedule.service');

const sendNotificationToUser = async function () {
  //cronjob get all user then send notification to users who have notification enabled
  try {
    const fetch = createApolloFetch({
      uri: 'http://localhost:4000/graphql',
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
const faceBookLoginCallback = function (req, res) {
  res.redirect('/home');
}

//user send firebaseToken in body
const userEnableNotification = function (req, res) {
  const fetch = createApolloFetch({
    uri: 'http://localhost:4000/graphql',
  });
  console.log("userEnableNotification", req.body);
  fetch({
    mutation: `mutation EnableNotification {
             enable(fToken:${req.body.firebaseToken}) {
                Boolean
              }
            }
      `
  }).then(function (result) {
    console.log(result.data);
    res.send(JSON.stringify(result.data));
  }).catch(function (err) {
    console.log("eror", err);
    res.send("there is a error", err);
  });

}

//register product
const userRegisterProduct = async function (req, res) {
  try {
    //create a product
    const fetch = createApolloFetch({
      uri: 'http://localhost:4000/graphql',
    });
    console.log("register product", req.body);
    let resultRegisterProduct = await fetch({
      mutation: `mutation CreateAProduct {
              insert(productName: ${req.body.productName},
                     productDetail: ${req.body.productDetail}, 
                     deliveryFee: ${req.body.deliveryFee}, 
                     totalNumber: ${req.body.totalNumber}) {
                      Boolean
              }
            }
      `
    });


    //register to user
    let resultRegisterUsr = await fetch({
      mutation: `mutation registerProduct {
              registerProduct(fToken:${req.body.firebaseToken}, productName: ${req.body.productName}) {
                Boolean
              }
            }
      `
    });

    res.send("Register success fully " + JSON.stringify(resultRegisterUsr.data));
  } catch (err) {
    res.send("there is a error", err);
  }
}

module.exports = {
  faceBookLoginCallback,
  userEnableNotification,
  userRegisterProduct
}