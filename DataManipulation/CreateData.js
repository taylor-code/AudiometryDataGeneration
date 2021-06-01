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

const HEARING_DEGREE_LABELS = [
  'Slight', 'Mild', 'Moderate',
  'Moderately-Severe', 'Severe', 'Profound'
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
  
  for (let degree of HEARING_DEGREE_LABELS) {
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

  for (let degree1 of HEARING_DEGREE_LABELS) {
    for (let degree2 of HEARING_DEGREE_LABELS) {
      if (degree1 === degree2) break;
      data = data.concat(generate([degree1, degree2], type, config));
    }
  }

  return data;
}


/*************************************/
/*      TYPE CREATION FUNCTIONS      */
/*************************************/

const createNormal = () => generate(['Normal'], 'None');

const createMixed  = () => createWithTwoDegrees('Mixed');


function createConductive(config = null) {
  let data = [];
  
  for (let degree of HEARING_DEGREE_LABELS) {
    data = data.concat(generate([degree, 'Normal'], 'Conductive', config));
  }

  return data;
}


function createSensorineural(config = null) {
  return createWithOneDegree('Sensorineural', config);
}




/*************************************/
/*     CONFIG CREATION FUNCTIONS     */
/*************************************/

/*
 * @param: type, 'Conductive' or 'Sensorineural'
 */
function createUnilateralCondOrSens(type) {
  let data = [];
  let degrees;
  
  for (let hlEar of ['Left', 'Right']) {
    for (let degree of HEARING_DEGREE_LABELS) {
      degrees = hlEar === 'Left' ? [degree, 'Normal'] : ['Normal', degree];
      data = data.concat(generate(degrees, type, 'Unilateral'));
    }
  }

  return data;
}


function createUnilateralMixed() {
  let data = [];
  let degrees;
  
  for (let hlEar of ['Left', 'Right']) {
    for (let degree1 of HEARING_DEGREE_LABELS) {
      for (let degree2 of HEARING_DEGREE_LABELS) {
        if (degree1 === degree2) break;

        if (hlEar === 'Left') degrees = [degree1, 'Normal', degree2, 'Normal'];
        else degrees = ['Normal', degree1, 'Normal', degree2];

        data = data.concat(generate(degrees, 'Mixed', 'Unilateral'));
      }
    }
  }

  return data;
}


function createDiffFrequency(type, config) {
  return createWithOneDegree(type, config);
}



/*************************************/
/*     CREATION DRIVER FUNCTION      */
/*************************************/

/*
 * Drives the data generation and classification process.
 */
function createData() {
  return [].concat(createConductive(), createMixed(), createNormal(),
                   createSensorineural(), createUnilateralMixed(),
                   createUnilateralCondOrSens('Conductive'),
                   createUnilateralCondOrSens('Sensorineural'),
                   createDiffFrequency('Conductive', 'Low-Frequency'),
                   createDiffFrequency('Conductive', 'High-Frequency'),
                   createDiffFrequency('Mixed', 'Low-Frequency'),
                   createDiffFrequency('Mixed', 'High-Frequency'),
                   createDiffFrequency('Sensorineural', 'Low-Frequency'),
                   createDiffFrequency('Sensorineural', 'High-Frequency'));
}



/********************************************/

module.exports = { createData };