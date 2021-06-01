/********************************************/
/*            GenerateConfig.js             */
/*                                          */
/* Holds the generation functions           */
/* for hearing loss configuration           */
/* (unilateral, asymmetrical,               */
/* low-frequency, and high-frequency).      */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   05/17/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const { NORMAL_MIN, NORMAL_MAX } = require('../HearingDegrees');
const { generateCont: GC }       = require('./GenerateContainer');

const {
  generateOneEar_DiffFreq,
  generateOneEar,
  generateSet
} = require('./GenerateEar');



/**************************************/
/*    CONFIG GENERATION FUNCTIONS     */
/**************************************/

function getBC(generateFunc) {
  if (GC.type === 'Conductive') {
    return generateSet(NORMAL_MIN, NORMAL_MAX);
  }
  return {
    'Left Ear':  generateFunc(GC.getNextDb(), GC.getNextDb(), GC.freq),
    'Right Ear': generateFunc(GC.getNextDb(), GC.getNextDb(), GC.freq)
  };
}


const generateOneEarFuncs = {
  'Unilateral':     generateOneEar,
  'Low-Frequency':  generateOneEar_DiffFreq,
  'High-Frequency': generateOneEar_DiffFreq
};


/*
 * Generates Unilateral, Asymmetrical,
 * Low-Frequency, or High-Frequency.
 */
function generateConfig() {
  const generateFunc = generateOneEarFuncs[GC.config];
  return {
    'AC': {
      'Left Ear':  generateFunc(GC.getNextDb(), GC.getNextDb(), GC.freq),
      'Right Ear': generateFunc(GC.getNextDb(), GC.getNextDb(), GC.freq)
    },
    'BC': getBC(generateFunc)
  };
}



/********************************************/

module.exports = { generateConfig };