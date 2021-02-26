/********************************************/
/*              CleanseData.js              */
/*                                          */
/* Holds functions to cleanse the data.     */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/25/2021                      */
/********************************************/


const { getDecibelValues } = require('./ClassifyData');


/* 
 * cleanseData() Function
 * 
 * Removes duplicate data objects then sorts.
 */
function cleanseData(dataObj) {
  let unique = removeDuplicates(dataObj);
  return sortDataObj(unique);
}



/**************************************/
/*     DUPLICATE REMOVAL FUNCTION     */
/**************************************/

/* 
 * removeDuplicates() Function
 * 
 * Removes duplicate objects in the array.
 * 
 * @param: data, an Array of hearing objects.
 * @return: unique, an Array of unique objects.
 */
function removeDuplicates(data) {

  const unique = [];
  const duplicates = [];

  // For each obj in data, add it to unique unless it is duplicates.
  data.forEach((current, index) => {

    if (duplicates.includes(index)) return;

    unique.push(current);

    // For each obj after this obj, see if the objects are equal.
    // The objects are equal if their decibel values are equal.
    for (let compIndex = index + 1; compIndex < data.length; compIndex++) {
      let currDecibels = JSON.stringify(getDecibelValues(current));
      let compDecibels = JSON.stringify(getDecibelValues(data[compIndex]));
      if (currDecibels === compDecibels) duplicates.push(compIndex);
    }

  });

  return unique;
}



/**************************************/
/*           SORT FUNCTIONS           */
/**************************************/

/* 
 * sortDataObj() Function
 * 
 * Sorts alphabetically by hearing degree,
 * then sorts by conductive hearing loss.
 */
function sortDataObj(dataObj) {
  return dataObj.sort((a, b) => {
    let hlDiff = sortByHLDegree(a, b);
    return hlDiff !== 0 ? hlDiff : sortByConductive(a, b);
  });
}


/* 
 * sortByHLDegree() Function
 * 
 * Sorts alphabetically by hearing degree.
 */
function sortByHLDegree(a, b) {
  return a['Degree of Hearing Loss'].localeCompare(b['Degree of Hearing Loss']);
}


/* 
 * sortByConductive() Function
 * 
 * Groups conductive data and groups sensorineural data.
 */
function sortByConductive(a, b) {
  return String(a['Conductive']).localeCompare(String(b['Conductive']));
}



/********************************************/

module.exports = { cleanseData };