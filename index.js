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

const {
  classifyHearingLossDegree,
  classifyConductive,
  classifySensorineural,
  classifyHighFrequency,
  classifyLowFrequency
} = require('./ClassifyData');

const {
  generateNormal,
  generateMild,
  generateModerate,
  generateModeratelySevere,
  generateSevere,
  generateProfound
} = require('./HearingLossTypes/Conductive');



/*************************************/
/*          HELPER FUNCTION          */
/*************************************/

/*
 * getNextID() Function
 * Returns the next ID to generate.
 */
function getNextID() {
  // 'ID' is the first property of the object.
  return Object.values(dataObj[dataObj.length - 1])[0] + 1;
}



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


  // Generate new data.
  console.log("Generating the data. This may take a while.")

  dataArr = generateNormal(numSets, getNextID());
  dataObj = dataObj.concat(dataArr);

  dataArr = generateMild(numSets, getNextID());
  dataObj = dataObj.concat(dataArr);

  dataArr = generateModerate(numSets, getNextID());
  dataObj = dataObj.concat(dataArr);

  dataArr = generateModeratelySevere(numSets, getNextID());
  dataObj = dataObj.concat(dataArr);

  dataArr = generateSevere(numSets, getNextID());
  dataObj = dataObj.concat(dataArr);

  dataArr = generateProfound(numSets, getNextID());
  dataObj = dataObj.concat(dataArr);


  // Save the new data.
  try {
    writeCSVFile(dataFilePath, dataObj);
    console.log(`New data successfully saved to ${dataFilePath}`)
  }
  catch (err) {
    console.log(`An error occurred while saving new data: \n'${err}'\n`);
    return;
  }

}



/********************************************/

main();