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

const { getAverageBothEars } = require('./GetAverage');

const {
  isInRange,
  isInRange_TwoValues,
  getDegree,
  abgIsGreaterThan10,
  getEarValues
} = require('./ClassifyDataHelpers');



/*************************************/
/*   TYPE CLASSIFICATION FUNCTIONS   */
/*************************************/

/* 
 * Conductive hearing loss occurs when the
 * BC test values are in the normal range
 * but the AC test values are not. The Air-
 * BoneGap (ABG) must be > 10 db.
 *
 * @param: averageAC, an Int of the ACPTA
 *         (air conduction pure-tone average).
 * @param: averageBC, an Int of the BCPTA
 *         (bone conduction pure-tone average).
 * @param: abgGreater10, a Boolean.
 */
function classifyConductive(averageAC, averageBC, abgGreater10) {
  if (isInRange(averageBC, -10, 15)) {
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
function classifySensorineural(averageAC, averageBC, abgGreater10) {
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
function classifyMixed(averageAC, averageBC, abgGreater10) {
  if (!abgGreater10) return 'null';
  return `AC: ${getDegree(averageAC)} & BC: ${getDegree(averageBC)}`;
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
function classifyType(set, tryType) {

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
  if (set['Degree'] === 'Normal') {
    set['Type']          = 'None';
    set['Configuration'] = 'None';
  }
  // Configuration is already set to 'Bilateral'.
  else set['Type'] = tryType;

  return set;
}



/********************************************/

module.exports = { classifyType };