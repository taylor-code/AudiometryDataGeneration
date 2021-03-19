/********************************************/
/*              CleanseData.js              */
/*                                          */
/* Holds functions to cleanse the data.     */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/25/2021                      */
/********************************************/


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
      const currValues = JSON.stringify(current);
      const compValues = JSON.stringify(data[compIndex]);
      if (currValues === compValues) duplicates.push(compIndex);
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
    let diff = sortByDegree(a, b);
    return diff !== 0 ? diff : sortByType(a, b);
  });
}


/* 
 * sortByDegree() Function
 * 
 * Sorts alphabetically by hearing degree.
 */
function sortByDegree(a, b) {
  return a['Degree'].localeCompare(b['Degree']);
}


/* 
 * sortByType() Function
 * 
 * Groups conductive data and groups sensorineural data.
 */
function sortByType(a, b) {
  return String(a['Type']).localeCompare(String(b['Type']));
}



/********************************************/

module.exports = { cleanseData };