/*********************************************/
/*               GetAverage.js               */
/*                                           */
/* Holds the pure-tone average (PTA)         */
/* calculation functions for classification. */
/*                                           */
/* @author: Kyra Taylor                      */
/* @date:   03/19/2021                       */
/*********************************************/


/*
 * Used by the reduce method.
 */
const add = (accumulator, currVal) => accumulator + currVal;


/*
 * Returns the rounded average of the array values.
 */
const getAverage = arr => Math.round(arr.reduce(add) / arr.length);


/*
 * Pure-Tone Average (PTA) usually considers
 * the dB values at 500, 1000, and 2000 Hz.
 * 
 * Low-Frequency PTA considers 250, 500, 1000, and 2000 Hz.
 * High-Frequency PTA considers 4000 and 8000 Hz.
 */
const sliceArrFuncs = {
  'Normal':         arr => arr.slice(1, 4),
  'Low-Frequency':  arr => arr.slice(0, 4),
  'High-Frequency': arr => arr.slice(-2),
}

function getPTAArrFunc(freq) {
  return sliceArrFuncs[freq] || sliceArrFuncs['Normal'];
}


/* 
 * Calculates PTA. Used to determine
 * the degree of hearing loss.
 * 
 * Takes any number of arguments. If
 * the last argument is a string, uses
 * different Hz values.
 */
function getPTA() {
  const args = Array.from(arguments);

  // See if 'Low-Frequency' or 'High-Frequency' was passed.
  const key = typeof args.slice(-1)[0] === 'string' ? args.pop() : 'Normal';
  const sliceFunc = getPTAArrFunc(key);

  // Get the average of all the arrays passed.
  const sum = args.reduce((accumulator, current) => {
    return accumulator + Math.round(getAverage(sliceFunc(current)));
  }, 0);

  return sum / args.length;
}



/***********************************************/

module.exports = { getPTAArrFunc, getPTA };