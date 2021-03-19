/********************************************/
/*             ClassifyData.js              */
/*                                          */
/* Holds the data classification functions. */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/04/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const {
  getPTA,
  getAverageBothEars
} = require('./ClassifyHelpers/GetAverage');

const {
  isInRange,
  abgIsLessThan10,
  getEarValues
} = require('./ClassifyHelpers/ClassifyDataHelpers');



/*************************************/
/*     CLASSIFICATION FUNCTIONS      */
/*************************************/

/* 
 * classifyHLDegree() Function
 *
 * @param: average, a Float of the PTA.
 * @return: a String of the hearing degree.
 */
function classifyHLDegree(averagePTA) {
  if (isInRange(averagePTA, -10, 15)) return 'Normal';
  if (isInRange(averagePTA,  16, 25)) return 'Slight';
  if (isInRange(averagePTA,  26, 40)) return 'Mild';
  if (isInRange(averagePTA,  41, 55)) return 'Moderate';
  if (isInRange(averagePTA,  56, 70)) return 'Moderately-Severe';
  if (isInRange(averagePTA,  71, 90)) return 'Severe';
  return 'Profound';
}


/* 
 * classifyConductive() Function
 *
 * Returns 'Y' if the average decibel value is above
 * the Normal maximum decibel. Else, returns null.
 */
function classifyConductive(averageAC, averageBC, abgLess10) {
  if (isInRange(averageBC, -10, 15)) {
    if (isInRange(averageAC, -10, 15) && abgLess10) return 'Normal';

    if (!abgLess10) {
      if (isInRange(averageAC, -10, 15)) return 'Conductive';
      if (isInRange(averageAC,  16, 25)) return 'Slight';
      if (isInRange(averageAC,  26, 40)) return 'Mild';
      if (isInRange(averageAC,  41, 55)) return 'Moderate';
      if (isInRange(averageAC,  56, 70)) return 'Moderately-Severe';
      if (isInRange(averageAC,  71, 90)) return 'Severe';
      return 'Profound';
    }
  }

  return 'null';
}


/* 
 * () Function
 *
 * 
 *
 * @param: 
 * 
 * @return: 
 */
function classifySensorineural() {
  return undefined;
}


/* 
 * () Function
 *
 * 
 *
 * @param: 
 * 
 * @return: 
 */
function classifyHighFrequency() {
  return undefined;
}


/* 
 * () Function
 *
 * 
 *
 * @param: 
 * 
 * @return: 
 */
function classifyLowFrequency() {
  return undefined;
}


/* 
 * classifyData() Function
 *
 * For each object in dataArr,
 * classifies the hearing loss.
 *
 * @param: dataArr, an Array of earing data objects.
 * 
 * @return: dataArr with the classifications.
 */
function classifyData(dataArr) {
  for (let obj of dataArr) {
    // Get the calculation variables.
    const { leftAC, rightAC, leftBC, rightBC } = getEarValues(obj);
    const valuesAC = leftAC.concat(rightAC);
    const valuesBC = leftBC.concat(rightBC);
    const averageAC = getAverageBothEars(leftAC, rightAC);
    const averageBC = getAverageBothEars(leftBC, rightBC);

    // Question: Is the average the same as the threshold? (Line 11 in txt file.)
    const abgLess10 = abgIsLessThan10(valuesAC, valuesBC);

    obj['Degree'] = classifyHLDegree(getPTA(leftAC, rightAC, leftBC, rightBC));
    //obj['Type'] = classifyConductive(averageAC, averageBC, abgLess10);
  }
  
  return dataArr;
}



/********************************************/

module.exports = { classifyData };