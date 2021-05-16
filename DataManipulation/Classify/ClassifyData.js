/********************************************/
/*             ClassifyData.js              */
/*                                          */
/* Holds the data classification driver.    */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/04/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const { getAverageBothEars } = require('./GetAverage');

const {
  abgIsGreaterThan10,
  getEarValues
} = require('./ClassifyDataHelpers');

const {
  classifyConductive,
  classifySensorineural,
  classifyMixed
} = require('./ClassifyType');

const {
  classifyHighFrequency,
  classifyLowFrequency,
  classifyBilateral,
  classifyUnilateral,
  classifySymmetrical,
  classifyAsymmetrical
} = require('./ClassifyConfiguration');



/*************************************/
/*     CLASSIFICATION FUNCTIONS      */
/*************************************/

function getClassificationFunction(type) {
  const classificationFunctions = {
    'Conductive':    classifyConductive,
    'Sensorineural': classifySensorineural,
    'Mixed':         classifyMixed
  };
  return classificationFunctions[type];
}


/* 
 * Classifies the degree and type of hearing loss.
 */
function classifyDataSet(set, tryType) {

  // Get the calculation variables.
  const { leftAC, rightAC, leftBC, rightBC } = getEarValues(set);
  const valuesAC     = leftAC.concat(rightAC);
  const valuesBC     = leftBC.concat(rightBC);
  const averageAC    = getAverageBothEars(leftAC, rightAC);
  const averageBC    = getAverageBothEars(leftBC, rightBC);
  const abgGreater10 = abgIsGreaterThan10(valuesAC, valuesBC);

  // Classify the degree.
  const func = getClassificationFunction(tryType);
  set['Degree'] = func(averageAC, averageBC, abgGreater10);

  // Return `undefined` for invalid sets.
  if (set['Degree'] === 'null') return;

  // Set the type.
  if (set['Degree'] === 'Normal') set['Type'] = 'None';
  else set['Type'] = tryType;

  return set;
}



/********************************************/

module.exports = { classifyDataSet };