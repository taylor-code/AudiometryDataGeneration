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
/*    GENERAL CREATION FUNCTIONS     */
/*************************************/

/*
 * Generates and classifies data.
 * Considers one degree.
 */
function createWithOneDegree(type, config = null) {
  let data = [];
  
  for (let degree of HEARING_DEGREES) {
    data = data.concat(generate([degree], type, config));
  }

  return data;
}


/*
 * Generates and classifies data.
 * Considers two degrees.
 */
function createWithTwoDegrees(type, config = null) {
  let data = [];

  for (let degree1 of HEARING_DEGREES) {
    for (let degree2 of HEARING_DEGREES) {
      if (degree1 === degree2) break;
      data = data.concat(generate([degree1, degree2], type, config));
    }
  }

  return data;
}


/*************************************/
/*      TYPE CREATION FUNCTIONS      */
/*************************************/

const createNormal = () => generate(['NORMAL'], 'Conductive');

const createMixed  = () => createWithTwoDegrees('Mixed');

// @param: type, 'Conductive' or 'Sensorineural'.
const createCondOrSens = (type) => createWithOneDegree(type);



/*************************************/
/*     CONFIG CREATION FUNCTIONS     */
/*************************************/

/*
 * Generates conductive or sensorineural
 * unilateral hearing loss data.
 */
function createUnilateral(type) {
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


function createAsymmetrical(type) {
  return createWithTwoDegrees(type, 'Asymmetrical');
}



/*************************************/
/*     CREATION DRIVER FUNCTION      */
/*************************************/

/*
 * Drives the data generation 
 * and classification process.
 */
function createData() {
  let   data1 = createCondOrSens('Conductive');
  const data2 = createMixed();
  const data3 = createNormal();
  const data4 = createCondOrSens('Sensorineural');
  const data5 = createUnilateral('Conductive');
  const data6 = createUnilateral('Sensorineural');
  const data7 = createAsymmetrical('Conductive');
  const data8 = createAsymmetrical('Sensorineural');

  return data1.concat(data2, data3, data4, data5, data6, data7, data8);
}



/********************************************/

module.exports = { createData };