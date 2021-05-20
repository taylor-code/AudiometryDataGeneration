/********************************************/
/*             GenerateType.js              */
/*                                          */
/* Holds the hearing loss type              */
/* (conductive, sensorineural, and          */
/* mixed) data generation functions.        */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/05/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const { HEARING_DEGREES, generateSet, } = require('./GenerateHelpers');



/*************************************/
/*   HL TYPE GENERATION FUNCTIONS    */
/*************************************/

/*
 * Generates random decibel values for conductive
 * hearing loss. The bone conduction (BC) values
 * are in the normal range.
 */
function generateConductive({ min1: min, max1: max }) {
  const NORMAL_MIN = HEARING_DEGREES.NORMAL.MIN;
  const NORMAL_MAX = HEARING_DEGREES.NORMAL.MAX;

  return {
    'AC': generateSet(min, max),
    'BC': generateSet(NORMAL_MIN, NORMAL_MAX),
    'Configuration': 'Bilateral'
  };
}


/*
 * Generates random decibel values
 * for sensorineural hearing loss.
 */
function generateSensorineural({ min1: min, max1: max }) {
  return {
    'AC': generateSet(min, max),
    'BC': generateSet(min, max),
    'Configuration': 'Bilateral'
  };
}


/*
 * Generates random decibel
 * values for mixed hearing loss.
 */
function generateMixed({ min1: minAC, max1: maxAC,
                         min2: minBC, max2: maxBC }) {
  return {
    'AC': generateSet(minAC, maxAC),
    'BC': generateSet(minBC, maxBC),
    'Configuration': 'Bilateral'
  };
}



/*************************************/
/*         GENERAL FUNCTION          */
/*************************************/

function getGenerationTypeFunc(type) {
  const generationFunctions = {
    'Conductive':    generateConductive,
    'Sensorineural': generateSensorineural,
    'Mixed':         generateMixed
  };
  return generationFunctions[type];
}



/********************************************/

module.exports = { getGenerationTypeFunc };