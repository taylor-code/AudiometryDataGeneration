/********************************************/
/*              CSVFileRead.js              */
/*                                          */
/*     ***** CURRENTLY NOT IN USE *****     */
/*                                          */
/* Holds the CSV file reading functions.    */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/01/2021                      */
/********************************************/


const fs = require('fs');


/* 
 * readCSVFile() Function
 *
 * Reads the contents of a CSV file.
 *
 * @param: filename, a String of the file path.
 * @return: a String of the CSV file contents.
 */
function readCSVFile(filename) {
  return fs.readFileSync(filename, {encoding: 'utf8', flag: 'r'});
}


/* 
 * parseCSVData() Function
 *
 * Converts the CSV string to a JS object.
 *
 * @param: dataStr, a String of CSV contents.
 * @return: an Object of the CSV contents.
 */
function parseCSVData(dataStr) {
  let lines = dataStr.split(/\r?\n/);
  lines = lines.filter(line => line.length > 0);

  // The first line of a CSV is the header.
  const header = lines.shift();
  const attributes = header.split(",");
  let dataObj = [];

  for (let line of lines) {
    let values = line.split(",").map((str) => {
      return str.trim();
    });
    
    const dataSet = {};

    // Try to set a value as an integer. If the operation
    // returns NaN, then save the value as a string.
    for (let i = 0; i < attributes.length; i++) {
      let value = !values[i] ? null : parseInt(values[i]);
      dataSet[attributes[i]] = isNaN(value) ? values[i] : value;
    }
    
    dataObj.push(dataSet);
  }

  return dataObj;
}



/*********************************************/

module.exports = { readCSVFile, parseCSVData };