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

const { generateCont: GC  } = require('./GenerateContainer');
const { generateConfig }    = require('./GenerateConfig');
const { generateType }      = require('./GenerateType');

const { classify } = require('../Classify/ClassifyData');

const NUM_SETS = 101;



/*************************************/
/*         GENERATE FUNCTION         */
/*************************************/

/*
 * Generates hearing loss data.
 *
 * @return: an Array of hearing data sets.
 */
function generate(degrees, type, config = null) {
  GC.setProp(type, degrees, config);

  const generateFunc = config ? generateConfig : generateType;

  let numSets = NUM_SETS;
  let data = [];
  let set;

  while (numSets-- > 0) {
    set = classify(generateFunc(), type);
    // Only add valid sets.
    if (set) data.push(set);
  }

  return data;
}



/********************************************/

module.exports = { generate };