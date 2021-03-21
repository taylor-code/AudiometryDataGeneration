/********************************************/
/*                 index.js                 */
/*                                          */
/* Holds the main() function.               */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/01/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const { cleanseData } = require('./DataManipulation/CleanseData');

const { writeJSONFile } = require('./JSONCreation/JSONFileIO');

const {
  dataFilePath,
  setup,
  createData,
  printStats
} = require('./JSONCreation/MainHelpers');



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

    // Generate and classify new data.
    console.log('Generating the data.');
    let newDataObj = createData(dataObj);
    let newLength = newDataObj.length;

    // Cleanse the data.
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
    writeJSONFile(dataFilePath, cleanedObj);
    console.log(`New data successfully saved to ${dataFilePath}`);
  }
  catch (err) {
    console.log(`An error occurred while saving new data: \n'${err}'\n`);
  }

}



/********************************************/

main();