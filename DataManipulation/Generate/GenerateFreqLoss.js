/********************************************/
/*           GenerateFreqLoss.js            */
/*                                          */
/* Holds the generation functions           */
/* for hearing loss configuration           */
/* (low-/high-frequency).                   */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   05/17/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const { NORMAL_MIN, NORMAL_MAX } = require('../HearingDegrees');
const { generateCont: GC       } = require('./GenerateContainer');
const { generateOneEar         } = require('./GenerateOneEar');



/**************************************/
/*    CONFIG GENERATION FUNCTIONS     */
/**************************************/

/**
 * @returns {Object}
 */
function getBC() {
  if (GC.type === 'Conductive') {
    return generateOneEar(NORMAL_MIN, NORMAL_MAX);
  }
  return generateOneEar(GC.getNextDb(), GC.getNextDb(), GC.freq);
}


/**
 * Generates Unilateral, Low-Frequency,
 * or High-Frequency hearing loss.
 * 
 * @returns {Object}
 */
function generateFreqLoss() {
  return {
    'AC': generateOneEar(GC.getNextDb(), GC.getNextDb(), GC.freq),
    'BC': getBC()
  };
}



/********************************************/

module.exports = { generateFreqLoss };