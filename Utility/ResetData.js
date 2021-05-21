/********************************************/
/*               ResetData.js               */
/*                                          */
/* Deletes all data from the JSON files.    */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   05/20/2021                      */
/********************************************/


const { writeJSONFile } = require('../FileIO/JSONFileIO');

const {
  TRAIN_DATA_PATH,
  TEST_DATA_PATH
} = require('../MainHelpers');


/*
 * Clears the JSON files.
 */
function resetJSONData() {
  writeJSONFile(TRAIN_DATA_PATH, []);
  writeJSONFile(TEST_DATA_PATH,  []);
  console.log('Cleared the JSON files.');
}



/********************************************/

resetJSONData()