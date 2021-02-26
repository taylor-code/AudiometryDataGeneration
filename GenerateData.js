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
  NORMAL:          { MIN: 0,   MAX: 20 },
  MILD:            { MIN: 21,  MAX: 40 },
  MODERATE:        { MIN: 41,  MAX: 55 },
  MODERATE_SEVERE: { MIN: 56,  MAX: 70 },
  SEVERE:          { MIN: 71,  MAX: 90 },
  PROFOUND:        { MIN: 91,  MAX: 100 }
});

const roundToNearest5 = (dB) => Math.round(dB / 5) * 5;



/*************************************/
/*         RANDOM FUNCTIONS          */
/*************************************/

/* 
 * getRandomInt_Range() Function
 *
 * Generates a random integer between min and max.
 *
 * @param: min, an Int.
 * @param: max, an Int.
 *
 * @return: an Int.
 */
function getRandomInt_Range(min, max) {
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
 * Generates random decibel values
 * for conductive hearing loss.
 *
 * @param: otherArgs, an array of two arguments:
 *         1. min, an Int.
 *         2. max, an Int.
 *
 * @return: an Object with (possible)
 *          conductive hearing loss.
 */
function generateConductive(otherArgs) {
  let [min, max] = [...otherArgs];

  return {
    '250 Hz':                  getRandomInt_Range(min, max),
    '500 Hz':                  getRandomInt_Range(min, max),
    '1000 Hz':                 getRandomInt_Range(min, max),
    '2000 Hz':                 getRandomInt_Range(min, max),
    '4000 Hz':                 getRandomInt_Range(min, max),
    '8000 Hz':                 getRandomInt_Range(min, max),
    'Degree of Hearing Loss':  null,
    'Conductive':              null,
    'Sensorineural':           null,
    'High-Frequency':          null,
    'Low-Frequency':           null,
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
 * generateOneEarSet() Function
 *
 * Generates random decibel values.
 * Returns a data set for one ear.
 *
 * @param: type, a String of the hearing loss type.
 * @param: otherArgs, an Array of arguments
 *         for the specific generation function.
 *
 * @return: an Object with hearing data.
 */
function generateOneEarSet(type, otherArgs) {
  let func = getGenerationTypeFunction(type);
  return func(otherArgs);
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

  while (numSets-- > 0) {
    dataArr.push(generateOneEarSet(type, otherArgs));
  }

  return dataArr;
}



/********************************************/

module.exports = {
  HEARING_DEGREES,
  generateDataSets
};