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

const { createData  } = require('./DataManipulation/CreateData');
const { cleanseData } = require('./DataManipulation/CleanseData');

const {
  readJSONFile,
  writeJSONFile
} = require('./FileIO/JSONFileIO');

const {
  TRAIN_DATA_PATH,
  TEST_DATA_PATH,
  convertJSONToCSV,
  printStats
} = require('./MainHelpers');



/*************************************/
/*          MAIN() FUNCTION          */
/*************************************/

/*
 * Reads in the JSON file, generates and classifies
 * hearing test data, and writes to JSON files.
 */
function main() {
  console.time('Timer');

  try {
    // Initialize the previous data object.
    // Combine the train and the test data.
    let data = readJSONFile(TRAIN_DATA_PATH);
    data = data.concat(readJSONFile(TEST_DATA_PATH));

    // Generate and classify new data.
    const newData = createData();
    data = data.concat(newData);
    console.log('Generated the data.');

    // Cleanse the data.
    console.log('Now cleansing the data. This may take a while.');
    const [ testData, trainData ] = cleanseData(data);
    printStats(newData.length, testData.length, trainData.length);

    // Save the new data.
    writeJSONFile(TEST_DATA_PATH, testData);
    writeJSONFile(TRAIN_DATA_PATH, trainData);

    // Write to the CSV files.
    convertJSONToCSV(testData, trainData);
  }
  catch (err) {
    return console.error(err)//.message);
  }

  console.timeEnd('Timer');
}



/********************************************/

main();