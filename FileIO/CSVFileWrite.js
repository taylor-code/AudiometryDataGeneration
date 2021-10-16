/********************************************/
/*             CSVFileWrite.js              */
/*                                          */
/* Holds the functions for writing          */
/* data to a CSV file.                      */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/01/2021                      */
/********************************************/


const { writeFileSync } = require('fs');


/**
 * @returns {string} The CSV file header.
 */
function getHeader() {
  const header = [
    'Type',
    'Degree',
    'Configuration',
    'L AC 250 Hz',
    'L AC 500 Hz',
    'L AC 1000 Hz',
    'L AC 2000 Hz',
    'L AC 4000 Hz',
    'L AC 8000 Hz',
    'L BC 250 Hz',
    'L BC 500 Hz',
    'L BC 1000 Hz',
    'L BC 2000 Hz',
    'L BC 4000 Hz',
    'L BC 8000 Hz',
    'R AC 250 Hz',
    'R AC 500 Hz',
    'R AC 1000 Hz',
    'R AC 2000 Hz',
    'R AC 4000 Hz',
    'R AC 8000 Hz',
    'R BC 250 Hz',
    'R BC 500 Hz',
    'R BC 1000 Hz',
    'R BC 2000 Hz',
    'R BC 4000 Hz',
    'R BC 8000 Hz'
  ];

  return header.join(',');
}


/**
 * Writes the data to a CSV file.
 * 
 * @param {string} filename
 * @param {[Object]} data
 */
function writeCSVFile(filename, data) {
  let content = getHeader() + '\n';
  let left, right, type, degree, configuration;
  
  // Convert each object to a CSV string.
  for (let row of data) {
    [ left, right, type, degree, configuration ] = Object.values(row);

    content += `${type},${degree},${configuration},`;
    content += Object.values(left['AC']).join(',')  + ',';
    content += Object.values(left['BC']).join(',')  + ',';
    content += Object.values(right['AC']).join(',') + ',';
    content += Object.values(right['BC']).join(',') + '\n';
  }

  writeFileSync(filename, content);
}



/*******************************************/

module.exports = { writeCSVFile };