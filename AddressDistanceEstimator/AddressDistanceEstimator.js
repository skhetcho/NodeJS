//get the data
const data = require('./data');

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

console.log("pickupLocation: " + pickupLocation.length);
console.log("dropoffLocation: " + dropoffLocation.length);
