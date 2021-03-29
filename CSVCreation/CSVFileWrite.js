/********************************************/
/*             CSVFileWrite.js              */
/*                                          */
/* Holds the CSV file I/O functions.        */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/01/2021                      */
/********************************************/


const fs = require('fs');



/*************************************/
/*         HELPER FUNCTIONS          */
/*************************************/

function getHeader() {
  const header = [
    'Type',
    'Degree',
    'AC L 250 Hz',
    'AC L 500 Hz',
    'AC L 1000 Hz',
    'AC L 2000 Hz',
    'AC L 4000 Hz',
    'AC L 8000 Hz',
    'AC R 250 Hz',
    'AC R 500 Hz',
    'AC R 1000 Hz',
    'AC R 2000 Hz',
    'AC R 4000 Hz',
    'AC R 8000 Hz',
    'BC L 250 Hz',
    'BC L 500 Hz',
    'BC L 1000 Hz',
    'BC L 2000 Hz',
    'BC L 4000 Hz',
    'BC L 8000 Hz',
    'BC R 250 Hz',
    'BC R 500 Hz',
    'BC R 1000 Hz',
    'BC R 2000 Hz',
    'BC R 4000 Hz',
    'BC R 8000 Hz'
  ];

  return header.join(',');
}


function getTypeAsInt(type) {
  return type === 'Conductive' ? 0 : 1;
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

  let content = getHeader() + '\n';
  let type, degree, configuration, ACEarSet, BCEarSet;
  
  // Convert each object to a CSV string.
  for (let row of data) {
    [ type, degree, configuration, ACEarSet, BCEarSet ] = Object.values(row);

    content += `${getTypeAsInt(type)},${degree},${configuration},`;
    content += Object.values(ACEarSet['Left Ear']).join(',')  + ',';
    content += Object.values(ACEarSet['Right Ear']).join(',') + ',';
    content += Object.values(BCEarSet['Left Ear']).join(',')  + ',';
    content += Object.values(BCEarSet['Right Ear']).join(',') + '\n';
  }

  fsWriteCSVFile(filename, content);
}


/* 
 * fsWriteCSVFile() Function
 *
 * Writes a String to a CSV file.
 *
 * @param: filename, a String of the file path.
 * @param: contents, a String.
 */
function fsWriteCSVFile(filename, contents) {
  fs.writeFileSync(filename, contents);
}



/*******************************************/

module.exports = { writeCSVFile };