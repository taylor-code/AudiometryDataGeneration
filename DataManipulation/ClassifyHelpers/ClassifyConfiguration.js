/********************************************/
/*         ClassifyConfiguration.js         */
/*                                          */
/* Holds the data classification functions  */
/* for hearing loss configuration (high-    */
/* frequency, low-frequency, bilateral,     */
/* unilateral, symmetrical, asymmetrical).  */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   03/20/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/





/*************************************/
/*     CLASSIFICATION FUNCTIONS      */
/*************************************/

/* 
 * classifyHighFrequency() Function
 *
 * High-Frequency hearing loss involves the
 * higher frequency range (4000 – 8000 Hz).
 * PTA is the average of the dB values for
 * 4000 Hz and 8000 Hz.
 *
 * @param: 
 * 
 * @return: 
 */
function classifyHighFrequency() {
  return undefined;
}


/* 
 * classifyLowFrequency() Function
 *
 * Low-Frequency hearing loss involves the
 * lower frequency range (125 – 4000 Hz).
 * PTA is the average of the dB values for
 * 250 Hz, 500 Hz, 1000 Hz, and 2000 Hz.
 *
 * @param: 
 * 
 * @return: 
 */
function classifyLowFrequency() {
  return undefined;
}


/* 
 * classifyBilateral() Function
 *
 * Bilateral hearing loss occurs when both
 * ears show hearing loss. The hearing losses
 * may not be the same type.
 *
 * @param: 
 * 
 * @return: 
 */
function classifyBilateral() {
  return undefined;
}


/* 
 * classifyUnilateral() Function
 *
 * Unilateral hearing loss occurs when only
 * one ear has hearing loss; hearing in the
 * other ear is normal.
 * 
 * Specifies Unilateral-Left or Unilateral-Right.
 *
 * @param: 
 * 
 * @return: 
 */
function classifyUnilateral() {
  return undefined;
}


/* 
 * classifySymmetrical() Function
 * 
 * Symmetrical hearing loss occurs when the
 * degree and configuration of hearing loss
 * are the same in each ear. The PTA value
 * for the left and right ears must be within
 * 10 dB of each other.
 * 
 *
 * @param: 
 * 
 * @return: 
 */
function classifySymmetrical() {
  return undefined;
}


/* 
 * classifyAsymmetrical() Function
 *
 * Asymmetrical hearing loss occurs when each
 * ear has a different degree and configuration.
 * The PTA value for the left and right ears
 * cannot be within 10 dB of each other.
 *
 * @param: 
 * 
 * @return: 
 */
function classifyAsymmetrical() {
  return undefined;
}



/********************************************/

module.exports = {
  classifyHighFrequency,
  classifyLowFrequency,
  classifyBilateral,
  classifyUnilateral,
  classifySymmetrical,
  classifyAsymmetrical
};