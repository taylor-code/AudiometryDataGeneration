/********************************************/
/*          ClassifyDataHelpers.js          */
/*                                          */
/* Holds the data classification helper     */
/* functions.                               */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   03/19/2021                      */
/********************************************/


// Returns true if x is between min and max.
const isInRange = (x, min, max) => (x - min) * (x - max) <= 0;



/*************************************/
/*       AIR-BONE GAP FUNCTION       */
/*************************************/

/* 
 * getAverageDecibel_BothEars() Function
 *
 * Determines if the Air-Bone Gap (ABG)
 * is <= 10 or > 10 for all frequencies.
 * 
 * Used to determine conductive and
 * sensorineural hearing loss types.
 * 
 * @param: valuesAC, an Int array of decibel
 *         values for air conduction (AC).
 * @param: valuesBC, an Int array of decibel
 *         values for bone conduction (BC).
 * 
 * @return: a Bool: true if all values are <= 10.
 */
function abgIsLessThan10(valuesAC, valuesBC) {
  let diagnosis = [];
  let abg = 0;

  // ABG = AC Threshold – BC Threshold
  for (let i = 0; i < valuesAC.length; i++) {
    abg = valuesAC[i] - valuesBC[i];
    diagnosis.push(abg <= 10? true : false);
  }

  return diagnosis.every(e => e === true);
}



/*************************************/
/*      GET EAR VALUES FUNCTION      */
/*************************************/

/* 
 * getEarValues() Function
 *
 * Gets the frequency decibel values.
 * 
 * @param: obj, a dataset Object.
 * 
 * @return: an Object of four Arrays.
 */
function getEarValues(obj) {
  const leftAC = Object.values(obj['AC']['Left Ear']);
  const rightAC = Object.values(obj['AC']['Right Ear']);

  const leftBC = Object.values(obj['BC']['Left Ear']);
  const rightBC = Object.values(obj['BC']['Right Ear']);

  return { leftAC, rightAC, leftBC, rightBC };
}



/********************************************/

module.exports = {
  isInRange,
  abgIsLessThan10,
  getEarValues
};