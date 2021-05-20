/********************************************/
/*            ClassifyConfig.js             */
/*                                          */
/* Holds the data classification functions  */
/* for hearing loss configuration           */
/* (unilateral, symmetrical, asymmetrical,  */
/* low-frequency, and high-frequency).      */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   05/17/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const {
  getDegree,
  getEarValues
} = require('./ClassifyDataHelpers');

const {
  getAverage,
  getLowHighPTA
} = require('./GetAverage');



/*************************************/
/*  CONFIG CLASSIFICATION FUNCTIONS  */
/*************************************/

/* 
 * Unilateral hearing loss occurs when
 * only one ear has hearing loss;
 * hearing in the other ear is normal.
 * 
 * Specifies 'Left' 'Right'.
 */
function classifyUnilateral(leftAC, rightAC, leftBC, rightBC) {
  let type = 'Conductive';

  // Conductive
  if (leftBC === 'Normal' && rightBC === 'Normal') {

    if (leftAC === 'Normal') {
      return ['Unilateral - Right', rightAC, type];
    }

    return ['Unilateral - Left', leftAC, type];
  }

  type = 'Sensorineural';

  // Sensorineural - Right
  if (leftAC === 'Normal' && leftBC === 'Normal') {
    return ['Unilateral - Right', rightAC, type];
  }

  if (rightAC === 'Normal' && rightBC === 'Normal') {
    return ['Unilateral - Left', leftAC, type];
  }

  return ['null', 'null', 'null'];
}


/* 
 * Symmetrical hearing loss occurs when the
 * degree and configuration of hearing loss
 * are the same in each ear. The PTA value
 * for the left and right ears must be within
 * 10 dB of each other.
 */
function classifySymmetrical() {
  return undefined;
}


/* 
 * Asymmetrical hearing loss occurs when each
 * ear has a different degree and configuration.
 * The PTA value for the left and right ears
 * cannot be within 10 dB of each other.
 */
function classifyAsymmetrical() {
  return undefined;
}


/* 
 * Low-Frequency hearing loss involves the
 * lower frequency range (125 – 4000 Hz).
 * PTA is the average of the dB values for
 * 250 Hz, 500 Hz, 1000 Hz, and 2000 Hz.
 */
function classifyLowFrequency() {
  return undefined;
}


/* 
 * High-Frequency hearing loss involves the
 * higher frequency range (4000 – 8000 Hz).
 * PTA is the average of the dB values for
 * 4000 Hz and 8000 Hz.
 */
function classifyHighFrequency(decibels) {
  const [ lowPTA, highPTA ] = getLowHighPTA(decibels);
  return highPTA - lowPTA > 10 ? 'High Frequency' : 'null';
}



/*************************************/
/*         GENERAL FUNCTIONS         */
/*************************************/

function getConfigFunction(config) {
  const configFunctions = {
    'Unilateral': classifyUnilateral
  };
  return configFunctions[config];
}


/* 
 * Classifies the degree and type of hearing loss.
 */
function classifyConfig(set, tryConfig) {

  // Get the calculation variables.
  const { leftAC, rightAC, leftBC, rightBC } = getEarValues(set);
  const leftACDeg  = getDegree(getAverage(leftAC));
  const rightACDeg = getDegree(getAverage(rightAC));
  const leftBCDeg  = getDegree(getAverage(leftBC));
  const rightBCDeg = getDegree(getAverage(rightBC));

  if (leftACDeg === 'Normal' && rightACDeg === 'Normal' &&
      leftBCDeg === 'Normal' && rightBCDeg === 'Normal') {
    return setDataSet('None', 'Normal', 'None');
  }

  // Classify the set.
  const func = getConfigFunction(tryConfig);
  const [ config, degree, type ] = func(leftACDeg, rightACDeg, leftBCDeg, rightBCDeg);

  // Set the classification qualities.
  set['Configuration'] = config;
  set['Degree']        = degree;
  set['Type']          = type;

  return set;
}



/********************************************/

module.exports = { classifyConfig };