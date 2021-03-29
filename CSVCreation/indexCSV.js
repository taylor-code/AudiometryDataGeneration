/********************************************/
/*               indexCSV.js                */
/*                                          */
/* Holds the function to convert            */
/* the JSON object to a CSV file.           */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   03/28/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const { writeCSVFile } = require('./CSVFileWrite');
const { readJSONFile } = require('../JSONCreation/JSONFileIO');



/*************************************/
/*          MAIN() FUNCTION          */
/*************************************/

/*
 * main() Function
 *
 * Reads in a JSON file and writes to a CSV file.
 */
function main() {
  const JSONFilePath = './JSONData/AudiometryDataJSON.json';
  const CSVFilePath = './CSVData/AudiometryTrain.csv';

  try {
    // Initialize the previous data object.
    const dataObj = readJSONFile(JSONFilePath);
    
    // Convert the JSON object to a CSV file.
    writeCSVFile(CSVFilePath, dataObj);
    console.log(`Data successfully saved to ${CSVFilePath}`);
  }
  catch (err) {
    console.log(`Error: ${err.message}`);
    return;
  }

}



/********************************************/

main();