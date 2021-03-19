/********************************************/
/*              MainHelpers.js              */
/*                                          */
/* Holds the helper functions for main()    */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/26/2021                      */
/********************************************/


/*************************************/
/*             CONSTANTS             */
/*************************************/

const prevDataFilePath = './JSONData/PreviousDataJSON.json';
const dataFilePath = './JSONData/AudiometryDataJSON.json';

const { readJSONFile, writeJSONFile } = require('./JSONFileIO');
const { classifyData } = require('../DataManipulation/ClassifyData');
const { generateConductive } = require('../HearingLossTypes/Conductive');



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
  let dataObj = undefined;

  // Read in the data.
  try {
    dataObj = readJSONFile(dataFilePath);
    console.log('Previous data successfully read.');
  }
  catch (err) {
    throw Error(`An error occurred while reading data: \n'${err}'\n`);
  }

  // Save the previous data.
  try {
    writeJSONFile(prevDataFilePath, dataObj);
    console.log(`Previous data successfully saved to ${prevDataFilePath}`);
  }
  catch (err) {
    throw Error(`An error occurred while saving previous data: \n'${err}'\n`);
  }

  return dataObj;
}


// function getCurrentSetNo(dataObj) {
//   return dataObj[dataObj.length - 1]['Set No.'] + 1;
// }


/*
 * createData() Function
*
 * Generates and classifies hearing data.
 */
function createData(dataObj) {

  /* VARIABLES */
  let dataArr = undefined;
  let numSets = 1;

  const HEARING_DEGREES = [
    'NORMAL', 'SLIGHT', 'MILD', 'MODERATE',
    'MODERATE_SEVERE', 'SEVERE', 'PROFOUND'
  ];


  /* GENERATE DATA */

  // Conductive
  for (let degree of HEARING_DEGREES) {
    dataArr = generateConductive(numSets, degree);
    dataObj = dataObj.concat(classifyData(dataArr))
  }

  return dataObj;
}


/*
 * printStats() Function
 *
 * Prints the statistics of:
 *   1. How many data sets were generated
 *   2. How many of the data sets were duplicates
 *   3. The current number of data sets.
 */
function printStats(prevLen, newLen, cleanLen) {
  const numNewSets = newLen - prevLen;
  const numDuplicates = newLen - cleanLen;
  const dupPercentage = ((numDuplicates / numNewSets) * 100).toFixed(2);

  console.log('\n************************************************');
  console.log('                  STATISTICS                  \n');
  console.log(`Generated ${numNewSets} sets of data.`);
  console.log(`Removed ${numDuplicates} duplicates.`);
  console.log(`\t${dupPercentage}% of the new sets were duplicates.`);
  console.log(`Current number of data sets: ${cleanLen}`);
  console.log('************************************************\n');
}



/********************************************/

module.exports = { dataFilePath, setup, createData, printStats };