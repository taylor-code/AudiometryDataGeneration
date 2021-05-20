/********************************************/
/*             GenerateData.js              */
/*                                          */
/* Holds the general data generation        */
/* functions.                               */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/04/2021                      */
/********************************************/


/*************************************/
/*         IMPORTS/CONSTANTS         */
/*************************************/

const { getMinMaxArr }            = require('./GenerateHelpers');
const { getGenerationTypeFunc }   = require('./GenerateType');
const { getGenerationConfigFunc } = require('./GenerateConfig');

const { classifyType }   = require('../Classify/ClassifyType');
const { classifyConfig } = require('../Classify/ClassifyConfig');

const NUM_SETS = 245;



/*************************************/
/* GENERAL TYPE AND CONFIG FUNCTIONS */
/*************************************/

/*
 * Generates hearing data for a type
 * of hearing loss or a configuration.
 * 
 * @return: an Array of hearing data sets.
 */
function generateSets(identifier, degrees, generateFunc, classifyFunc) {
  const minMax = getMinMaxArr(degrees);

  let numSets = NUM_SETS;
  let data = [];
  let set;

  while (numSets-- > 0) {
    set = classifyFunc(generateFunc(minMax), identifier);

    // Only add valid sets.
    if (set) data.push(set);
  }

  return data;
}



/*************************************/
/*         GENERAL FUNCTION          */
/*************************************/

/*
 * Generates data for a loss
 * loss type or configuration.
 */
function generate(degrees, type, config = null) {
  if (!config) {
    const generateFunc = getGenerationTypeFunc(type);
    return generateSets(type, degrees, generateFunc, classifyType);
  }

  const generateFunc = getGenerationConfigFunc(`${config}_${type}`);
  return generateSets(config, degrees, generateFunc, classifyConfig);
}



/************************************************/

module.exports = { generate };