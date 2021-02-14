/********************************************/
/*               CSVFileIO.js               */
/*                                          */
/* Holds the CSV file I/O functions.        */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/01/2021                      */
/********************************************/

/* VARIABLES */
const fs = require('fs');



/*************************************/
/*        READ CSV FUNCTIONS         */
/*************************************/

/* 
 * readCSVFile() Function
 *
 * Reads the contents of a CSV file.
 *
 * @param: filename, a String of the file path.
 *
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
 * 
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

    // If a value is empty, replace it with null.
    for (let i = 0; i < attributes.length; i++) {
      let value = !values[i] ? null : parseInt(values[i]);
      dataSet[attributes[i]] = isNaN(value) ? values[i] : value;
    }
    
    dataObj.push(dataSet);
  }

  return dataObj;
}



/*************************************/
/*        WRITE CSV FUNCTIONS        */
/*************************************/

/* 
 * writeCSVFile() Function
 *
 * Writes a JS Object to a CSV file.
 *
 * @param: filename, a String of the file path.
 * @param: data, a JS Object.
 */
function writeCSVFile(filename, data) {

  // The first line of a CSV file is the header.
  let header = Object.keys(data[0]).join(',');
  let content = (header + '\n');
  
  // Convert each object to a CSV string.
  data.forEach(row => content += Object.values(row).join(',') + '\n');

  fsWriteFile(filename, content);
}


/* 
 * fsWriteFile() Function
 *
 * Synchronously writes a String to a CSV file.
 *
 * @param: filename, a String of the file path.
 * @param: contents, a String.
 */
function fsWriteFile(filename, contents) {
  fs.writeFileSync(filename, contents);
}



/********************************************/

module.exports = {
  readCSVFile,
  writeCSVFile,
  parseCSVData,
  fsWriteFile
};