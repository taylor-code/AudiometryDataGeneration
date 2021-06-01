/********************************************/
/*          classifyTypeAndDeg.js           */
/*                                          */
/* Holds the data classification            */
/* function for hearing loss type (None,    */
/* (Conductive, Sensorineural, and Mixed).  */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   03/20/2021                      */
/********************************************/


const { classifyCont: CC } = require('./ClassifyContainer');
const { splitStr } = require('./ClassifyHelpers');



/*
 * Removes 'Left' and 'Right' from
 * the type and/or degree if unneeded.
 */
function simplifyTypeAndDeg(types, degrees) {
  let type   = types.join(' | ');
  let degree = degrees.join(' | ');
    
  const typeSplit = splitStr(type);
  const degSplit  = splitStr(degree);


  // If the classifications are the
  // same, remove 'Left' and 'Right'.
  if (typeSplit[1] === typeSplit[3]) type = typeSplit[1];
  if (degSplit[1] === degSplit[3]) degree = degSplit[1];


  // If one ear is normal and the other is not,
  // do not include the normal ear's information.
  else if (typeSplit[1] === 'None' && typeSplit[3] !== 'None') {
    // Right ear shows hearing loss.
    type   = types[1];
    degree = degrees[1];
  }
  else if (typeSplit[1] !== 'None' && typeSplit[3] === 'None') {
    // Left ear shows hearing loss.
    type   = types[0];
    degree = degrees[0];
  }
  

  return [ type, degree ];
} 



/*************************************/
/*         CLASSIFY FUNCTION         */
/*************************************/

/* 
 * Conductive hearing loss occurs when the
 * BC test values are in the normal range
 * but the AC test values are not. The
 * Air-Bone Gap (ABG) must be > 10 db.
 * 
 * Sensorineural hearing loss occurs when the
 * AC and BC test values are within 10 dB of
 * each other at ALL test frequencies.
 * 
 * Mixed hearing loss occurs when both the
 * AC and BC thresholds show loss, but the
 * ABG is > 10 dB for all test frequencies.
 */
function getTypeAndDeg(BCDeg, ACDeg, abgGreater10) {
  // No hearing loss (None) or Conductive.
  if (BCDeg === 'Normal') {
    if (ACDeg === 'Normal' && !abgGreater10) return ['None', 'Normal'];
    if (ACDeg !== 'Normal' &&  abgGreater10) return ['Conductive', ACDeg];
  }

  // Sensorineural or Mixed.
  else if (ACDeg !== 'Normal') {
    if (BCDeg === ACDeg) return ['Sensorineural', ACDeg];
    return ['Mixed', `AC - ${ACDeg}, BC - ${BCDeg}`];
  }
}



/*************************************/
/*          DRIVER FUNCTION          */
/*************************************/

/*
 * Classifies the type and degree of the left
 * ear and the right ear. If the types and
 * degrees are the same, removes 'Left' and
 * 'Right' from the final type and degree.
 */
function classifyTypeAndDeg() {
  let types   = [];
  let degrees = [];

  try {
    const infos = {
      'Left':  [ CC.leftBCDeg,  CC.leftACDeg,  CC.abgGreater10_left  ],
      'Right': [ CC.rightBCDeg, CC.rightACDeg, CC.abgGreater10_right ]
    }

    // Classify the type and degree of each ear.
    for (let ear of [ 'Left', 'Right' ]) {
      const [ type, degree ] = getTypeAndDeg(...infos[ear]);
      
      types.push(`${ear}: ${type}`);
      degrees.push(`${ear}: ${degree}`);
    }
    
    return simplifyTypeAndDeg(types, degrees);
  }
  catch (ignore) { /* Invalid data set */ }
}



/********************************************/

module.exports = { classifyTypeAndDeg };