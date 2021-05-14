/********************************************/
/*              CreateData.js               */
/*                                          */
/* Holds the functions to generate          */
/* and classify data.                       */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   04/15/2021                      */
/********************************************/


/*************************************/
/*             CONSTANTS             */
/*************************************/

const { classifyData } = require('./Classify/ClassifyData');
const { generateHearingLossType } = require('./Generate/GenerateType');

const NUM_SETS = 80;

const HEARING_DEGREES = [
  'SLIGHT', 'MILD', 'MODERATE',
  'MODERATE_SEVERE', 'SEVERE', 'PROFOUND'
]; 



/*************************************/
/*      TYPE CREATION FUNCTIONS      */
/*************************************/

/*
 * createNormalHLData() Function
 *
 * Generates and classifies
 * data with no hearing loss.
 */
function createNormalHLData(allData) {
  return generateAndClassify(allData, 'CONDUCTIVE', ['NORMAL']);
}


/*
 * createMixedHLData() Function
 *
 * Generates and classifies
 * mixed hearing loss data.
 */
function createMixedHLData(allData) {
  for (let degree1 of HEARING_DEGREES) {
    for (let degree2 of HEARING_DEGREES) {
      if (degree1 === degree2) break;
      allData = generateAndClassify(allData, 'MIXED', [degree1, degree2]);
    }
  }

  return allData;
}


/*
 * createCondOrSensHLData() Function
 *
 * Generates and classifies conductive
 * or sensorineural hearing loss data.
 * 
 * @param: type, a String: 'CONDUCTIVE'
 *         or 'SENSORINEURAL'.
 */
function createCondOrSensHLData(allData, type) {
  for (let degree of HEARING_DEGREES) {
    allData = generateAndClassify(allData, type, [degree]);
  }

  return allData;
}


/*
 * generateAndClassify() Function
 *
 * Generates and classifies data sets.
 */
function generateAndClassify(allData, type, otherArgs) {
  const data = generateHearingLossType(type, NUM_SETS, otherArgs);
  return allData.concat(classifyData(data));
}



/*************************************/
/*     CREATION DRIVER FUNCTION      */
/*************************************/

/*
 * createData() Function
 *
 * Drives the data generation 
 * and classification process.
 */
function createData(allData) {
  allData = createNormalHLData(allData);
  allData = createMixedHLData(allData);
  allData = createCondOrSensHLData(allData, 'CONDUCTIVE');
  allData = createCondOrSensHLData(allData, 'SENSORINEURAL');

  return allData;
}



/********************************************/

module.exports = { createData };