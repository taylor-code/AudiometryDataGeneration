/********************************************/
/*             ClassifyData.js              */
/*                                          */
/* Holds the data classification functions. */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/04/2021                      */
/********************************************/


const { HEARING_DEGREES } = require('./GenerateData');


// Properties 1-7 of obj are the decibels.
const getDecibelValues = obj => Object.values(obj).slice(1, 7);

const add = (accumulator, currVal) => accumulator + currVal;

// Gets the sum of values in arr then returns the average.
const getAverageDecibel = arr => arr.reduce(add) / arr.length;

// Returns true x is between min and max.
const isInRange = (x, min, max) => (x - min) * (x - max) <= 0;


/* 
 * classifyHLDegree() Function
 *
 * @param: average, a Float of the average decibels.
 * 
 * @return: a String of the hearing degree.
 */
function classifyHLDegree(average) {
  if (isInRange(average, 0, 20))  return "Normal";
  if (isInRange(average, 21, 40)) return "Mild";
  if (isInRange(average, 41, 55)) return "Moderate";
  if (isInRange(average, 56, 70)) return "Moderately-Severe";
  if (isInRange(average, 71, 90)) return "Severe";
  return "Profound";
}


/* 
 * classifyConductive() Function
 *
 * Returns 'Y' if the average decibel value is above
 * the Normal maximum decibel. Else, returns null.
 */
function classifyConductive(average) {
  return average > HEARING_DEGREES.NORMAL.MAX ? 'Y' : null;
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
    let decibelsArr = getDecibelValues(obj);
    let average = getAverageDecibel(decibelsArr);

    obj['Degree of Hearing Loss'] = classifyHLDegree(average);
    obj['Conductive'] = classifyConductive(average);
  }
  
  return dataArr;
}



/********************************************/

module.exports = { classifyData };