/********************************************/
/*            classifyOneEar.js             */
/*                                          */
/* Holds the data classification            */
/* functions to classify one ear.           */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   07/27/2021                      */
/********************************************/


/*************************************/
/*         IMPORTS/CONSTANTS         */
/*************************************/

const {
  getAverage,
  getPTA,
  abgIsGreaterThan10
} = require('./ClassifyHelpers');

const {
  HEARING_SEV_DICT,
  getDegree
} = require('../HearingDegrees');


/**
 * Returns whether the maximum value in
 * `arr` is in the normal hearing range.
 * 
 * @param {[integer]} arr: dB values.
 * 
 * @returns {boolean}
 */
const isNormalMax = (arr) => Math.max(...arr) <= 15;



/*************************************/
/*        CLASSIFY FUNCTIONS         */
/*************************************/

/*-----------------------------------*/
/*             FREQUENCY             */
/*-----------------------------------*/

/**
 * Low-Frequency hearing loss involves the
 * low frequency range (250 – 4000 Hz).
 *
 * High-Frequency hearing loss involves the
 * high frequency range (4000 – 8000 Hz).
 *
 * A low- or high-frequency loss is a
 * difference >= 15 dB between the low
 * frequencies and the high frequencies.
 * 
 * @param {[integer]} ac: dB values for the AC test.
 * 
 * @returns {string}
 */
function classifyFrequency(ac) {
  // Normal hearing loss may have a difference greater
  // than 15 between the low and high frequencies;
  // however, this is not low-/high-frequency loss.
  if (isNormalMax(ac)) return 'Normal';

  let low  = getAverage(ac.slice(0, 5));
  let high = getAverage(ac.slice(-2));

  if (low - high >= 15) return 'Low-Frequency';
  if (high - low >= 15) return 'High-Frequency';
}


/*-----------------------------------*/
/*          TYPE AND DEGREE          */
/*-----------------------------------*/

/**
 * Conductive hearing loss occurs when the
 * BC test values are in the normal range
 * but the AC test values are not. The
 * Air-Bone Gap (ABG) must be > 10 db.
 * 
 * Sensorineural hearing loss occurs when the
 * AC and BC test values are within 10 dB of
 * each other at ALL test frequencies.
 * 
 * Mixed hearing loss occurs when both the
 * AC and BC thresholds show loss, but the
 * ABG is > 10 dB for all test frequencies.
 * 
 * @param {Object} instance
 * 
 * @returns {[string]}: [<type>, <degree>]
 */
function classifyTypeAndDeg(instance) {
  const freq = instance['Config'];
  const ac = Object.values(instance['AC']);
  const bc = Object.values(instance['BC']);

  const abgGreater10 = abgIsGreaterThan10(ac, bc, freq);
  const ACDeg = getDegree(getPTA(ac, freq));
  const BCDeg = getDegree(getPTA(bc, freq));


  // Conductive or Normal
  if (BCDeg === 'Normal') {
    if (ACDeg !== 'Normal' && abgGreater10) return ['Conductive', ACDeg];
    if (isNormalMax(ac)) return ['Normal', 'Normal']
  }

  // Sensorineural or Mixed.
  else if (ACDeg !== 'Normal') {
    if (BCDeg === ACDeg) return ['Sensorineural', ACDeg];

    // AC severity must be > to BC severity.
    if (HEARING_SEV_DICT[ACDeg] > HEARING_SEV_DICT[BCDeg]) {
      return ['Mixed', `AC: ${ACDeg} | BC: ${BCDeg}`];
    }
  }
}



/*************************************/
/*          DRIVER FUNCTION          */
/*************************************/

/**
 * For one ear, classifies low-/high-frequency
 * hearing loss, the degree, and the type.
 * 
 * @param {Object} instance
 * 
 * @returns {Object} instance: Labeled.
 */
function classifyOneEar(instance) {
  // Classify low-/high-frequency.
  const config = classifyFrequency(Object.values(instance['AC']));
  instance['Config'] = config || 'Normal';
  
  // Classify the type and degree.
  try {
    const [ type, degree ] = classifyTypeAndDeg(instance);
    if (type.includes('null'))   return;
    if (degree.includes('null')) return;

    instance['Type']   = type;
    instance['Degree'] = degree;

    instance['PTA'] = getPTA(Object.values(instance['AC']),
                             Object.values(instance['BC']),
                             instance['Config']);
  }
  // Invalid instance.
  catch (ignore) { return }

  return instance;
}



/********************************************/

module.exports = { classifyOneEar };