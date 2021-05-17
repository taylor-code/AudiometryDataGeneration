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

const TEST_DATA_PATH  = './JSONData/AudiometryTest.json';
const TRAIN_DATA_PATH = './JSONData/AudiometryTrain.json';



/*************************************/
/*         HELPER FUNCTIONS          */
/*************************************/

function convertJSONToCSV(testData, trainData) {
  const TEST_CSV_PATH  = './CSVData/AudiometryTest.csv';
  const TRAIN_CSV_PATH = './CSVData/AudiometryTrain.csv';

  writeCSVFile(TEST_CSV_PATH, testData);
  writeCSVFile(TRAIN_CSV_PATH, trainData);
}


/*
 * Prints the statistics of:
 *   1. How many data sets were generated
 *   2. How many of the sets were duplicates
 *   3. The current number of data sets
 */
function printStats(newLen, testLen, trainLen) {
  const numDuplicates = getNumDuplicates();

  console.log('\n*************************************************');
  console.log('*                   STATISTICS                     ');
  console.log('*                                                  ');
  console.log(`* Generated ${newLen} valid sets of data.`);

  // Print statistics about duplicate sets.
  if (numDuplicates > 0) {
    const dupPercentage = ((numDuplicates / newLen) * 100).toFixed(2);
    console.log(`* Removed ${numDuplicates} duplicates.`);
    console.log(`*\t${dupPercentage}% of the new sets were duplicates.`);
  }

  console.log(`* Current number of test data sets: ${testLen}`);
  console.log(`* Current number of train data sets: ${trainLen}`);
  console.log('*************************************************\n');
}



/********************************************/

module.exports = {
  TRAIN_DATA_PATH,
  TEST_DATA_PATH,
  convertJSONToCSV,
  printStats,
};