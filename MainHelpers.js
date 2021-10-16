/********************************************/
/*              MainHelpers.js              */
/*                                          */
/* Holds the helper functions for main().   */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/26/2021                      */
/********************************************/


/*************************************/
/*         IMPORTS/CONSTANTS         */
/*************************************/

const { writeCSVFile     } = require('./FileIO/CSVFileWrite')
const { getNumDuplicates } = require('./DataManipulation/CleanseData');

const TEST_DATA_PATH  = './Data/JSON/AudiometryTest.json';
const TRAIN_DATA_PATH = './Data/JSON/AudiometryTrain.json';



/*************************************/
/*         HELPER FUNCTIONS          */
/*************************************/

function convertJSONToCSV(predData, testData, trainData) {
  const PRED_CSV_PATH  = './Data/CSV/AudiometryPred.csv';
  const TEST_CSV_PATH  = './Data/CSV/AudiometryTest.csv';
  const TRAIN_CSV_PATH = './Data/CSV/AudiometryTrain.csv';

  writeCSVFile(PRED_CSV_PATH,  predData);
  writeCSVFile(TEST_CSV_PATH,  testData);
  writeCSVFile(TRAIN_CSV_PATH, trainData);
}


/**
 * Prints the statistics of:
 *   1. How many instances were generated
 *   2. How many instances were duplicates
 *   3. The current number of instances
 * 
 * @param {number} testLen: Number of
 *        instances in the testing set.
 * 
 * @param {number} trainLen: Number of
 *        instances in the training set.
 */
function printStats(testLen, trainLen) {
  const numDuplicates = getNumDuplicates();

  console.log('\n*************************************************');
  console.log('*                   STATISTICS                     ');
  console.log('*                                                  ');

  if (numDuplicates > 0) {
    console.log(`* Removed ${numDuplicates} duplicates.`);
  }

  console.log(`* Current number of test instances: ${testLen}`);
  console.log(`* Current number of train instances: ${trainLen}`);
  console.log('*************************************************\n');
}



/********************************************/

module.exports = {
  TEST_DATA_PATH,
  TRAIN_DATA_PATH,
  convertJSONToCSV,
  printStats
};