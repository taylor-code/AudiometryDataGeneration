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

const { classifyCont: CC } = require('./ClassifyContainer');
const { getPTA, getLowHighPTA } = require('./GetAverage');



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
function classifyUnilateral() {

  // Impaired Right Ear
  if (CC.leftACDeg === 'Normal') {
    
    if (CC.rightBCDeg === 'Normal') {
      return ['Unilateral - Right', CC.rightACDeg, 'Conductive'];
    }

    return ['Unilateral - Right', CC.rightACDeg, 'Sensorineural'];
  }

  // Impaired Left Ear
  if (CC.rightACDeg === 'Normal') {

    if (CC.leftBCDeg === 'Normal') {
      return ['Unilateral - Left', CC.leftACDeg, 'Conductive'];
    }

    return ['Unilateral - Left', CC.leftACDeg, 'Sensorineural'];
  }

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
  const degree = `Left: ${CC.leftACDeg} & Right: ${CC.rightACDeg}`;
  let type = 'Sensorineural';
  let leftPTA, rightPTA;

  // For conductive hearing loss,
  // get the PTA of the AC values.
  if (CC.leftBCDeg === 'Normal' && CC.rightBCDeg === 'Normal') {
    type = 'Conductive';

    leftPTA  = getPTA(CC.leftAC);
    rightPTA = getPTA(CC.rightAC);
  }

  // For sensorineural hearing loss, get
  // the PTA of both the AC and BC values.
  else {
    leftPTA  = getPTA(CC.leftAC,  CC.leftBC);
    rightPTA = getPTA(CC.rightAC, CC.rightBC);
  }

  // The PTA values must have a difference > 10.
  if (Math.abs(leftPTA - rightPTA) <= 10) return;

  return ['Asymmetrical', degree, type];
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
function classifyHighFrequency() {
  // const [ lowPTA, highPTA ] = getLowHighPTA(decibels);
  // return highPTA - lowPTA > 10 ? 'High Frequency' : 'null';
}



/*************************************/
/*         GENERAL FUNCTIONS         */
/*************************************/

function getConfigFunction(config) {
  const configFunctions = {
    'Unilateral':     classifyUnilateral,
    'Asymmetrical':   classifyAsymmetrical,
    'Low-Frequency':  classifyLowFrequency,
    'High-Frequency': classifyHighFrequency
  };
  return configFunctions[config];
}


/* 
 * Classifies the degree and type of hearing loss.
 */
function classifyConfig(dataSet, tryConfig) {

  // Set the calculation variables.
  CC.setPropForConfig(dataSet);

  // Classify the set.
  const func = getConfigFunction(tryConfig);

  try {
    const [ config, degree, type ] = func();

    if (config.includes('null')) return;

    // Set the classification qualities.
    dataSet['Configuration'] = config;
    dataSet['Degree']        = degree;
    dataSet['Type']          = type;
  }
  // Invalid set.
  catch { return; }

  return dataSet;
}


/********************************************/

module.exports = { classifyConfig };