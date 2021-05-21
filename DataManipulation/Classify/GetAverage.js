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
 * Returns the rounded average of the array values.
 */
const getAverage = arr => Math.round(arr.reduce(add) / arr.length);


/*
 * Given an array of decibel values, returns
 * the average of the first three values.
 */
const getAverageOf3 = arr => getAverage(arr.slice(0, 3));


/* 
 * Calculates the pure-tone average (PTA) of
 * the 500, 1000, and 2000 Hz thresholds. Used
 * to determine the degree of hearing loss.
 * 
 * Takes any number of arguments.
 */
function getPTA() {
  const args = Array.from(arguments);

  const sum = args.reduce((accumulator, current) => {
    return accumulator + Math.round(getAverageOf3(current));
  }, 0);

  return sum / args.length;
}


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



/***********************************************/

module.exports = {
  getAverage,
  getPTA,
  getLowHighPTA
};