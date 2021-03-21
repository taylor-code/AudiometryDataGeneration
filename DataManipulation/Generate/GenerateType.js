/********************************************/
/*             GenerateType.js              */
/*                                          */
/* Holds the hearing loss type              */
/* (conductive and sensorineural)           */
/* data generation functions.               */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/05/2021                      */
/********************************************/


const {
  HEARING_DEGREES,
  generateSet_BothEars,
  generateDataSets
} = require('./GenerateData');



/*************************************/
/*   HL TYPE GENERATION FUNCTIONS    */
/*************************************/

/* 
 * generateConductive() Function
 *
 * Generates random decibel values for conductive
 * hearing loss. The bone conduction (BC) values
 * are in the normal range.
 *
 * @params: min (Int) and max (Int).
 *
 * @return: an Object depicting (possible)
 *          conductive hearing loss.
 */
function generateConductive(min, max) {
  const NORMAL_MIN = HEARING_DEGREES.NORMAL.MIN;
  const NORMAL_MAX = HEARING_DEGREES.NORMAL.MAX;

  return {
    'Type':          'null',
    'Degree':        'null',
    'Configuration': 'null',
    'AC':             generateSet_BothEars(min, max),
    'BC':             generateSet_BothEars(NORMAL_MIN, NORMAL_MAX)
  };
}


/* 
 * generateSensorineural() Function
 *
 * Generates random decibel values
 * for sensorineural hearing loss.
 *
 * @params: min (Int) and max (Int).
 *
 * @return: an Object depicting (possible)
 *          sensorineural hearing loss.
 */
function generateSensorineural(min, max) {
  return {
    'Type':          'null',
    'Degree':        'null',
    'Configuration': 'null',
    'AC':             generateSet_BothEars(min, max),
    'BC':             generateSet_BothEars(min, max)
  };
}



/*************************************/
/*       GENERALIZED FUNCTIONS       */
/*************************************/

/*
 * getGenerationTypeFunction() Function
 *
 * @param: type, a String.
 * @return: a Function.
 */
function getGenerationTypeFunction(type) {
  const generationFunctions = {
    'CONDUCTIVE':    generateConductive,
    'SENSORINEURAL': generateSensorineural,
  };
  return generationFunctions[type]
}


/* 
 * generateHearingLossType() Function
 * 
 * Generates hearing data for a type of hearing loss
 * (conductive, sensorineural).
 * 
 * TODO: Mixed Hearing
 * 
 * @param: type, a String of the hearing loss type.
 * @param: numSets, an Int of sets to create.
 * @param: degree, a String of the hearing loss degree.
 *
 * @return: an Array of hearing sets.
 */
function generateHearingLossType(type, numSets, degree) {
  const min = HEARING_DEGREES[degree]["MIN"];
  const max = HEARING_DEGREES[degree]["MAX"];

  const func = getGenerationTypeFunction(type);
  
  return generateDataSets(func, numSets, min, max);
}



/********************************************/

module.exports = { generateHearingLossType };