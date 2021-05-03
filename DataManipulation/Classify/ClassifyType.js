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


const {
  isInRange,
  isInRange_TwoValues
} = require('./ClassifyDataHelpers');



/*************************************/
/*     CLASSIFICATION FUNCTIONS      */
/*************************************/

/* 
 * classifyConductive() Function
 *
 * Conductive hearing loss occurs when the
 * BC test values are in the normal range
 * but the AC test values are not. The Air-
 * BoneGap (ABG) must be > 10 db.
 *
 * @param: averageAC, an Int of the ACPTA
 *         (air conduction pure-tone average).
 * @param: averageBC, an Int of the BCPTA
 *         (bone conduction pure-tone average).
 * @param: abgGreater10, a Boolean. True if
 *         ABG > 10, false if AGB <= 10.
 * 
 * @return: a String of the hearing degree.
 */
function classifyConductive(averageAC, averageBC, abgGreater10) {
  if (isInRange(averageBC, -10, 15)) {
    if (isInRange(averageAC, -10, 15) && !abgGreater10) return 'Normal';

    if (abgGreater10) {
      // Note: The 'Normal Conductive' statement has never been returned:
      if (isInRange(averageAC, -10, 15)) return 'Normal Conductive';
      if (isInRange(averageAC,  16, 25)) return 'Slight';
      if (isInRange(averageAC,  26, 40)) return 'Mild';
      if (isInRange(averageAC,  41, 55)) return 'Moderate';
      if (isInRange(averageAC,  56, 70)) return 'Moderately-Severe';
      if (isInRange(averageAC,  71, 90)) return 'Severe';
      if (averageAC > 90) return 'Profound';
    }
  }

  return 'null';
}


/* 
 * classifySensorineural() Function
 *
 * Sensorineural hearing loss occurs when the
 * AC and BC test values are within 10 dB of
 * each other at ALL test frequencies.
 *
 * @param: averageAC, an Int of the ACPTA.
 * @param: averageBC, an Int of the BCPTA.
 * @param: abgLess10, a Boolean. True if
 *         ABG <= 10, false if AGB > 10.
 * 
 * @return: a String of the hearing degree. 
 */
function classifySensorineural(averageAC, averageBC, abgLess10) {
  if (abgLess10) {
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
 * classifyMixed() Function
 *
 * Mixed hearing loss occurs when both 
 * the AC and BC thresholds show loss,
 * but the Air-Bone-Gap is > 10 dB for
 * all test frequencies.
 *
 * @param: averageAC, an Int of the ACPTA.
 * @param: averageBC, an Int of the BCPTA.
 * @param: abgGreater10, a Boolean.
 * 
 * @return: a String of the hearing degree.
 */
function classifyMixed(averageAC, averageBC, abgGreater10) {
  let acDegree = 'AC: ';
  let bcDegree = 'BC: ';

  if (!abgGreater10) return 'null';

  /* Air-Conduction */
  if      (isInRange(averageAC, 16, 25)) acDegree += 'Slight';
  else if (isInRange(averageAC, 26, 40)) acDegree += 'Mild';
  else if (isInRange(averageAC, 41, 55)) acDegree += 'Moderate';
  else if (isInRange(averageAC, 56, 70)) acDegree += 'Moderately-Severe';
  else if (isInRange(averageAC, 71, 90)) acDegree += 'Severe';
  else if (averageAC > 90)               acDegree += 'Profound';
  else                                   acDegree += 'null';

  /* Bone-Conduction */
  if      (isInRange(averageBC, 16, 25)) bcDegree += 'Slight';
  else if (isInRange(averageBC, 26, 40)) bcDegree += 'Mild';
  else if (isInRange(averageBC, 41, 55)) bcDegree += 'Moderate';
  else if (isInRange(averageBC, 56, 70)) bcDegree += 'Moderately-Severe';
  else if (isInRange(averageBC, 71, 90)) bcDegree += 'Severe';
  else if (averageBC > 90)               bcDegree += 'Profound';
  else                                   bcDegree += 'null';

  return `${acDegree} & ${bcDegree}`;
}



/********************************************/

module.exports = {
  classifyConductive,
  classifySensorineural,
  classifyMixed
};