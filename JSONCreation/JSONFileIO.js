/********************************************/
/*              JSONFileIO.js               */
/*                                          */
/* Holds the JSON file I/O functions.       */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   03/18/2021                      */
/********************************************/


const fs = require('fs');


/* 
 * readJSONFile() Function
 *
 * Converts a JSON file's contents to a JS object.
 *
 * @param: filename, a String of the file path.
 * @return: a JavaScript Object.
 */
function readJSONFile(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf-8'));
}


const convertObjToJSON = (obj) => JSON.stringify(obj, null, 2)


/* 
 * writeJSONFile() Function
 *
 * Writes a JS Object to a JSON file.
 *
 * @param: filename, a String of the file path.
 * @param: obj, a JS Object.
 */
function writeJSONFile(filename, obj) {
  fs.writeFileSync(filename, convertObjToJSON(obj));
}



/***********************************************/

module.exports = { readJSONFile, writeJSONFile };