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

const { generate } = require('./Generate/GenerateData');

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
  return generate(['NORMAL'], 'Conductive');
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
      data = data.concat(generate([degree1, degree2], 'Mixed'));
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
    data = data.concat(generate([degree], type));
  }

  return data;
}



/*************************************/
/*     CONFIG CREATION FUNCTIONS     */
/*************************************/

/*
 * Generates conductive or sensorineural
 * unilateral hearing loss data.
 * 
 * @param: type, 'Conductive' or 'Sensorineural'.
 */
function createUnilateralData(type) {
  let data = [];
  let degrees;
  
  for (let hlEar of ['Left', 'Right']) {
    for (let degree of HEARING_DEGREES) {
      degrees = hlEar === 'Left' ? [degree, 'NORMAL'] : ['NORMAL', degree];
      data = data.concat(generate(degrees, type, 'Unilateral'));
    }
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
  let   data1 = createCondOrSensHLData('Conductive');
  const data2 = createMixedHLData();
  const data3 = createNormalHLData();
  const data4 = createCondOrSensHLData('Sensorineural');
  const data5 = createUnilateralData('Conductive');
  const data6 = createUnilateralData('Sensorineural');

  return data1.concat(data2, data3, data4, data5, data6);
}



/********************************************/

module.exports = { createData };