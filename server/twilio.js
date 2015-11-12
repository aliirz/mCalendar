// if (Meteor.isServer) {
Meteor.startup(function () {
  Meteor.methods({
    'sendSMS' : function (phoneNumber, ce) {
        console.log('server side');
      // configure this with your twilio details
      twilioClient = Twilio("<Acc_SID>", "<Auth_token>");
      twilioClient.sendSms({
        to:   phoneNumber, // passed as a parameter
        from: '+15555555555', //change this with the number you purchased from twilio
        body: '' //This string can be made from all the data that has been passed in the ce parameter
      },function(err, data) {
        console.log(err, data);
      })
    }
  });
});
// }
