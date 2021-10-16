/********************************************/
/*             GenerateType.js              */
/*                                          */
/* Holds the generation functions for       */
/* hearing loss type (Normal, Mixed,        */
/* Conductive, and Sensorineural).          */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   05/23/2021                      */
/********************************************/


const { generateCont: GC } = require('./GenerateContainer');
const { generateOneEar   } = require('./GenerateOneEar');


/**
 * Generates no hearing loss (Normal),
 * Mixed, Conductive, or Sensorineural.
 * 
 * @returns {Object}
 */
function generateType() {
  return {
    'AC': generateOneEar(GC.getNextDb(), GC.getNextDb()),
    'BC': generateOneEar(GC.getNextDb(), GC.getNextDb()),
  };
}



/********************************************/

module.exports = { generateType };