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


/* 
 * Writes a JS Object to a JSON file.
 */
function writeJSONFile(filename, obj) {
  writeFileSync(filename, JSON.stringify(obj, null, 2));
}



/***********************************************/

module.exports = { writeJSONFile };