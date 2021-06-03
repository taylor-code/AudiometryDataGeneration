/********************************************/
/*            ClassifyConfig.js             */
/*                                          */
/* Holds the classification functions for   */
/* hearing loss configuration (bilateral,   */
/* unilateral, symmetrical, asymmetrical,   */
/* low-frequency, and high-frequency).      */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   05/17/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const { classifyCont: CC } = require('./ClassifyContainer');
const { splitStr } = require('./ClassifyHelpers');



/*************************************/
/*         HELPER FUNCTIONS          */
/*************************************/

/*
 * Used by classifySymmetry() to determine
 * if the degrees and configs are the same.
 */
function isSame(str) {
  return !str.includes('Left') && !str.includes('Right'); 
}


/*
 * Used by classifyFrequency(). Frequency
 * loss has a 15-dB difference with the
 * normal ear.
 */
function getFreq(highLowDiff) {
  if (highLowDiff < -15) return 'Low-Frequency';
  if (highLowDiff >  15) return 'High-Frequency';
}



/*************************************/
/*  CONFIG CLASSIFICATION FUNCTIONS  */
/*************************************/

/* 
 * Bilateral hearing loss occurs when
 * both ears show loss, but the severity
 * and type may be different.
 * 
 * Unilateral hearing loss occurs when
 * only one ear has hearing loss;
 * hearing in the other ear is normal.
 */
function classifyLateral() {
  const L = CC.leftACDeg;
  const R = CC.rightACDeg;

  if (L !== 'Normal' && R !== 'Normal') return 'Bilateral';
  if (L === 'Normal' && R !== 'Normal') return 'Unilateral - Right';
  if (L !== 'Normal' && R === 'Normal') return 'Unilateral - Left';
}


/* 
 * Symmetrical hearing loss occurs when each
 * ear has the same degree and configuration.
 * The PTA value for the left and right ears
 * must be within 10 dB.
 *
 * Asymmetrical hearing loss occurs when each
 * ear has a different degree and configuration.
 * The PTA value for the left and right ears
 * cannot be within 10 dB.
 */
function classifySymmetry(degree, config) {
  const sameDegree = isSame(degree);
  const sameConfig = isSame(config);
  
  // Asymmetrical must have different degrees and configs.
  if (Math.abs(CC.leftPTA - CC.rightPTA) > 10) {
    if (!sameDegree && !sameConfig) return 'Asymmetrical';
  }
  // Symmetrical must have same degrees and configs.
  else if (sameDegree && sameConfig) return 'Symmetrical';
}


/* 
 * Low-Frequency hearing loss involves the
 * lower frequency range (125 – 2000 Hz).
 * PTA is the average of the dB values for
 * 250 Hz, 500 Hz, 1000 Hz, and 2000 Hz.
 *
 * High-Frequency hearing loss involves the
 * higher frequency range (4000 – 8000 Hz).
 * PTA is the average of the dB values for
 * 4000 Hz and 8000 Hz.
 */
function classifyFrequency() {
  // Currently, if one ear has frequency
  // hearing loss, the other one does, too.
  const leftFreq = getFreq(CC.leftDiff);
  if (leftFreq) return leftFreq;

  const rightFreq = getFreq(CC.rightDiff);
  if (rightFreq) return rightFreq;
}

// FOR UNILATERAL LOW- OR HIGH-FREQUENCY:
// function classifyFrequency() {
//   let configs = [];

//   const leftFreq = getFreq(CC.leftDiff);
//   if (leftFreq) configs.push(`Left: ${leftFreq}`);

//   const rightFreq = getFreq(CC.rightDiff);
//   if (rightFreq) configs.push(`Right: ${rightFreq}`);

//   // If one or both ears have frequency
//   // hearing loss, return the config.
//   if (configs.length) {
//     let config = configs.join(' | ');
//     const conSplit = splitStr(config);

//     // Determine if the frequencies are the same.
//     if (conSplit.length === 4) {
//       if (conSplit[1] === conSplit[3]) config = conSplit[3];
//     }

//     return config;
//   }
// }



/********************************************/

module.exports = {
  classifyLateral,
  classifySymmetry,
  classifyFrequency
};