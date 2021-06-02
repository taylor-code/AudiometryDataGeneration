/********************************************/
/*          classifyTypeAndDeg.js           */
/*                                          */
/* Holds the data classification            */
/* function for hearing loss type (None,    */
/* Conductive, Sensorineural, and Mixed).   */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   03/20/2021                      */
/********************************************/


const { classifyCont: CC } = require('./ClassifyContainer');



/*************************************/
/*         HELPER FUNCTIONS          */
/*************************************/

/*
 * For comparison, removes 'Left:' and
 * and 'Right' from an array of strings.
 */
function removeLeftRightLabels(arr) {
  arr.map((elem, index, newArr) => {
    newArr[index] = elem.replace(/Left:|Right:/, '').trim()
  });
  return arr;
}


/*
 * A `types` or `degrees` array will always
 * have two elements: one for the left ear
 * and one for the right ear.
 */
const sameElements = arr => arr[0] === arr[1];


/*
 * If the classifications are the same, returns
 * the string without labels. Otherwise, returns
 * the string with 'Left:' and 'Right:' labels.
 */
function getClassificationStr(arr) {
  if (sameElements(arr)) return arr[0];
  return `Left: ${arr[0]} & Right: ${arr[1]}`;
}


/*
 * Checks if the left and right classifications
 * classifications are the same. If so, does
 * not include 'Left' and 'Right' labels.
 */
function simplifyTypeAndDeg(types, degrees) {
  let type, degree;

  // If one ear is normal and the other is not,
  // do not include the normal ear's information.
  if (types[0] === 'None' && types[1] !== 'None') {
    // Right ear shows hearing loss.
    type   = `Right: ${types[1]}`;
    degree = `Right: ${degrees[1]}`;
  }
  else if (types[0] !== 'None' && types[1] === 'None') {
    // Left ear shows hearing loss.
    type   = `Left: ${types[0]}`;
    degree = `Left: ${degrees[0]}`;
  }
  else {
    type   = getClassificationStr(types);
    degree = getClassificationStr(degrees);
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
    return ['Mixed', `AC: ${ACDeg} | BC: ${BCDeg}`];
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
      
      types.push(type);
      degrees.push(degree);
    }
    
    return simplifyTypeAndDeg(types, degrees);
  }
  catch (ignore) { /* Invalid data set */ }
}



/********************************************/

module.exports = { classifyTypeAndDeg };