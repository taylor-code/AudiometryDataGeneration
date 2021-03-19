/********************************************/
/*              GetAverage.js               */
/*                                          */
/* Holds the average calculation            */
/* functions for data classification.       */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   03/19/2021                      */
/********************************************/


// Used by the reduce() method in getAverage().
const add = (accumulator, currVal) => accumulator + currVal;

// Given an array of decibel values, returns
// the average of the first three values.
const getAverage = arr => arr.slice(0, 3).reduce(add) / 3;


/* 
 * getPTA() Function
 *
 * Calculates the pure-tone average (PTA)
 * of the 500, 1000, and 2000 Hz thresholds.
 * Used to determine the degree of hearing loss.
 * 
 * @param: leftAC, rightAC, leftBC, rightBC:
 *         Int Arrays of decibel values.
 * 
 * @return: an Int of the (rounded) PTA.
 */
function getPTA(leftAC, rightAC, leftBC, rightBC) {
  return Math.round((getAverage(leftAC) + getAverage(rightAC) +
                     getAverage(leftBC) + getAverage(rightBC)) / 4);
}


/* 
 * getAverageBothEars() Function
 *
 * Calculates the average decibel for both
 * ears (for either an AC test or a BC test).
 * 
 * @param: leftDB, an Int array of the
 *         left ear decibel values.
 * @param: rightDB, an Int array of the
 *         right ear decibel values.
 * 
 * @return: an Int of the (rounded) average.
 */
function getAverageBothEars(leftDB, rightDB) {
  return Math.round((getAverage(leftDB) + getAverage(rightDB)) / 2);
}



/***********************************************/

module.exports = { getPTA, getAverageBothEars };