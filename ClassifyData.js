/********************************************/
/*             ClassifyData.js              */
/*                                          */
/* Holds the data classification functions. */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/04/2021                      */
/********************************************/


/* 
 * () Function
 *
 * 
 *
 * @param: 
 * 
 * @return: 
 */
function classifyHearingLossDegree() {
  /*
  Hearing within normal limits: 0 – 20 decibels (dB)
  Mild hearing loss: 20 – 40 dB
  Moderate hearing loss: 40 – 55 dB
  Moderately-severe hearing loss: 55 – 70 dB
  Severe hearing loss: 70 – 90 dB
  Profound hearing loss: 90+ dB
  */
  return undefined;
}


/* 
 * () Function
 *
 * 
 *
 * @param: 
 * 
 * @return: 
 */
function classifyConductive() {
  return undefined;
}


/* 
 * () Function
 *
 * 
 *
 * @param: 
 * 
 * @return: 
 */
function classifySensorineural() {
  return undefined;
}


/* 
 * () Function
 *
 * 
 *
 * @param: 
 * 
 * @return: 
 */
function classifyHighFrequency() {
  return undefined;
}


/* 
 * () Function
 *
 * 
 *
 * @param: 
 * 
 * @return: 
 */
function classifyLowFrequency() {
  return undefined;
}



/********************************************/

module.exports = {
  classifyHearingLossDegree,
  classifyConductive,
  classifySensorineural,
  classifyHighFrequency,
  classifyLowFrequency
};