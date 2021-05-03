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
 * @params: otherArgs, an Array of the min (Int)
 *          and max (Int) for AC generation.
 *
 * @return: an Object depicting (possible)
 *          conductive hearing loss.
 */
function generateConductive(otherArgs) {
  const [ min, max ] = [...otherArgs]
  const NORMAL_MIN   = HEARING_DEGREES.NORMAL.MIN;
  const NORMAL_MAX   = HEARING_DEGREES.NORMAL.MAX;

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
 * @params: otherArgs, an Array of the
 *          min (Int) and max (Int).
 *
 * @return: an Object depicting (possible)
 *          sensorineural hearing loss.
 */
function generateSensorineural(otherArgs) {
  const [ min, max ] = [...otherArgs]
  return {
    'Type':          'null',
    'Degree':        'null',
    'Configuration': 'null',
    'AC':             generateSet_BothEars(min, max),
    'BC':             generateSet_BothEars(min, max)
  };
}


/* 
 * generateMixed() Function
 *
 * Generates random decibel
 * values for mixed hearing loss.
 *
 * @params: otherArgs, an Array of the
 *          min and max values for BC
 *          generation and AC generation.
 *
 * @return: an Object depicting (possible)
 *          mixed hearing loss.
 */
function generateMixed(otherArgs) {
  const [ minAC, maxAC, minBC, maxBC ] = [...otherArgs]
  return {
    'Type':          'null',
    'Degree':        'null',
    'Configuration': 'null',
    'AC':             generateSet_BothEars(minAC, maxAC),
    'BC':             generateSet_BothEars(minBC, maxBC)
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
    'MIXED':         generateMixed
  };
  return generationFunctions[type]
}


/* 
 * generateHearingLossType() Function
 * 
 * Generates hearing data for a type of hearing loss
 * (conductive, sensorineural, mixed).
 * 
 * @param: type, a String of the hearing loss type.
 * @param: numSets, an Int of sets to create.
 * @param: degreesArr, an Array of hearing loss
 *         degrees. May have one or two elements.
 *
 * @return: an Array of hearing sets.
 */
function generateHearingLossType(type, numSets, degreesArr) {
  let otherArgs = [
    HEARING_DEGREES[degreesArr[0]]["MIN"],
    HEARING_DEGREES[degreesArr[0]]["MAX"]
  ]

  if (degreesArr.length === 2) {
    otherArgs.push(HEARING_DEGREES[degreesArr[1]]["MIN"])
    otherArgs.push(HEARING_DEGREES[degreesArr[1]]["MAX"])
  }

  const func = getGenerationTypeFunction(type);
  
  return generateDataSets(func, numSets, otherArgs);
}



/********************************************/

module.exports = { generateHearingLossType };