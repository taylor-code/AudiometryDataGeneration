/********************************************/
/*              GetAverage.js               */
/*                                          */
/* Holds the average calculation            */
/* functions for data classification.       */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   03/19/2021                      */
/********************************************/


// Used by the reduce methods.
const add = (accumulator, currVal) => accumulator + currVal;


/*
 * Given an array of decibel values, returns
 * the average of the first three values.
 */
const getAverage = arr => arr.reduce(add) / arr.length;


/*
 * Given an array of decibel values, returns
 * the average of the first three values.
 */
const getAverageOf3 = arr => getAverage(arr.slice(0, 3));


/*
 * Returns low-frequency pure-tone-average (PTA)
 * and high-frequency PTA. lowPTA includes the
 * low Hz values (250, 500, 1000, 2000). highPTA
 * includes the high Hz values (4000, 8000).
 */
function getLowHighPTA(decibels) {
  const highHz  = decibels.splice(-2);
  const highPTA = getAverage(highHz);
  const lowPTA  = getAverage(decibels);

  return [ lowPTA, highPTA ];
}


/* 
 * Calculates the pure-tone average (PTA) of
 * the 500, 1000, and 2000 Hz thresholds. Used
 * to determine the degree of hearing loss.
 */
function getPTA(leftAC, rightAC, leftBC, rightBC) {
  return Math.round((getAverageOf3(leftAC) + getAverageOf3(rightAC) +
                     getAverageOf3(leftBC) + getAverageOf3(rightBC)) / 4);
}


/* 
 * Calculates the average decibel for both
 * ears (for either an AC test or a BC test).
 */
function getAverageBothEars(leftDB, rightDB) {
  return Math.round((getAverageOf3(leftDB) + getAverageOf3(rightDB)) / 2);
}



/***********************************************/

module.exports = {
  getAverage,
  getLowHighPTA,
  getPTA,
  getAverageBothEars
};