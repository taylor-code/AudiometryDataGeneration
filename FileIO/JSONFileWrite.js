/********************************************/
/*             JSONFileWrite.js             */
/*                                          */
/* Holds the function for writing           */
/* data to a JSON file.                     */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   03/18/2021                      */
/********************************************/


const { writeFileSync } = require('fs');


/**
 * Writes the data to a JSON file.
 * 
 * @param {string} filename
 * @param {[Object]} data
 */
function writeJSONFile(filename, data) {
  writeFileSync(filename, JSON.stringify(data, null, 2));
}



/***********************************************/

module.exports = { writeJSONFile };