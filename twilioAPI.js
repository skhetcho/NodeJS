require('dotenv').config();
const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_ACCOUNT_AUTH_TOKEN}`;
const client = require('twilio')(accountSid, authToken);
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const response = new VoiceResponse();

client.calls
    .create({
        twiml: `${response.say('Hello World')}`,
        to: `${process.env.TWILIO_TO_NUMBER}`,
        from: `${process.env.TWILIO_FROM_NUMBER}`,
        machineDetection: 'DetectMessageEnd',
    })
    .then(call => console.log(call))
    .catch((error) => console.log(error));