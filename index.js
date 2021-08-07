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
  TEST_DATA_PATH,
  TRAIN_DATA_PATH,
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
  console.time('Program Run Time');

  try {
    // Combine the training and testing datasets.
    let data = readJSONFile(TRAIN_DATA_PATH);
    data = data.concat(readJSONFile(TEST_DATA_PATH));

    // Generate and classify new data.
    data = data.concat(createData());
    console.log('Generated the data.');

    // Cleanse the data.
    console.log('\nNow checking for duplicates. This may take a while.');
    const [ predData, testData, trainData ] = cleanseData(data);
    printStats(testData.length, trainData.length);

    // Save the new data.
    writeJSONFile(TEST_DATA_PATH,  testData);
    writeJSONFile(TRAIN_DATA_PATH, trainData);
    
    console.log();

    // Write to the CSV files.
    convertJSONToCSV(predData, testData, trainData);
  }
  catch (err) {
    return console.error(err.message);
  }

  console.log();
  console.timeEnd('Program Run Time');
}



/********************************************/

main();