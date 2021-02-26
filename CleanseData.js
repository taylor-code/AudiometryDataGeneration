/********************************************/
/*              CleanseData.js              */
/*                                          */
/* Holds functions to cleanse the data.     */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/26/2021                      */
/********************************************/


const { getDecibelValues } = require('./ClassifyData');


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


function sortByHLDegree(dataObj) {
  return dataObj.sort((a, b) => {
    return a['Degree of Hearing Loss'].localeCompare(b['Degree of Hearing Loss']);
  }).sort((a, b) => {
    return a['Conductive'] > b['Conductive'];
  });
}


function cleanseData(dataObj) {
  let unique = removeDuplicates(dataObj);

  // Sort alphabetically by hearing degree.
  return sortByHLDegree(unique);
}



/********************************************/

module.exports = { cleanseData };