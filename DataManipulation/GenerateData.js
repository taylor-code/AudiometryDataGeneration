/********************************************/
/*             GenerateData.js              */
/*                                          */
/* Holds the data generation functions.     */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/04/2021                      */
/********************************************/


/*************************************/
/*             CONSTANTS             */
/*************************************/

Object.freeze(HEARING_DEGREES = {
  NORMAL:          { MIN: -10,  MAX: 15  },
  SLIGHT:          { MIN:  16,  MAX: 25  },
  MILD:            { MIN:  26,  MAX: 40  },
  MODERATE:        { MIN:  41,  MAX: 55  },
  MODERATE_SEVERE: { MIN:  56,  MAX: 70  },
  SEVERE:          { MIN:  71,  MAX: 90  },
  PROFOUND:        { MIN:  91,  MAX: 100 }
});

const roundToNearest5 = (dB) => Math.round(dB / 5) * 5;



/*************************************/
/*         RANDOM FUNCTIONS          */
/*************************************/

/* 
 * getRandomInt_InRange() Function
 *
 * Generates a random integer between min and max.
 *
 * @params: min (Int) and max (Int).
 *
 * @return: an Int.
 */
function getRandomInt_InRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return roundToNearest5(Math.floor(Math.random() * (max - min) + min));
}



/*************************************/
/* HEARING TYPE GENERATION FUNCTIONS */
/*************************************/

/* 
 * generateConductive() Function
 *
 * Generates random decibel values for
 * conductive hearing loss. The bone
 * conduction (BC) values are in the
 * normal range.
 *
 * @param: otherArgs, an array of two arguments:
 *         1. min, an Int.
 *         2. max, an Int.
 *
 * @return: an Object depicting (possible)
 *          conductive hearing loss.
 */
function generateConductive(otherArgs) {
  const NORMAL_MIN = HEARING_DEGREES.NORMAL.MIN;
  const NORMAL_MAX = HEARING_DEGREES.NORMAL.MAX;
  const [min, max] = [...otherArgs];

  return {
    'Type':          'null',
    'Degree':        'null',
    'Configuration': 'null',
    'AC':             generateSet_BothEars(min, max),
    'BC':             generateSet_BothEars(NORMAL_MIN, NORMAL_MAX)
  };
}


/* 
 * generateSensorineural() Function
 *
 * Generates random decibel values
 * for sensorineural hearing loss.
 *
 * @param: otherArgs, an array.
 *
 * @return: an Object with sensorineural hearing loss.
 */
function generateSensorineural(otherArgs) {
  return undefined;
}


/*
 * getGenerationTypeFunction() Function
 *
 * @param: type, a String.
 * @return: a Function.
 */
function getGenerationTypeFunction(type) {
  const generationFunctions = {
    'conductive':    generateConductive,
    'sensorineural': generateSensorineural,
  };
  return generationFunctions[type]
}



/*************************************/
/*     DATA GENERATION FUNCTIONS     */
/*************************************/

/* 
 * generateSet_BothEars() Function
 *
 * @param: min, an Int.
 * @param: max, an Int.
 *
 * @return: a data set Object for both ears.
 */
function generateSet_BothEars(min, max) {
  return {
    'Left Ear': {
      '250 Hz':  getRandomInt_InRange(min, max),
      '500 Hz':  getRandomInt_InRange(min, max),
      '1000 Hz': getRandomInt_InRange(min, max),
      '2000 Hz': getRandomInt_InRange(min, max),
      '4000 Hz': getRandomInt_InRange(min, max),
      '8000 Hz': getRandomInt_InRange(min, max)
    },
    'Right Ear': {
      '250 Hz':  getRandomInt_InRange(min, max),
      '500 Hz':  getRandomInt_InRange(min, max),
      '1000 Hz': getRandomInt_InRange(min, max),
      '2000 Hz': getRandomInt_InRange(min, max),
      '4000 Hz': getRandomInt_InRange(min, max),
      '8000 Hz': getRandomInt_InRange(min, max)
    }
  };
}


/* 
 * generateDataSets() Function
 *
 * Generates hearing data sets.
 *
 * @param: type, a String of the hearing loss type.
 * @param: numSets, an Int of sets to create.
 * @param: otherArgs, an Array of arguments
 *         for the specific generation function.
 *
 * @return: dataArr, an Array of hearing sets.
 */
function generateDataSets(type, numSets, otherArgs) {
  let dataArr = [];
  const func = getGenerationTypeFunction(type);

  while (numSets-- > 0) dataArr.push(func(otherArgs));

  return dataArr;
}



/********************************************/

module.exports = {
  HEARING_DEGREES,
  generateDataSets
};