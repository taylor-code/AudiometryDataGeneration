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
/*         IMPORTS/CONSTANTS         */
/*************************************/

const { generateSets_Type } = require('./Generate/GenerateType');

const HEARING_DEGREES = [
  'SLIGHT', 'MILD', 'MODERATE',
  'MODERATE_SEVERE', 'SEVERE', 'PROFOUND'
];



/*************************************/
/*      TYPE CREATION FUNCTIONS      */
/*************************************/

/*
 * Generates and classifies
 * data with no hearing loss.
 */
function createNormalHLData() {
  return generateSets_Type('Conductive', ['NORMAL']);
}


/*
 * Generates and classifies
 * mixed hearing loss data.
 */
function createMixedHLData() {
  let data = [];

  for (let degree1 of HEARING_DEGREES) {
    for (let degree2 of HEARING_DEGREES) {
      if (degree1 === degree2) break;
      data = data.concat(generateSets_Type('Mixed', [degree1, degree2]));
    }
  }

  return data;
}


/*
 * Generates conductive or sensorineural
 * hearing loss data.
 * 
 * @param: type, 'Conductive' or 'Sensorineural'.
 */
function createCondOrSensHLData(type) {
  let data = [];
  
  for (let degree of HEARING_DEGREES) {
    data = data.concat(generateSets_Type(type, [degree]));
  }

  return data;
}



/*************************************/
/*     CREATION DRIVER FUNCTION      */
/*************************************/

/*
 * Drives the data generation 
 * and classification process.
 */
function createData() {
  let data1 = createCondOrSensHLData('Conductive');
  const data2 = createMixedHLData();
  const data3 = createNormalHLData();
  const data4 = createCondOrSensHLData('Sensorineural');

  return data1.concat(data2, data3, data4);
}



/********************************************/

module.exports = { createData };