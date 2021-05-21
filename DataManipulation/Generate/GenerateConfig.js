/********************************************/
/*            GenerateConfig.js             */
/*                                          */
/* Holds the data generation functions      */
/* for hearing loss configuration           */
/* (unilateral, asymmetrical,               */
/* low-frequency, and high-frequency).      */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   05/17/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const {
  HEARING_DEGREES,
  generateOneEar,
  generateSet
} = require('./GenerateHelpers');



/**************************************/
/* CONFIGURATION GENERATION FUNCTIONS */
/**************************************/

/* 
 * Generates Conductive data: Unilateral or Asymmetrical.
 */
function generateDiffEars_Cond({ min1: minL, max1: maxL,
                                 min2: minR, max2: maxR })
{
  const NORMAL_MIN = HEARING_DEGREES.NORMAL.MIN;
  const NORMAL_MAX = HEARING_DEGREES.NORMAL.MAX;

  return {
    'AC': {
      'Left Ear': generateOneEar(minL, maxL),
      'Right Ear': generateOneEar(minR, maxR)
    },
    'BC': generateSet(NORMAL_MIN, NORMAL_MAX)
  };
}


/* 
 * Generates Sensorineural data: Unilateral or Asymmetrical.
 */
function generateDiffEars_Sens({ min1: minL, max1: maxL,
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
* Generates low-frequency hearing loss data.
*/
function generateLowFrequency() {
  return undefined;
}


/* 
 * Generates high-frequency hearing loss data.
 */
function generateHighFrequency() {
  return undefined;
}



/*************************************/
/*         GENERAL FUNCTION          */
/*************************************/

function getGenerationConfigFunc(key) {
  const generationFunctions = {
    'Unilateral_Conductive':      generateDiffEars_Cond,
    'Unilateral_Sensorineural':   generateDiffEars_Sens,
    'Asymmetrical_Conductive':    generateDiffEars_Cond,
    'Asymmetrical_Sensorineural': generateDiffEars_Sens,
    'Low-Frequency':              generateLowFrequency,
    'High-Frequency':             generateHighFrequency
  };
  return generationFunctions[key];
}



/********************************************/

module.exports = { getGenerationConfigFunc };