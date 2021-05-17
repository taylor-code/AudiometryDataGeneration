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


/*************************************/
/*         IMPORTS/CONSTANTS         */
/*************************************/

const { HEARING_DEGREES, generateSet, } = require('./GenerateData');
const { classifyDataSet } = require('../Classify/ClassifyData');

const NUM_SETS = 700;



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
    'Configuration': 'null',
    'AC': generateSet(min, max),
    'BC': generateSet(NORMAL_MIN, NORMAL_MAX)
  };
}


/*
 * Generates random decibel values
 * for sensorineural hearing loss.
 */
function generateSensorineural({ min1: min, max1: max }) {
  return {
    'Configuration': 'null',
    'AC': generateSet(min, max),
    'BC': generateSet(min, max)
  };
}


/*
 * Generates random decibel
 * values for mixed hearing loss.
 */
function generateMixed({ min1: minAC, max1: maxAC,
                         min2: minBC, max2: maxBC }) {
  return {
    'Configuration': 'null',
    'AC': generateSet(minAC, maxAC),
    'BC': generateSet(minBC, maxBC)
  };
}



/*************************************/
/*         HELPER FUNCTIONS          */
/*************************************/

function getGenerationTypeFunction(type) {
  const generationFunctions = {
    'Conductive':    generateConductive,
    'Sensorineural': generateSensorineural,
    'Mixed':         generateMixed
  };
  return generationFunctions[type];
}


function getMinMaxArr(degrees) {
  let minMax = {
    min1: HEARING_DEGREES[degrees[0]]['MIN'],
    max1: HEARING_DEGREES[degrees[0]]['MAX']
  };

  // For generating mixed hearing loss:
  if (degrees.length === 2) {
    minMax['min2'] = HEARING_DEGREES[degrees[1]]['MIN'];
    minMax['max2'] = HEARING_DEGREES[degrees[1]]['MAX'];
  }

  return minMax;
}



/*************************************/
/*         GENERAL FUNCTION          */
/*************************************/

/*
 * Generates hearing data for a type of hearing
 * loss (conductive, sensorineural, or mixed).
 * 
 * @return: an Array of hearing data sets.
 */
function generateSets_Type(type, degrees) {
  let numSets  = NUM_SETS;
  const minMax = getMinMaxArr(degrees);
  const func   = getGenerationTypeFunction(type);

  let data = [];
  let set;

  while (numSets-- > 0) {
    set = classifyDataSet(func(minMax), type);

    // Only add valid sets.
    if (set) data.push(set);
  }

  return data;
}



/********************************************/

module.exports = { generateSets_Type };