/********************************************/
/*             GenerateData.js              */
/*                                          */
/* Holds the general generate() function.   */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/04/2021                      */
/********************************************/


/*************************************/
/*         IMPORTS/CONSTANTS         */
/*************************************/

const { generateCont: GC } = require('./GenerateContainer');
const { generateFreqLoss } = require('./GenerateFreqLoss');
const { generateType }     = require('./GenerateType');
const { classifyOneEar }   = require('../Classify/ClassifyOneEar');

const NUM_INSTANCES = 2;



/*************************************/
/*         GENERATE FUNCTION         */
/*************************************/

/*
 * Generates hearing loss data.
 *
 * @return: an Array of instances.
 */
function generate(degrees, type, freq = null) {
  GC.setProp(degrees, type, freq);

  const generateFunc = freq ? generateFreqLoss : generateType;

  let numInstances = NUM_INSTANCES;
  let instances = [];
  let instance;

  while (numInstances-- > 0) {
    instance = classifyOneEar(generateFunc());

    // Invalid instances are returned as `undefined`.
    if (instance) instances.push(instance);
  }

  return instances;
}



/********************************************/

module.exports = { generate };