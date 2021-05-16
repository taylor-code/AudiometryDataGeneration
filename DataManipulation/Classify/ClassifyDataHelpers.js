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


// Returns true if both x and y are between min and max.
function isInRange_TwoValues(x, y, min, max) {
  return isInRange(x, min, max) && isInRange(y, min, max);
}


/*
 * Gets the decibel values.
 * 
 * @return: an Object of four Arrays.
 */
function getEarValues(obj) {
  const leftAC  = Object.values(obj['AC']['Left Ear']);
  const rightAC = Object.values(obj['AC']['Right Ear']);

  const leftBC  = Object.values(obj['BC']['Left Ear']);
  const rightBC = Object.values(obj['BC']['Right Ear']);

  return { leftAC, rightAC, leftBC, rightBC };
}



/*************************************/
/*       AIR-BONE GAP FUNCTION       */
/*************************************/

/*
 * Used to determine conductive and
 * sensorineural hearing loss types.
 * 
 * @param: valuesAC, dBs for air conduction (AC).
 * @param: valuesBC, dBs for bone conduction (BC).
 * 
 * @return: a Bool: true if all values are > 10.
 */
function abgIsGreaterThan10(valuesAC, valuesBC) {

  // ABG = AC Threshold – BC Threshold
  for (let i = 0; i < valuesAC.length; i++) {
    if (valuesAC[i] - valuesBC[i] <= 10) return false;
  }

  return true;
}



/********************************************/

module.exports = {
  isInRange,
  isInRange_TwoValues,
  getEarValues,
  abgIsGreaterThan10
};