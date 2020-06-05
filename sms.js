const RC = require('ringcentral');
require('dotenv').config();

var rcsdk = new RC({
    server: `${process.env.RINGCENTRAL_SERVER}`,
    appKey: `${process.env.RINGCENTRAL_APP_KEY}`,
    appSecret: `${process.env.RINGCENTRAL_APP_SECRET}`
});
var platform = rcsdk.platform();
platform.login({
    username: `${process.env.RINGCENTRAL_USERNAME}`,
    password: `${process.env.RINGCENTRAL_PASSWORD}`,
    extension:`${process.env.RINGCENTRAL_EXT}`
    })
    .then(function(resp) {
        send_sms()
    });

function send_sms(){
  platform.post('/account/~/extension/~/sms', {
       from: {'phoneNumber': `${process.env.RINGCENTRAL_USERNAME}`},
       to: [{'phoneNumber': `${process.env.RINGCENTRAL_TEST_PHONE_NUMBER}`}],
       text: 'RingCentral SMS API test'
     })
     .then(function (resp) {
        console.log("SMS sent. Message status: " + resp.json().messageStatus)
     });
}