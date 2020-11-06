//get the data
const data = require('./data');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
//TODO
//distance information calculator
// var distance = require('google-distance');
// distance.apiKey = 'AIzaSyB5-UM8ijEF4r1txLMYUtwdgw120BEUxNY';

//excel library
var excel = require('excel4node');


//organize it in an array based on the # of lines
let array = data.dumpAddresses.split('\n');

//empty array waiting to be filled with their defined variable name
let allAddresses = [];
const csvWriter = createCsvWriter({
    path: 'material.csv',
    header: ['Query']
});

//loop based on the # of lines in array variable
for (var i = 0; i < array.length; i++) {

    //only take the ones with defined addresses
    if (array[i].includes('undefined')) {
        //neglect
    }
    else {
        if (array[i].includes('Fort St. John') || array[i].includes('Fort Saint John')) {
            array[i] = array[i].replace(", Fort Saint John", "")
            array[i] = array[i].replace(", Fort St. John", "")
        }
        if (array[i].includes('(approx.)')) {
            array[i] = array[i].replace(" (approx.)", "")
        }
        if (array[i].includes(' / ')) {
            let arrayItem = array[i].split(' / ');
            if (arrayItem[0] != undefined || arrayItem[1] != undefined) {
                if (arrayItem[1].includes("/")) {
                    arrayItem[1] = arrayItem[1].replace('/ ', "");
                }
                else {
                    allAddresses.push(arrayItem[0], arrayItem[1]);
                }
            }
        }
        else if (array[i].includes('/ ')) {
            let arrayItem = array[i].replace('/ ', "");
            if (arrayItem != undefined) {
                allAddresses.push(arrayItem);
            }
        }
    }
}
const records = allAddresses.map(Query => [Query])
csvWriter.writeRecords(records).then(() => {
    console.log("...Done!")
})







//TODO
// let distanceValueMeters = [];
// let distanceKms = [];
// let durationValueSeconds = [];
// let durationMinutes = []
// for (var j = 0; j < 3; j++) {
//     distance.get(
//         {
//             origin: pickupLocation[j],
//             destination: dropoffLocation[j]
//         },
//         async function (err, data) {
//             if (err) {
//                 console.log(err);
//             }
//             const dataDis = await data.distanceValue;
//             distanceValueMeters.push(dataDis);

//             const dataDist = await data.distance; 
//             distanceKms.push(dataDist);

//             const dataTime = await data.durationValue;
//             durationValueSeconds.push(dataTime);

//             const dataTim = await data.duration; 
//             durationMinutes.push(dataTim);
//         }
//     );
// }
// setTimeout(function(){
//     console.log("pickupLocation: " + pickupLocation.length);
//     console.log("dropoffLocation: " + dropoffLocation.length);
//     console.log("distanceValueMeters: " + distanceValueMeters.length);
//     console.log("distanceKms: " + distanceKms.length);
//     console.log("durationValueSeconds: " + durationValueSeconds.length);
//     console.log("durationMinutes: " + durationMinutes.length);

//     console.log("distanceValueMeters: " + distanceValueMeters[0]);
//     console.log("distanceKms: " + distanceKms[0]);
//     console.log("durationValueSeconds: " + durationValueSeconds[0]);
//     console.log("durationMinutes: " + durationMinutes[0]);

// }, 3000)



// // Create a new instance of a Workbook class
// var workbook = new excel.Workbook();

// // Add Worksheets to the workbook
// var worksheet = workbook.addWorksheet('Day Data');
// // (row, column)
// worksheet.cell((j + 1), 1).number(data.distanceValue);
// worksheet.cell((j + 1), 2).string(data.distance);
// worksheet.cell((j + 1), 3).number(data.durationValue);
// worksheet.cell((j + 1), 4).string(data.duration);
// workbook.write('DayAnalyzedDrivingData.xlsx');