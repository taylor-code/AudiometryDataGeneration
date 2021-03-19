/********************************************/
/*               indexCSV.js                */
/*                                          */
/* Holds the main() function for            */
/* generating CSV data.                     */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/01/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const { writeCSVFile } = require('./CSVFileIO');
const { dataFilePath, setup, createData, printStats } = require('./MainHelpers');
const { cleanseData } = require('../DataManipulation/CleanseData');



/*************************************/
/*          MAIN() FUNCTION          */
/*************************************/

/*
 * main() Function
 *
 * Reads in the a file, creates hearing
 * test data, and writes to a CSV file.
 */
function main() {

  let cleanedObj = undefined;


  try {
    // Initialize the previous data object.
    let dataObj = setup();
    let prevLength = dataObj.length;

    // // Generate and classify new data.
    console.log('Generating the data. This may take a while.');
    let newDataObj = createData(dataObj);
    let newLength = newDataObj.length;

    // // Cleanse the data.
    console.log('Cleansing the data. This may take a while.');
    cleanedObj = cleanseData(newDataObj);
    let cleanedLength = cleanedObj.length;

    printStats(prevLength, newLength, cleanedLength);
  }
  catch (err) {
    console.log(err.message);
    return;
  }


  // Save the new data.
  try {
    writeCSVFile(dataFilePath, cleanedObj);
    console.log(`New data successfully saved to ${dataFilePath}`);
  }
  catch (err) {
    console.log(`An error occurred while saving new data: \n'${err}'\n`);
  }

}



/********************************************/

main();