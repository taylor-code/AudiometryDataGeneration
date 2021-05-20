/********************************************/
/*            GenerateConfig.js             */
/*                                          */
/* Holds the data generation functions      */
/* for hearing loss configuration           */
/* (unilateral, symmetrical, asymmetrical,  */
/* low-frequency, and high-frequency).      */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   05/17/2021                      */
/********************************************/


/*************************************/
/*         IMPORTS/CONSTANTS         */
/*************************************/

const {
  HEARING_DEGREES,
  generateOneEar,
  generateSet
} = require('./GenerateHelpers');

const NORMAL_MIN = HEARING_DEGREES.NORMAL.MIN;
const NORMAL_MAX = HEARING_DEGREES.NORMAL.MAX;



/**************************************/
/* CONFIGURATION GENERATION FUNCTIONS */
/**************************************/

/* 
 * Generates Unilateral Sensorineural data.
 */
function generateUniSens({ min1: minL, max1: maxL,
                           min2: minR, max2: maxR })
{
  return {
    'AC': {
      'Left Ear':  generateOneEar(minL, maxL),
      'Right Ear': generateOneEar(minR, maxR)
    },
    'BC': {
      'Left Ear':  generateOneEar(minL, maxL),
      'Right Ear': generateOneEar(minR, maxR)
    }
  };
}


/* 
 * Generates Unilateral Conductive data.
 */
function generateUniCond({ min1: minL, max1: maxL,
                           min2: minR, max2: maxR })
{
  return {
    'AC': {
      'Left Ear':  generateOneEar(minL, maxL),
      'Right Ear': generateOneEar(minR, maxR)
    },
    'BC': generateSet(NORMAL_MIN, NORMAL_MAX)
  };
}


/* 
 * Symmetrical hearing loss occurs when the
 * degree and configuration of hearing loss
 * are the same in each ear. The PTA value
 * for the left and right ears must be within
 * 10 dB of each other.
 */
function generateSymmetrical() {
  return undefined;
}


/* 
 * Asymmetrical hearing loss occurs when each
 * ear has a different degree and configuration.
 * The PTA value for the left and right ears
 * cannot be within 10 dB of each other.
 */
function generateAsymmetrical() {
  return undefined;
}


/* 
* Low-Frequency hearing loss involves the
* lower frequency range (125 – 4000 Hz).
* PTA is the average of the dB values for
* 250 Hz, 500 Hz, 1000 Hz, and 2000 Hz.
*/
function generateLowFrequency() {
  return undefined;
}


/* 
 * High-Frequency hearing loss involves the
 * higher frequency range (4000 – 8000 Hz).
 * PTA is the average of the dB values for
 * 4000 Hz and 8000 Hz.
 */
function generateHighFrequency() {
  return undefined;
}



/*************************************/
/*         GENERAL FUNCTION          */
/*************************************/

function getGenerationConfigFunc(key) {
  const generationFunctions = {
    'Unilateral_Conductive':    generateUniCond,
    'Unilateral_Sensorineural': generateUniSens,
    'Symmetrical':              generateSymmetrical,
    'Asymmetrical':             generateAsymmetrical,
    'Low-Frequency':            generateLowFrequency,
    'High-Frequency':           generateHighFrequency
  };
  return generationFunctions[key];
}



/********************************************/

module.exports = { getGenerationConfigFunc };