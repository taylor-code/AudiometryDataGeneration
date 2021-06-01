/********************************************/
/*             ClassifyData.js              */
/*                                          */
/* Holds the main classification function.  */
/* Drives classification for type, degree,  */
/* and configuration.                       */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   05/17/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const {
  classifyLateral,
  classifySymmetry,
  classifyFrequency
} = require('./ClassifyConfig');

const { classifyCont: CC }   = require('./ClassifyContainer');
const { classifyTypeAndDeg } = require('./classifyTypeAndDeg');



/*************************************/
/*         CLASSIFY FUNCTION         */
/*************************************/

/* 
 * Classifies the degree, type, and
 * configuration of hearing loss.
 */
function classify(dataSet, tryType) {
  let configs = [];
  let isUnilateral = false;

  // Set the calculation variables.
  CC.setProp(dataSet, tryType);


  // Classify low- or high-frequency.
  let config = classifyFrequency();
  if (config) configs.push(config);


  // Set the PTA.
  CC.setFinalPTA(config);

  // Classify bilateral or unilateral.
  config = classifyLateral();
  if (config) {
    configs.push(config);
    if (config.includes('Unilateral')) isUnilateral = true;
  }


  // Classify the type and degree.
  try {
    const [ type, degree ] = classifyTypeAndDeg();
    if (type.includes('null'))   return;
    if (degree.includes('null')) return;

    dataSet['Type']   = type;
    dataSet['Degree'] = degree;
  }
  // Invalid data set.
  catch (ignore) { return }


  // Classify symmetry.
  // Unilateral cannot be symmetrical or asymmetrical.
  if (dataSet['Type'] !== 'None' && !isUnilateral) {
    config = classifySymmetry(dataSet['Degree'], configs.join(' | '));
    if (config) configs.push(config);
  }


  // Set the configuration.
  dataSet['Configuration'] = configs.length ? configs.join(' | ') : 'None';


  return dataSet;
}



/********************************************/

module.exports = { classify };