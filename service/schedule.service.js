var cron = require('node-cron');

const dailyNotification = function (job){
  cron.schedule('30 11 * * *', () => {
    job();
  }, {
    scheduled: true,
    timezone: "Asia/Bangkok" //because there is no Asia/Ho_Chi_Minh in node-cronlibrary
  });
}

module.exports = {
  dailyNotification
}