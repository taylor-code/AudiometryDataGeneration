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
  TEST_DATA_PATH,
  TRAIN_DATA_PATH,
} = require('../MainHelpers');


/*
 * Clears the JSON files.
 */
function resetJSONData() {
  writeJSONFile(TEST_DATA_PATH,  []);
  writeJSONFile(TRAIN_DATA_PATH, []);

  console.log('Cleared the JSON files.');
}



/********************************************/

resetJSONData()