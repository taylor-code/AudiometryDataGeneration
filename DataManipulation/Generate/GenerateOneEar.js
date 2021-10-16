/********************************************/
/*            GenerateOneEar.js             */
/*                                          */
/* Holds the functions to generate AC       */
/* and BC test results for one ear.         */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/04/2021                      */
/********************************************/


/*************************************/
/*         IMPORTS/CONSTANTS         */
/*************************************/

const { NORMAL_MIN, NORMAL_MAX } = require('../HearingDegrees');

const roundToNearest5 = (dB) => Math.round(dB / 5) * 5;



/*************************************/
/*      RANDOM NUMBER FUNCTION       */
/*************************************/

/**
 * Generates a random integer between `min` and `max`.
 * 
 * @returns {integer}
 */
function getRandomInt_InRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return roundToNearest5(Math.floor(Math.random() * (max - min) + min));
}



/*************************************/
/*    ONE EAR GENERATION FUNCTIONS   */
/*************************************/

/**
 * Generates hearing test values for one ear with
 * no Low-Frequency or High-Frequency hearing loss.
 * 
 * @param {integer} min
 * @param {integer} max
 * 
 * @returns {Object}
 */
function generateSameFreq(min, max) {
  return {
    '250 Hz':  getRandomInt_InRange(min, max),
    '500 Hz':  getRandomInt_InRange(min, max),
    '1000 Hz': getRandomInt_InRange(min, max),
    '2000 Hz': getRandomInt_InRange(min, max),
    '4000 Hz': getRandomInt_InRange(min, max),
    '8000 Hz': getRandomInt_InRange(min, max),
  };
}


/**
 * Generates hearing test values for one
 * ear with Low-Frequency hearing loss.
 * 
 * @param {integer} min
 * @param {integer} max
 * 
 * @returns {Object}
 */
function generateLowFreq(min, max) {
  return {
    '250 Hz':  getRandomInt_InRange(min, max),
    '500 Hz':  getRandomInt_InRange(min, max),
    '1000 Hz': getRandomInt_InRange(min, max),
    '2000 Hz': getRandomInt_InRange(min, max),
    '4000 Hz': getRandomInt_InRange(NORMAL_MIN, NORMAL_MAX),
    '8000 Hz': getRandomInt_InRange(NORMAL_MIN, NORMAL_MAX),
  };
}


/**
 * Generates hearing test values for one
 * ear with High-Frequency hearing loss.
 * 
 * @param {integer} min
 * @param {integer} max
 * 
 * @returns {Object}
 */
function generateHighFreq(min, max) {
  return {
    '250 Hz':  getRandomInt_InRange(NORMAL_MIN, NORMAL_MAX),
    '500 Hz':  getRandomInt_InRange(NORMAL_MIN, NORMAL_MAX),
    '1000 Hz': getRandomInt_InRange(NORMAL_MIN, NORMAL_MAX),
    '2000 Hz': getRandomInt_InRange(NORMAL_MIN, NORMAL_MAX),
    '4000 Hz': getRandomInt_InRange(min, max),
    '8000 Hz': getRandomInt_InRange(min, max),
  };
}


const generateOneEarFuncs = {
  'Normal':         generateSameFreq,
  'Low-Frequency':  generateLowFreq,
  'High-Frequency': generateHighFreq
};



/*************************************/
/*              DRIVER               */
/*************************************/

/**
 * @param {integer} min
 * @param {integer} max
 * @param {string} freq
 * 
 * @returns {Object}
 */
function generateOneEar(min, max, freq = 'Normal') {
  return generateOneEarFuncs[freq](min, max);
}



/************************************************/

module.exports = {
  generateOneEar
};