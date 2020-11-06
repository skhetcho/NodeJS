//get the data
const data = require('./dataNumbers');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;

//organize it in an array based on the # of lines
let array = data.dumpAddresses.split('\n');
//empty array waiting to be filled with their defined variable name
let allNumbers = [];
const csvWriter = createCsvWriter({
    path: 'NumMaterial.csv',
    header: ['Query']
});

//loop based on the # of lines in array variable
for (var i = 0; i < array.length; i++) {

    //only take the ones with defined addresses
    if (array[i].length > 1) {
        if (i < 15) {
            array[i] = array[i].replace(/-/g, "")
            allNumbers.push(array[i]);
        }
        else {
            allNumbers.push(array[i]);
        }
    }
    else {
        //neglect
    }
}
const records = allNumbers.map(Query => [Query])
csvWriter.writeRecords(records).then(() => {
    console.log("...Done!")
})