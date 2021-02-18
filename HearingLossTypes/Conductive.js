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
 * generateNormal() Function
 * 
 * Generates hearing data for normal hearing.
 * 
 * @param: numSets, an Int of sets to create.
 * @param: nextID, an Int of the next set number.
 *
 * @return: an Array of hearing sets.
 */
function generateNormal(numSets, nextID) {
  const min = HEARING_DEGREES.NORMAL.MIN;
  const max = HEARING_DEGREES.NORMAL.MAX;
  
  return generateDataSets(TYPE, numSets, nextID, [min, max, "Normal"]);
}


/* 
 * generateMild() Function
 * Generates hearing data for mild hearing loss.
 */
function generateMild(numSets, nextID) {
  const min = HEARING_DEGREES.MILD.MIN;
  const max = HEARING_DEGREES.MILD.MAX;
  
  return generateDataSets(TYPE, numSets, nextID, [min, max, "Mild"]);
}


/* 
 * generateModerate() Function
 * Generates hearing data for moderate hearing loss.
 */
function generateModerate(numSets, nextID) {
  const min = HEARING_DEGREES.MODERATE.MIN;
  const max = HEARING_DEGREES.MODERATE.MAX;
  
  return generateDataSets(TYPE, numSets, nextID, [min, max, "Moderate"]);
}


/* 
 * generateModeratelySevere() Function
 * Generates hearing data for
 * moderately severe hearing loss.
 */
function generateModeratelySevere(numSets, nextID) {
  const min = HEARING_DEGREES.MODERATE_SEVERE.MIN;
  const max = HEARING_DEGREES.MODERATE_SEVERE.MAX;
  
  return generateDataSets(TYPE, numSets, nextID, [min, max, "Moderately-Severe"]);
}


/* 
 * generateSevere() Function
 * Generates hearing data for severe hearing loss.
 */
function generateSevere(numSets, nextID) {
  const min = HEARING_DEGREES.SEVERE.MIN;
  const max = HEARING_DEGREES.SEVERE.MAX;
  
  return generateDataSets(TYPE, numSets, nextID, [min, max, "Severe"]);
}


/* 
 * generateProfound() Function
 * Generates hearing data for profound hearing loss.
 */
function generateProfound(numSets, nextID) {
  const min = HEARING_DEGREES.PROFOUND.MIN;
  const max = HEARING_DEGREES.PROFOUND.MAX;
  
  return generateDataSets(TYPE, numSets, nextID, [min, max, "Profound"]);
}



/********************************************/

module.exports = {
  generateNormal,
  generateMild,
  generateModerate,
  generateModeratelySevere,
  generateSevere,
  generateProfound
};