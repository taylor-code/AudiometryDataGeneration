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

const { classifyData } = require('./DataManipulation/ClassifyData');
const { cleanseData } = require('./CleanseData')
const { generateConductive } = require('./HearingLossTypes/Conductive');



/*************************************/
/*         HELPER FUNCTIONS          */
/*************************************/

/*
 * setup() Function
 *
 * Reads in the data, saves the previous data,
 * and converts the data string to an object.
 */
function setup() {
  let dataStr = undefined;

  // Read in the data.
  try {
    dataStr = readCSVFile(dataFilePath);
    console.log('Previous data successfully read.');
  }
  catch (err) {
    throw Error(`An error occurred while reading data: \n'${err}'\n`);
  }

  // Save the previous data.
  try {
    fsWriteFile(prevDataFilePath, dataStr);
    console.log(`Previous data successfully saved to ${prevDataFilePath}`);
  }
  catch (err) {
    throw Error(`An error occurred while saving previous data: \n'${err}'\n`);
  }

  // Convert the data string to an object.
  try {
    dataObj = parseCSVData(dataStr);
  }
  catch (err) {
    throw Error(`An error occurred during object conversion: \n'${err}'\n`);
  }
}


/*
 * createData() Function
 *
 * Generates and cleanses hearing data.
 */
function createData() {

  /* VARIABLES */
  let dataArr = undefined;
  let numSets = 100;

  const HEARING_DEGREES = [
    'NORMAL', 'MILD', 'MODERATE',
    'MODERATE_SEVERE', 'SEVERE', 'PROFOUND'
  ];


  /* GENERATE DATA */
  console.log('Generating the data. This may take a while.')

  // Conductive
  for (let degree of HEARING_DEGREES) {
    dataArr = generateConductive(numSets, degree);
    dataObj = dataObj.concat(classifyData(dataArr))
  }


  /* CLEANSE DATA */
  console.log('Cleansing the data. This may take a while.')
  let cleaned = cleanseData(dataObj);
  console.log(`\nRemoved ${dataObj.length - cleaned.length} duplicates.`);
  console.log(`Number of data sets: ${cleaned.length}\n`);
  
  return cleaned;
}



/*************************************/
/*          MAIN() FUNCTION          */
/*************************************/

/*
 * main() Function
 *
 * Reads in the a file, creates hearing
 * test data, and writes to a CSV file.
 */
function main() {

  let newDataObj = undefined;


  /*-------------------------------*/
  /*             SETUP             */
  /*-------------------------------*/

  try {
    setup();
  }
  catch (err) {
    console.log(err.message);
    return;
  }


  /*-------------------------------*/
  /*         DATA CREATION         */
  /*-------------------------------*/

  try {
    newDataObj = createData();
  }
  catch (err) {
    console.log(err.message);
    return;
  }


  /*-------------------------------*/
  /*             SAVE              */
  /*-------------------------------*/

  try {
    writeCSVFile(dataFilePath, newDataObj);
    console.log(`New data successfully saved to ${dataFilePath}`)
  }
  catch (err) {
    console.log(`An error occurred while saving new data: \n'${err}'\n`);
  }

}



/********************************************/

main();