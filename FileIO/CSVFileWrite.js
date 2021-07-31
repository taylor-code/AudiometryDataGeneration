/********************************************/
/*             CSVFileWrite.js              */
/*                                          */
/* Holds the CSV file I/O functions.        */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/01/2021                      */
/********************************************/


const { writeFileSync } = require('fs');


/*
 * @return: A String of the CSV file header.
 */
function getHeader() {
  const header = [
    'Type',
    'Degree',
    'Configuration',
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


/*
 * Writes a JS Object to a CSV file.
 */
function writeCSVFile(filename, data) {
  let content = getHeader() + '\n';
  let left, right, type, degree, configuration;
  
  // Convert each object to a CSV string.
  for (let row of data) {
    [ left, right, type, degree, configuration ] = Object.values(row);

    content += `${type},${degree},${configuration},`;
    content += Object.values(left['AC']).join(',')  + ',';
    content += Object.values(left['BC']).join(',') + ',';
    content += Object.values(right['AC']).join(',')  + ',';
    content += Object.values(right['BC']).join(',') + '\n';
  }

  writeFileSync(filename, content);
  console.log(`CSV data successfully saved to ${filename}`);
}



/*******************************************/

module.exports = { writeCSVFile };