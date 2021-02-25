/********************************************/
/*              Conductive.js               */
/*                                          */
/* Holds the conductive hearing             */
/* loss data generation functions.          */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/05/2021                      */
/********************************************/

Object.freeze(TYPE = 'conductive');

const {
  HEARING_DEGREES,
  generateDataSets
} = require('../GenerateData');


/* 
 * generateConductive() Function
 * 
 * Generates hearing data for conductive hearing loss.
 * 
 * @param: numSets, an Int of sets to create.
 * @param: nextID, an Int of the next set number.
 * @param: degree, a String of the hearing loss degree.
 *
 * @return: an Array of hearing sets.
 */
function generateConductive(numSets, nextID, degree) {
  const min = HEARING_DEGREES[degree]["MIN"];
  const max = HEARING_DEGREES[degree]["MAX"];
  
  return generateDataSets(TYPE, numSets, nextID, [min, max]);
}



/********************************************/

module.exports = { generateConductive };