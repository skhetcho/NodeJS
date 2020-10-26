//get the data
const data = require('./data');

//distance information calculator
var distance = require('google-distance');
distance.apiKey = 'AIzaSyB5-UM8ijEF4r1txLMYUtwdgw120BEUxNY';

//excel library
var excel = require('excel4node');


//organize it in an array based on the # of lines
let array = data.dumpAddresses.split('\n');

//empty arrays waiting to be filled with their defined variable name
let pickupLocation = [];
let dropoffLocation = [];

//loop based on the # of lines in array variable
for (var i = 0; i < array.length; i++) {
    //only take the ones that have both pickup and drop off locations
    if (array[i].includes('/')) {
        //only take the ones with defined addresses
        if (array[i].includes('undefined')) {
            //neglect
        }
        else {
            //create an array item based on pickup and drop off
            arrayItem = array[i].split(' / ');
            //push to the appropriate array variables
            pickupLocation.push(arrayItem[0]);
            //remove junk data
            if (arrayItem[1].includes('(approx.)')) {
                arrayItem[1] = arrayItem[1].replace(" (approx.)", "")
            }
            dropoffLocation.push(arrayItem[1]);
        }
    }
}

let distanceValueMeters = [];
let distanceKms = [];
let durationValueSeconds = [];
let durationMinutes = []

for (var j = 0; j < 3; j++) {
    distance.get(
        {
            origin: pickupLocation[j],
            destination: dropoffLocation[j]
        },
        async function (err, data) {
            if (err) {
                console.log(err);
            }
            const dataDis = await data.distanceValue;
            distanceValueMeters.push(dataDis);

            const dataDist = await data.distance; 
            distanceKms.push(dataDist);

            const dataTime = await data.durationValue;
            durationValueSeconds.push(dataTime);

            const dataTim = await data.duration; 
            durationMinutes.push(dataTim);
        }
    );
}
setTimeout(function(){
    console.log("pickupLocation: " + pickupLocation.length);
    console.log("dropoffLocation: " + dropoffLocation.length);
    console.log("distanceValueMeters: " + distanceValueMeters.length);
    console.log("distanceKms: " + distanceKms.length);
    console.log("durationValueSeconds: " + durationValueSeconds.length);
    console.log("durationMinutes: " + durationMinutes.length);

    console.log("distanceValueMeters: " + distanceValueMeters[0]);
    console.log("distanceKms: " + distanceKms[0]);
    console.log("durationValueSeconds: " + durationValueSeconds[0]);
    console.log("durationMinutes: " + durationMinutes[0]);
    
}, 3000)



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