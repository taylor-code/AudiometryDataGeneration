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
/*          RANDOM FUNCTION          */
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
/*     DATA GENERATION FUNCTIONS     */
/*************************************/

/* 
 * generateSet_BothEars() Function
 *
 * @params: min (Int) and max (Int).
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
 * @param: func, the data generation Function.
 * @param: numSets, an Int of sets to create.
 * @params: min (Int) and max (Int).
 *
 * @return: dataArr, an Array of hearing sets.
 */
function generateDataSets(func, numSets, min, max) {
  let dataArr = [];

  while (numSets-- > 0) dataArr.push(func(min, max));

  return dataArr;
}



/********************************************/

module.exports = {
  HEARING_DEGREES,
  generateSet_BothEars,
  generateDataSets
};