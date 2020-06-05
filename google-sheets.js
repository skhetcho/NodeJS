require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet(`${process.env.GOOGLE_SPREADSHEET_KEY}`);

// use service account creds
async function titleDoc(){
    await doc.useServiceAccountAuth({
        client_email: `${process.env.GOOGLE_ACCOUNT_AUTH_EMAIL}`,
        private_key: `${process.env.GOOGLE_ACCOUNT_AUTH_PRIVATE_KEY}`,
      });
    
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = await doc.sheetsByIndex[0]
    await sheet.addRow({
        Sender: 'test',
        timeStamp: 'test',
        bodyType: 'test',
        carNumber: 'test',
        clientName: 'test',
        clientPhoneNumber: 'test'
    });
    console.log(doc.title);
}

titleDoc();