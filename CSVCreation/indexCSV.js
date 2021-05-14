/********************************************/
/*               indexCSV.js                */
/*                                          */
/* Holds the function to convert            */
/* the JSON object to a CSV file.           */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   03/28/2021                      */
/********************************************/


const { writeCSVFile } = require('./CSVFileWrite');
const { readJSONFile } = require('../JSONCreation/JSONFileIO');


/*
 * convertJSONToCSV() Function
 *
 * Reads in a JSON file and writes to a CSV file.
 */
function convertJSONToCSV() {
  const JSONFilePath = './JSONData/AudiometryTestDataJSON.json';
  const CSVFilePath  = './CSVData/AudiometryTest.csv';

  try {
    // Initialize the previous data object.
    const dataObj = readJSONFile(JSONFilePath);
    
    // Convert the JSON object to a CSV file.
    writeCSVFile(CSVFilePath, dataObj);
    console.log(`Data successfully saved to ${CSVFilePath}`);
  }
  catch (err) {
    return console.error(`Error: ${err.message}`);
  }

}



/********************************************/

convertJSONToCSV();