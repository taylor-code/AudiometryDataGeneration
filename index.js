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

const { cleanseData   } = require('./DataManipulation/CleanseData');
const { createData    } = require('./DataManipulation/CreateData');
const { writeJSONFile } = require('./JSONCreation/JSONFileIO');

const {
  dataFilePath,
  setup,
  printStats
} = require('./JSONCreation/MainHelpers');



/*************************************/
/*          MAIN() FUNCTION          */
/*************************************/

/*
 * main() Function
 *
 * Reads in the JSON file, generates and classifies
 * hearing test data, and writes to JSON files.
 */
function main() {

  let cleanedData;

  try {
    // Initialize the previous data object.
    const prevData = setup();

    // Generate and classify new data.
    console.log('Generating the data.');
    const data = createData(prevData);

    // Cleanse the data.
    console.log('Cleansing the data. This may take a while.');
    cleanedData = cleanseData(data);

    printStats(prevData.length, data.length, cleanedData.length);
  }
  catch (err) {
    return console.error(err.message);
  }


  // Save the new data.
  try {
    writeJSONFile(dataFilePath, cleanedData);
    console.log(`New data successfully saved to ${dataFilePath}`);
  }
  catch (err) {
    console.error(`Error: Unable to save new data: \n'${err}'\n`);
  }

}



/********************************************/

main();