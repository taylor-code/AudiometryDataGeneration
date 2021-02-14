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

Object.freeze(EAR_STRINGS = [ 'Left Ear', 'Right Ear' ]);
Object.freeze(NUM_EARS = 2);

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
/*     DATA GENERATION FUNCTIONS     */
/*************************************/

/* 
 * generateOneDataSet() Function
 *
 * Generates random decibel values for
 * frequencies. Returns an array of two
 * objects: an object for the left ear
 * and an object for the right ear.
 *
 * @param: setNo, an Int.
 * @param: min, an Int.
 * @param: max, an Int.
 *
 * @return: an Array of two Objects.
 */
function generateOneDataSet(setNo, min, max) {
  let dataArr = [];

  // Generate two data sets, one for the
  // left ear and one for the right ear.
  for (let ear = 0; ear < NUM_EARS; ear++) {
    dataArr.push({
      'Set No.':  setNo,
      'Ear':      EAR_STRINGS[ear],
      '250 Hz':   getRandomInt_Range(min, max),
      '500 Hz':   getRandomInt_Range(min, max),
      '1000 Hz':  getRandomInt_Range(min, max),
      '2000 Hz':  getRandomInt_Range(min, max),
      '4000 Hz':  getRandomInt_Range(min, max),
      '8000 Hz':  getRandomInt_Range(min, max),
      'Degree of Hearing Loss':  '',
      'Conductive':              '',
      'Sensorineural':           '',
      'High-Frequency':          '',
      'Low-Frequency':           '',
      'Asymmetrical':            ''
    })
  }

  return dataArr;
}


/* 
 * generateDataSets() Function
 *
 * Generates hearing data for really good hearing.
 *
 * @param: numSets, an Int of sets to create.
 * @param: setNo, an Int of the next set number.
 * @param: min, an Int.
 * @param: max, an Int.
 *
 * @return: dataArr, an Array of hearing sets.
 */
function generateDataSets(numSets, setNo, min, max) {
  let dataArr = [];
  let dataSet = [];

  while (numSets-- > 0) {
    dataSet = generateOneDataSet(setNo++, min, max);
    dataArr.push(dataSet[0], dataSet[1]);
  }

  return dataArr;
}



/********************************************/

module.exports = {
  HEARING_DEGREES,
  generateDataSets
};