/********************************************/
/*             GenerateType.js              */
/*                                          */
/* Holds the generation functions for       */
/* hearing loss type (None, Mixed,          */
/* Conductive, and Sensorineural).          */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   05/23/2021                      */
/********************************************/


const { generateCont: GC } = require('./GenerateContainer');
const { generateSet }      = require('./GenerateEar');



/*
 * Generates no hearing loss (None),
 * Mixed, Conductive, and Sensorineural.
 */
function generateType() {
  return {
    'AC': generateSet(GC.getNextDb(), GC.getNextDb()),
    'BC': generateSet(GC.getNextDb(), GC.getNextDb()),
  };
}



/********************************************/

module.exports = { generateType };