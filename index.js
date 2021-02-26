/********************************************/
/*                 index.js                 */
/*                                          */
/* Holds the main() function.               */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/01/2021                      */
/********************************************/


/*************************************/
/*             VARIABLES             */
/*************************************/

const prevDataFilePath = './CSVData/PreviousDataCSV.csv';
const dataFilePath = './CSVData/AudiometryDataCSV.csv';
let dataObj = undefined;

const {
  readCSVFile,
  parseCSVData,
  writeCSVFile,
  fsWriteFile
} = require('./CSVFileIO');

const { classifyData } = require('./ClassifyData');
const { cleanseData } = require('./CleanseData')
const { generateConductive } = require('./HearingLossTypes/Conductive');



/*************************************/
/*          HELPER FUNCTION          */
/*************************************/

/*
 * getNextID() Function
 * Returns the next ID to generate.
 */
// function getNextID() {
//   // 'ID' is the first property of the object.
//   return Object.values(dataObj[dataObj.length - 1])[0] + 1;
// }



/*************************************/
/*          MAIN() FUNCTION          */
/*************************************/

/*
 * main() Function
 *
 * Reads in the a file, generates hearing
 * test data, and writes to a CSV file.
 */
function main() {

  /* VARIABLES */
  let dataStr = undefined;
  let dataArr = undefined;
  let numSets = 10;


  // Read in the data.
  try {
    dataStr = readCSVFile(dataFilePath);
    console.log("Previous data successfully read.");
  }
  catch (err) {
    console.log(`An error occurred while reading data: \n'${err}'\n`);
    return;
  }
  

  // Save the previous data.
  try {
    fsWriteFile(prevDataFilePath, dataStr);
    console.log(`Previous data successfully saved to ${prevDataFilePath}`);
  }
  catch (err) {
    console.log(`An error occurred while saving previous data: \n'${err}'\n`);
    return;
  }


  // Convert the data string to an object.
  try {
    dataObj = parseCSVData(dataStr);
  }
  catch (err) {
    console.log(`An error occurred while converting the data string to an object: \n'${err}'\n`);
    return;
  }


  const HEARING_DEGREES = [
    'NORMAL', 'MILD', 'MODERATE',
    'MODERATE_SEVERE', 'SEVERE', 'PROFOUND'
  ];


  /* Generate new data. */
  console.log("Generating the data. This may take a while.")

  // Conductive
  for (let degree of HEARING_DEGREES) {
    dataArr = generateConductive(numSets, degree);
    dataObj = dataObj.concat(classifyData(dataArr))
  }


  /* Cleanse the data */
  let cleaned = cleanseData(dataObj);
  console.log(cleaned.length, dataObj.length);


  // Save the new data.
  try {
    writeCSVFile(dataFilePath, cleaned);
    console.log(`New data successfully saved to ${dataFilePath}`)
  }
  catch (err) {
    console.log(`An error occurred while saving new data: \n'${err}'\n`);
  }

}



/********************************************/

main();