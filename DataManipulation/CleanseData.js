/********************************************/
/*              CleanseData.js              */
/*                                          */
/* Holds functions to cleanse the data.     */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/25/2021                      */
/********************************************/


/**************************************/
/*        VARIABLES/CONSTANTS         */
/**************************************/

let numDuplicates = 0;

const getNumDuplicates = () => numDuplicates;



/**************************************/
/*     DUPLICATE REMOVAL FUNCTION     */
/**************************************/

/* 
 * Removes duplicate objects in the array.
 * 
 * @param: data, an Array of hearing objects.
 * @return: unique, an Array of unique objects.
 */
function removeDuplicates(data) {
  let unique     = [];
  let duplicates = [];
  
  let current;

  // For each obj in data, add it to
  // unique unless it is in duplicates.
  for (let i = 0; i < data.length; i++) {

    if (duplicates.includes(i)) continue;

    current = data[i];
    unique.push(current);

    // For each instance after current, check
    // if the decibel values are equal.
    for (let compI = i + 1; compI < data.length; compI++) {
      if (dbAreEqual(current, data[compI])) duplicates.push(compI);
    }
  }
  
  if (duplicates.length) numDuplicates += duplicates.length;

  return unique;
}



/**************************************/
/*          HELPER FUNCTIONS          */
/**************************************/

/*
 * Returns whether the decibel values
 * are the equal and in the same order.
 */
function dbAreEqual(obj1, obj2) {
  for (let ear of ['Left Ear', 'Right Ear']) {
    for (let test of ['AC', 'BC']) {
      let arr1 = Object.values(obj1[ear][test]);
      let arr2 = Object.values(obj2[ear][test]);
      
      // Short-circuit if these two dBs are unequal.
      for (let i = 0; i < 6; i++) {
        if (arr1[i] !== arr2[i]) return false
      }
    }
  }

  return true;
}


/* 
 * Creates a dictionary of key-value pairs.
 * The key is Type_Degree_Configuration.
 * The value is an array of hearing instances.
 */
function getKeyValueHearingSets(data) {
  let hearingSets = {};
  let key;

  for (let datum of data) {
    key = `${datum['Type']}_${datum['Degree']}_${datum['Configuration']}`;
    if (!(key in hearingSets)) hearingSets[key] = [];
    
    // To improve the model's macro-accuracy,
    // the number of instances per key are limited.
    if (hearingSets[key].length < 4) hearingSets[key].push(datum);
  }

  return hearingSets;
}


/* 
 * Separates the instances into two arrays.
 * Puts 60% of the instances into `trainData`,
 * and 40% into `testData`. Moves three
 * instances from `testData` to `predData`.
 */
function separateData(hearingSets) {
  const NUM_PRED_INSTANCES = 3;

  let predData  = [];
  let testData  = [];
  let trainData = [];

  let separator;
  for (let value of Object.values(hearingSets)) {
    separator = Math.round(value.length / 8);

    testData  = testData.concat(value.splice(0, separator));
    trainData = trainData.concat(value);
  }

  // Move some instances to `predData.`
  for (let i = 0; i < NUM_PRED_INSTANCES; i++) {
    let index = Math.floor(Math.random() * (testData.length - i));
    predData = predData.concat(testData.splice(index, 1));
  }

  return [ predData, testData, trainData ];
}



/**************************************/
/*          CLEANSE FUNCTION          */
/**************************************/

/* 
 * To accelerate the duplicate removal process,
 * groups the data by a Type_Degree_Config key.
 * Removes duplicates for each of the groups.
 */
function cleanseData(data) {
  let hearingSets = getKeyValueHearingSets(data);
  
  for (let key of Object.keys(hearingSets)) {
    hearingSets[key] = removeDuplicates(hearingSets[key]);
  }

  return separateData(hearingSets);
}



/*************************************************/

module.exports = { getNumDuplicates, cleanseData };