/********************************************/
/*              CleanseData.js              */
/*                                          */
/* Holds functions to cleanse the data.     */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/25/2021                      */
/********************************************/


let numDuplicates = 0

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
  const unique     = [];
  const duplicates = [];
  
  let current;

  // For each obj in data, add it to
  // unique unless it is in duplicates.
  for (let i = 0; i < data.length; i++) {

    if (duplicates.includes(i)) return;

    current = data[i];
    unique.push(current);

    // For each set after current, check
    // if the decibel values are equal.
    for (let compI = i + 1; compI < data.length; compI++) {
      if (dbAreEqual(current, data[compI])) duplicates.push(compI);
    }
  }

  numDuplicates += duplicates.length;

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
  for (let test of ['AC', 'BC']) {
    for (let ear of ['Left Ear', 'Right Ear']) {
      let arr1 = Object.values(obj1[test][ear]);
      let arr2 = Object.values(obj2[test][ear]);
      
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
 * The value is an array of hearing sets.
 */
function getKeyValueHearingSets(data) {
  let hearingSets = {};
  let key;

  for (let datum of data) {
    key = `${datum['Type']}_${datum['Degree']}_${datum['Configuration']}`;
    if (!(key in hearingSets)) hearingSets[key] = [];
    hearingSets[key].push(datum);
  }

  return hearingSets;
}


/* 
 * Separates the sets into two arrays.
 * Puts 90% of the sets into `trainData`,
 * and 10% into `testData`.
 */
function separateTrainAndTestData(hearingSets) {
  let testData  = [];
  let trainData = [];
  
  let separator;
  for (let value of Object.values(hearingSets)) {
    separator = Math.round(value.length / 10);

    testData  = testData.concat(value.splice(0, separator));
    trainData = trainData.concat(value);
  }

  return [ testData, trainData ];
}



/**************************************/
/*          CLEANSE FUNCTION          */
/**************************************/

/* 
 * To speed up the duplicate removal process,
 * groups the data by Type and Degree. Removes
 * duplicates for each of the groups.
 */
function cleanseData(data) {
  let hearingSets = getKeyValueHearingSets(data);
  
  for (let key of Object.keys(hearingSets)) {
    hearingSets[key] = removeDuplicates(hearingSets[key]);
  }

  return separateTrainAndTestData(hearingSets);
}



/*************************************************/

module.exports = { getNumDuplicates, cleanseData };