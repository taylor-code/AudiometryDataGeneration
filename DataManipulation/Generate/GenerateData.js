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
const { generateType     } = require('./GenerateType');
const { classifyOneEar   } = require('../Classify/ClassifyOneEar');



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

  let instances = [];
  let instance;

  let numInstances = 2;
  while (numInstances-- > 0) {
    instance = classifyOneEar(generateFunc());

    // Invalid instances are returned as `undefined`.
    if (instance) instances.push(instance);
  }

  return instances;
}



/********************************************/

module.exports = { generate };