/********************************************/
/*            ClassifyHelpers.js            */
/*                                          */
/* Holds the classification helper          */
/* functions, such as PTA calculation       */
/* and ABG calculation.                     */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   03/19/2021                      */
/********************************************/


/*************************************/
/*         HELPER FUNCTIONS          */
/*************************************/

const add = (accumulator, currVal) => accumulator + currVal;


/*
 * Returns the rounded average of the array values.
 */
const getAverage = arr => Math.round(arr.reduce(add) / arr.length);


/*
 * Pure-Tone Average (PTA) includes the
 * dB values at 500, 1000, and 2000 Hz.
 * 
 * Low-Frequency PTA considers 250–4000 Hz.
 * High-Frequency PTA considers 4000–8000 Hz.
 */
const sliceArrFuncs = {
  'Normal':         arr => arr.slice(1, 4),
  'Low-Frequency':  arr => arr.slice(0, 5),
  'High-Frequency': arr => arr.slice(-2),
}


function getPTASliceArrFunc(freq) {
  return sliceArrFuncs[freq];
}



/*************************************/
/*      PTA CALCULATION FUNCTION      */
/*************************************/

/* 
 * Calculates PTA. Used to determine
 * the degree of hearing loss.
 * 
 * Takes any number of arguments. The
 * last argument is a string: 'Normal',
 * 'Low-Frequency', or 'High-Frequency'.
 */
function getPTA() {
  const args = Array.from(arguments);

  // The last argument specifies the slice function type.
  const sliceFunc = getPTASliceArrFunc(args.pop());

  // Get the average of all the arrays passed.
  const sum = args.reduce((accumulator, current) => {
    return accumulator + Math.round(getAverage(sliceFunc(current)));
  }, 0);

  return sum / args.length;
}



/*************************************/
/*      ABG CALCULATION FUNCTION      */
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
function abgIsGreaterThan10(valuesAC, valuesBC, freq) {
  const sliceFunc = getPTASliceArrFunc(freq);
  const ac = sliceFunc(valuesAC);
  const bc = sliceFunc(valuesBC);

  // ABG = AC Threshold – BC Threshold
  for (let i = 0; i < ac.length; i++) {
    if (ac[i] - bc[i] <= 10) return false;
  }

  return true;
}



/***********************************************/

module.exports = {
  getAverage,
  getPTASliceArrFunc,
  getPTA,
  abgIsGreaterThan10
};