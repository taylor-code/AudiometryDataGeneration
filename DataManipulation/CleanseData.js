/********************************************/
/*              CleanseData.js              */
/*                                          */
/* Holds functions to cleanse the data.     */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/25/2021                      */
/********************************************/


let numNulls      = 0
let numDuplicates = 0


/**************************************/
/*       STATS GETTER FUNCTIONS       */
/**************************************/

const getNumberOfNulls      = () => numNulls
const getNumberOfDuplicates = () => numDuplicates



/**************************************/
/*       NULL REMOVAL FUNCTION        */
/**************************************/

/* 
 * removeNullDegrees() Function
 * 
 * Removes objects where the 'Degree' is 'null'.
 * 
 * @param: data, an Array of hearing objects.
 */
function removeNullDegrees(data) {
  const noNulls = data.filter(obj => !obj['Degree'].includes('null'));
  numNulls = data.length - noNulls.length
  return noNulls
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

  numDuplicates = duplicates.length

  return unique;
}



/**************************************/
/*           SORT FUNCTIONS           */
/**************************************/

/* 
 * sortData() Function
 * 
 * Sorts alphabetically by hearing loss
 * type, then sorts by hearing loss degree.
 */
function sortData(data) {
  return data.sort((a, b) => {
    const diff = sortByType(a, b);
    return diff !== 0 ? diff : sortByDegree(a, b);
  });
}


/* 
 * sortByType() Function
 * 
 * Sorts alphabetically by hearing loss type.
 */
function sortByType(a, b) {
  return a['Type'].localeCompare(b['Type']);
}


/* 
 * sortByDegree() Function
 * 
 * Sorts alphabetically by hearing loss degree.
 */
function sortByDegree(a, b) {
  return String(a['Degree']).localeCompare(String(b['Degree']));
}



/**************************************/
/*          CLEANSE FUNCTION          */
/**************************************/

/* 
 * cleanseData() Function
 * 
 * Removes data objects with 'null' degrees,
 * removes duplicate data objects, then sorts.
 */
function cleanseData(data) {
  const noNull = removeNullDegrees(data)
  const unique = removeDuplicates(noNull);
  return sortData(unique);
}



/********************************************/

module.exports = {
  getNumberOfNulls,
  getNumberOfDuplicates,
  cleanseData
};