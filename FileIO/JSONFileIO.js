/********************************************/
/*              JSONFileIO.js               */
/*                                          */
/* Holds the JSON file I/O functions.       */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   03/18/2021                      */
/********************************************/


const { readFileSync, writeFileSync } = require('fs');


/* 
 * Converts a JSON file's contents to a JS object.
 */
function readJSONFile(filename) {
  return JSON.parse(readFileSync(filename, 'utf-8'));
}


/* 
 * Writes a JS Object to a JSON file.
 */
function writeJSONFile(filename, obj) {
  writeFileSync(filename, JSON.stringify(obj, null, 2));
  console.log(`JSON data successfully saved to ${filename}`);
}



/***********************************************/

module.exports = { readJSONFile, writeJSONFile };