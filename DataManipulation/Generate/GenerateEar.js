/********************************************/
/*             GenerateData.js              */
/*                                          */
/* Holds the general data generation        */
/* functions.                               */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/04/2021                      */
/********************************************/


const { NORMAL_MAX } = require('../HearingDegrees');



/*************************************/
/*             CONSTANTS             */
/*************************************/

const FREQUENCIES = ['250 Hz',  '500 Hz',  '1000 Hz',
                     '2000 Hz', '4000 Hz', '8000 Hz'];


// Low-Frequency and High-Frequency have
// different checks for invalid decibels.
const isInvalidDB = {
  'Low-Frequency':  (a, b) => { return a < b },
  'High-Frequency': (a, b) => { return a > b }
};


const roundToNearest5 = (dB) => Math.round(dB / 5) * 5;



/*************************************/
/*      RANDOM NUMBER FUNCTION       */
/*************************************/

/*
 * Generates a random integer between min and max.
 */
function getRandomInt_InRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return roundToNearest5(Math.floor(Math.random() * (max - min) + min));
}



/*************************************/
/*     DATA GENERATION FUNCTIONS     */
/*************************************/

/*
 * Generates decibels for Low-Frequency
 * and High-Frequency hearing loss.
 */
function* freqDbGenerator(low, high, min, max, change, freq) {
  // First, yield the original values.
  yield [ low, high ];

  while (true) {
    // Ensure the decibel is in a valid range.
    if (isInvalidDB[freq](low  += change, min)) low  = min;
    if (isInvalidDB[freq](high += change, max)) high = max;
    
    yield [ low, high ];
  }
}


/* 
 * Generates hearing test values for one ear with
 * Low-Frequency or High-Frequency hearing loss.
 * 
 * @param: freq, 'Low-Frequency' or 'High-Frequency'
 */
function generateOneEar_DiffFreq(degreeMin, degreeMax, freq) {
  const isLowFreq = freq === 'Low-Frequency' ? true : false;

  // Low-Frequency and High-Frequency
  // have reverse variables.
  const low  = (isLowFreq) ? degreeMin : 0;
  const high = (isLowFreq) ? degreeMax : NORMAL_MAX;
  const min  = (isLowFreq) ? 0 : degreeMin;
  const max  = (isLowFreq) ? NORMAL_MAX : degreeMax;

  let change = Math.floor(degreeMax / 6);
  if (isLowFreq) change = -change;


  // Create the data using a generator.
  const gen = freqDbGenerator(low, high, min, max, change, freq);
  let set = {};

  for (let hz of FREQUENCIES) {
    set[hz] = getRandomInt_InRange(...gen.next().value);
  }
  
  return set;
}


/* 
 * Generates hearing test values for one ear.
 */
function generateOneEar(min, max) {
  let set = {};
  for (let hz of FREQUENCIES) {
    set[hz] = getRandomInt_InRange(min, max);
  }
  return set;
}


/* 
 * Generates one data set object for both ears.
 */
function generateSet(min, max) {
  return {
    'Left Ear':  generateOneEar(min, max),
    'Right Ear': generateOneEar(min, max)
  };
}



/************************************************/

module.exports = {
  generateOneEar_DiffFreq,
  generateOneEar,
  generateSet
};