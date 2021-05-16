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

const { readJSONFile, writeJSONFile } = require('./JSONFileIO');
const { getNumDuplicates } = require('../DataManipulation/CleanseData');

const PREV_DATA_PATH = './JSONData/PreviousDataJSON.json';
const NEW_DATA_PATH  = './JSONData/AudiometryTestDataJSON.json';



/*************************************/
/*         HELPER FUNCTIONS          */
/*************************************/

/*
 * Reads in the data, saves the previous data,
 * and converts the data string to an object.
 */
function setup() {
  let data;

  // Read in the data.
  try {
    data = readJSONFile(NEW_DATA_PATH);
  }
  catch (err) {
    throw Error(`An error occurred while reading data: \n'${err}'\n`);
  }

  // Save the previous data.
  try {
    writeJSONFile(PREV_DATA_PATH, data);
  }
  catch (err) {
    throw Error(`An error occurred while saving previous data: \n'${err}'\n`);
  }

  return data;
}


/*
 * Prints the statistics of:
 *   1. How many data sets were generated
 *   2. How many of the sets were duplicates
 *   3. The current number of data sets
 */
function printStats(newLen, cleanLen) {
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

  console.log(`* Current number of data sets: ${cleanLen}`);
  console.log('*************************************************\n');
}



/****************************************************/

module.exports = { NEW_DATA_PATH, setup, printStats };