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

const { createData    } = require('./DataManipulation/CreateData');
const { cleanseData   } = require('./DataManipulation/CleanseData');
const { writeJSONFile } = require('./FileIO/JSONFileWrite');

const {
  TEST_DATA_PATH,
  TRAIN_DATA_PATH,
  convertJSONToCSV,
  printStats
} = require('./MainHelpers');



/*************************************/
/*          MAIN() FUNCTION          */
/*************************************/

/**
 * After creating hearing loss data
 * instances, writes the data to \Data.
 */
function main() {
  console.time('Total Run Time');

  try {
    // Generate and classify new data.
    const data = createData();

    // Cleanse the data.
    const [ predData, testData, trainData ] = cleanseData(data);
    printStats(testData.length, trainData.length);

    // Save the new data.
    writeJSONFile(TEST_DATA_PATH,  testData);
    writeJSONFile(TRAIN_DATA_PATH, trainData);

    // Write to the CSV files.
    convertJSONToCSV(predData, testData, trainData);
    console.log('Saved the data to /Data\n');
  }
  catch (err) {
    return console.error(err.message);
  }

  console.timeEnd('Total Run Time');
}



/********************************************/

main();