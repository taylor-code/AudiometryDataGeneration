/********************************************/
/*             GenerateData.js              */
/*                                          */
/* Holds the general data generation        */
/* functions.                               */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/04/2021                      */
/********************************************/


const { deepFreeze } = require('../../Utility/Utility');

const roundToNearest5 = (dB) => Math.round(dB / 5) * 5;



/*************************************/
/*          HEARING DEGREES          */
/*************************************/

HEARING_DEGREES = {
  NORMAL:          { MIN: -10,  MAX: 15  },
  SLIGHT:          { MIN:  16,  MAX: 25  },
  MILD:            { MIN:  26,  MAX: 40  },
  MODERATE:        { MIN:  41,  MAX: 55  },
  MODERATE_SEVERE: { MIN:  56,  MAX: 70  },
  SEVERE:          { MIN:  71,  MAX: 90  },
  PROFOUND:        { MIN:  91,  MAX: 100 }
};

// Prevent modification of this object.
deepFreeze(HEARING_DEGREES);


function getMinMaxArr(degrees) {
  let minMax = {
    min1: HEARING_DEGREES[degrees[0]]['MIN'],
    max1: HEARING_DEGREES[degrees[0]]['MAX']
  };

  // For generating mixed hearing loss:
  if (degrees.length === 2) {
    minMax['min2'] = HEARING_DEGREES[degrees[1]]['MIN'];
    minMax['max2'] = HEARING_DEGREES[degrees[1]]['MAX'];
  }

  return minMax;
}



/*************************************/
/*          RANDOM FUNCTION          */
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
 * Generates hearing test values for one ear.
 */
function generateOneEar(min, max) {
  return {
    '250 Hz':  getRandomInt_InRange(min, max),
    '500 Hz':  getRandomInt_InRange(min, max),
    '1000 Hz': getRandomInt_InRange(min, max),
    '2000 Hz': getRandomInt_InRange(min, max),
    '4000 Hz': getRandomInt_InRange(min, max),
    '8000 Hz': getRandomInt_InRange(min, max)
  };
}


/* 
 * Generates one data set Object for both ears.
 */
function generateSet(min, max) {
  return {
    'Left Ear':  generateOneEar(min, max),
    'Right Ear': generateOneEar(min, max)
  };
}



/************************************************/

module.exports = {
  HEARING_DEGREES,
  getMinMaxArr,
  generateOneEar,
  generateSet
};