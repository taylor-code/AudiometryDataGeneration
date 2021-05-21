/********************************************/
/*             ClassifyType.js              */
/*                                          */
/* Holds the data classification functions  */
/* for hearing loss degree and type         */
/* (conductive, sensorineural, and mixed).  */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   03/20/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const { classifyCont } = require('./ClassifyContainer');

const {
  isInRange,
  isInRange_TwoValues,
  getDegree
} = require('./ClassifyHelpers');



/*************************************/
/*   TYPE CLASSIFICATION FUNCTIONS   */
/*************************************/

/* 
 * Conductive hearing loss occurs when the
 * BC test values are in the normal range
 * but the AC test values are not. The Air-
 * BoneGap (ABG) must be > 10 db.
 */
function classifyConductive() {
  const averageAC    = classifyCont.averageAC;
  const abgGreater10 = classifyCont.abgGreater10;

  if (isInRange(classifyCont.averageBC, -10, 15)) {
    if (isInRange(averageAC, -10, 15) && !abgGreater10) return 'Normal';
    if (abgGreater10) return getDegree(averageAC);
  }

  return 'null';
}


/* 
 * Sensorineural hearing loss occurs when the
 * AC and BC test values are within 10 dB of
 * each other at ALL test frequencies.
 */
function classifySensorineural() {
  const averageAC    = classifyCont.averageAC;
  const averageBC    = classifyCont.averageBC;
  const abgGreater10 = classifyCont.abgGreater10;

  if (!abgGreater10) {
    if (isInRange_TwoValues(averageAC, averageBC, -10, 15)) return 'Normal';
    if (isInRange_TwoValues(averageAC, averageBC,  16, 25)) return 'Slight';
    if (isInRange_TwoValues(averageAC, averageBC,  26, 40)) return 'Mild';
    if (isInRange_TwoValues(averageAC, averageBC,  41, 55)) return 'Moderate';
    if (isInRange_TwoValues(averageAC, averageBC,  56, 70)) return 'Moderately-Severe';
    if (isInRange_TwoValues(averageAC, averageBC,  71, 90)) return 'Severe';
    if (averageAC > 90 && averageBC > 90) return 'Profound';
  }

  return 'null';
}


/* 
 * Mixed hearing loss occurs when both the
 * AC and BC thresholds show loss, but the
 * ABG is > 10 dB for all test frequencies.
 */
function classifyMixed() {
  if (!classifyCont.abgGreater10) return 'null';
  const ACStr = getDegree(classifyCont.averageAC);
  const BCStr = getDegree(classifyCont.averageBC);
  return `AC: ${ACStr} & BC: ${BCStr}`;
}



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
function classifyType(dataSet, tryType) {

  // Set the calculation variables.
  classifyCont.setProp(dataSet);

  // Classify the degree.
  const func = getClassificationFunction(tryType);
  dataSet['Degree'] = func();

  // Return `undefined` for invalid sets.
  if (dataSet['Degree'].includes('null')) return;

  // Set the type.
  if (dataSet['Degree'] === 'Normal') {
    dataSet['Type']          = 'None';
    dataSet['Configuration'] = 'None';
  }
  // Configuration is already set to 'Bilateral'.
  else dataSet['Type'] = tryType;

  return dataSet;
}



/********************************************/

module.exports = { classifyType };