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

/**
 * Removes duplicate objects in the array.
 * 
 * @param {[Object]} data: PTA hearing test objects.
 * 
 * @returns {[Object]} unique: The unique objects in data.
 */
function removeDuplicates(data) {
  const unique     = [];
  const duplicates = [];

  // For each object in `data`, add it to
  // `unique` unless it is in `duplicates`.
  for (let i = 0; i < data.length; i++) {

    if (duplicates.includes(i)) continue;

    const current = data[i];
    unique.push(current);

    // For each instance after `current`,
    // check if the decibel values are equal.
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

/**
 * Returns whether the decibel values
 * are the equal and in the same order.
 * 
 * @param {Object} obj1
 * @param {Object} obj2
 * 
 * @returns {boolean} True if `obj2`
 *          is a duplicate of `obj1`.
 */
function dbAreEqual(obj1, obj2) {
  for (const ear of ['Left Ear', 'Right Ear']) {
    for (const test of ['AC', 'BC']) {
      const arr1 = Object.values(obj1[ear][test]);
      const arr2 = Object.values(obj2[ear][test]);
      
      // Short-circuit if these two dBs are unequal.
      for (let i = 0; i < 6; i++) {
        if (arr1[i] !== arr2[i]) return false
      }
    }
  }

  return true;
}


/**
 * Creates a dictionary of key-value pairs.
 * The key is Type_Degree_Configuration.
 * The value is an array of hearing instances.
 * 
 * @param {[Object]} data
 * 
 * @returns {Object} hearingDict
 */
function getKeyValueHearingDict(data) {
  const hearingDict = {};

  for (const datum of data) {
    const key = `${datum['Type']}_${datum['Degree']}_${datum['Configuration']}`;

    if (!(key in hearingDict)) hearingDict[key] = [];
    hearingDict[key].push(datum);
  }

  return hearingDict;
}


/**
 * Deletes classes with less than 3 instances.
 * This improves the machine learning model's
 * macro- metrics.
 * 
 * @param {Object} hearingDict
 * 
 * @returns {Object} hearingDict: Filtered.
 */
function normalizeClassDistribution(hearingDict) {
  return Object.keys(hearingDict).reduce((filtered, key) => {
    if (hearingDict[key].length > 3) filtered[key] = hearingDict[key];
    return filtered;
  }, {});
}


/**
 * Separates the instances into three arrays:
 *   1. Puts 1 instance into `testData`.
 *   2. Puts the rest into `trainData`.
 *   3. Moves three instances from `trainData` to `predData`.
 * 
 * @param {Object} hearingDict
 * 
 * @returns {[[Object]]} An array of the three arrays.
 */
function separateData(hearingDict) {
  const NUM_PRED_INSTANCES = 3;

  let predData  = [];
  let testData  = [];
  let trainData = [];

  for (const instances of Object.values(hearingDict)) {
    testData  = testData.concat(instances.splice(0, 1));
    trainData = trainData.concat(instances);
  }

  // Move three instances to `predData`.
  for (let i = 0; i < NUM_PRED_INSTANCES; i++) {
    const index = Math.floor(Math.random() * (trainData.length - i));
    predData = predData.concat(trainData.splice(index, 1));
  }

  return [ predData, testData, trainData ];
}



/**************************************/
/*          CLEANSE FUNCTION          */
/**************************************/

/**
 * To accelerate the duplicate removal process,
 * groups the data by a Type_Degree_Config key.
 * Removes duplicates for each of the groups.
 * 
 * @param {[Object]} data: PTA hearing test objects.
 * 
 * @returns {[Object]} Cleansed data.
 */
function cleanseData(data) {
  let hearingDict = getKeyValueHearingDict(data);
  hearingDict = normalizeClassDistribution(hearingDict);
  
  for (const key of Object.keys(hearingDict)) {
    hearingDict[key] = removeDuplicates(hearingDict[key]);
  }

  return separateData(hearingDict);
}



/*************************************************/

module.exports = { getNumDuplicates, cleanseData };