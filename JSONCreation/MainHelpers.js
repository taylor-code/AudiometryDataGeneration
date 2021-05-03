/********************************************/
/*              MainHelpers.js              */
/*                                          */
/* Holds the helper functions for main().   */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/26/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const prevDataFilePath = './JSONData/PreviousDataJSON.json';
const dataFilePath     = './JSONData/AudiometryDataJSON.json';

const { readJSONFile, writeJSONFile } = require('./JSONFileIO');

const {
  getNumberOfNulls,
  getNumberOfDuplicates
} = require('../DataManipulation/CleanseData');



/*************************************/
/*         HELPER FUNCTIONS          */
/*************************************/

/*
 * setup() Function
 *
 * Reads in the data, saves the previous data,
 * and converts the data string to an object.
 */
function setup() {
  let allData;

  // Read in the data.
  try {
    allData = readJSONFile(dataFilePath);
    console.log('Previous data successfully read.');
  }
  catch (err) {
    throw Error(`An error occurred while reading data: \n'${err}'\n`);
  }

  // Save the previous data.
  try {
    writeJSONFile(prevDataFilePath, allData);
    console.log(`Previous data successfully saved to ${prevDataFilePath}`);
  }
  catch (err) {
    throw Error(`An error occurred while saving previous data: \n'${err}'\n`);
  }

  return allData;
}


/*
 * printStats() Function
 *
 * Prints the statistics of:
 *   1. How many data sets were generated
 *   2. How many data sets were null
 *   3. How many of the sets were duplicates
 *   4. The current number of data sets
 */
function printStats(prevLen, newLen, cleanLen) {
  const numNewSets = newLen - prevLen;
  const numDuplicates = getNumberOfDuplicates();
  const dupPercentage = ((numDuplicates / numNewSets) * 100).toFixed(2);

  console.log('\n************************************************');
  console.log('                  STATISTICS                  \n');
  console.log(`Generated ${numNewSets} sets of data.`);
  console.log(`Removed ${getNumberOfNulls()} null sets.`);
  console.log(`Removed ${getNumberOfDuplicates()} duplicates.`);
  console.log(`\t${dupPercentage}% of the new sets were duplicates.`);
  console.log(`Current number of data sets: ${cleanLen}`);
  console.log('************************************************\n');
}



/***************************************************************/

module.exports = { dataFilePath, setup, printStats };