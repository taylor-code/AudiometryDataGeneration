/********************************************/
/*              Conductive.js               */
/*                                          */
/* Holds the conductive hearing             */
/* loss data generation functions.          */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/05/2021                      */
/********************************************/


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
 * @param: nextSetNo, an Int of the next set number.
 *
 * @return: an Array of hearing sets.
 */
function generateNormal(numSets, nextSetNo) {
  const min = HEARING_DEGREES.NORMAL.MIN;
  const max = HEARING_DEGREES.NORMAL.MAX;
  
  return generateDataSets(numSets, nextSetNo, min, max);
}


/* 
 * generateMild() Function
 * Generates hearing data for mild hearing loss.
 */
function generateMild(numSets, nextSetNo) {
  const min = HEARING_DEGREES.MILD.MIN;
  const max = HEARING_DEGREES.MILD.MAX;
  
  return generateDataSets(numSets, nextSetNo, min, max);
}


/* 
 * generateModerate() Function
 * Generates hearing data for moderate hearing loss.
 */
function generateModerate(numSets, nextSetNo) {
  const min = HEARING_DEGREES.MODERATE.MIN;
  const max = HEARING_DEGREES.MODERATE.MAX;
  
  return generateDataSets(numSets, nextSetNo, min, max);
}


/* 
 * generateModeratelySevere() Function
 * Generates hearing data for
 * moderately severe hearing loss.
 */
function generateModeratelySevere(numSets, nextSetNo) {
  const min = HEARING_DEGREES.MODERATE_SEVERE.MIN;
  const max = HEARING_DEGREES.MODERATE_SEVERE.MAX;
  
  return generateDataSets(numSets, nextSetNo, min, max);
}


/* 
 * generateSevere() Function
 * Generates hearing data for severe hearing loss.
 */
function generateSevere(numSets, nextSetNo) {
  const min = HEARING_DEGREES.SEVERE.MIN;
  const max = HEARING_DEGREES.SEVERE.MAX;
  
  return generateDataSets(numSets, nextSetNo, min, max);
}


/* 
 * generateProfound() Function
 * Generates hearing data for profound hearing loss.
 */
function generateProfound(numSets, nextSetNo) {
  const min = HEARING_DEGREES.PROFOUND.MIN;
  const max = HEARING_DEGREES.PROFOUND.MAX;
  
  return generateDataSets(numSets, nextSetNo, min, max);
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