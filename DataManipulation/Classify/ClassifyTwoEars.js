/********************************************/
/*            classifyTwoEars.js            */
/*                                          */
/* Holds the data classification            */
/* functions to classify two ears.          */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   07/27/2021                      */
/********************************************/


/*************************************/
/*         HELPER FUNCTIONS          */
/*************************************/

/**
 * A `types`, `degrees`, or `freqs` array
 * always has two elements: one for the
 * left ear and one for the right ear.
 * 
 * @returns {boolean}
 */
const sameElements = arr => arr[0] === arr[1];


/**
 * If the left and right classifications
 * are different, includes 'Left' and/or
 * 'Right' in the classification string.
 * 
 * @returns {string}
 */
function simplifyClassificationStr(arr) {
  const L = arr[0];
  const R = arr[1];

  if (sameElements(arr)) return L;

  if (L === 'Normal' && R !== 'Normal') return `Right: ${R}`;
  if (L !== 'Normal' && R === 'Normal') return `Left: ${L}`;
  
  return `Left: ${L} & Right: ${R}`;
}



/*************************************/
/*  CONFIG CLASSIFICATION FUNCTIONS  */
/*************************************/

/**
 * Bilateral hearing loss occurs when
 * both ears show loss, but the severity
 * and type may be different.
 * 
 * Unilateral hearing loss occurs when
 * only one ear has hearing loss;
 * hearing in the other ear is normal.
 * 
 * @param {[string]} degrees
 * 
 * @returns {string}
 */
function classifyLateral(degrees) {
  const L = degrees[0];
  const R = degrees[1];

  if (L === 'Normal' && R === 'Normal') return;
  if (L === 'Normal' && R !== 'Normal') return 'Unilateral - Right';
  if (L !== 'Normal' && R === 'Normal') return 'Unilateral - Left';
  return 'Bilateral';
}


/** 
 * Symmetrical hearing loss occurs when each
 * ear has the same degree and configuration.
 * The PTA value for the left and right ears
 * must be within 10 dB.
 *
 * Asymmetrical hearing loss occurs when each
 * ear has a different degree and configuration.
 * The PTA value for the left and right ears
 * cannot be within 10 dB.
 * 
 * @param {[string]} degrees 
 * @param {[string]} freqs 
 * @param {integer} diffPTA 
 * 
 * @returns {string}
 */
function classifySymmetry(degrees, freqs, diffPTA) {
  // Unilateral cannot be symmetrical or asymmetrical.
  if (degrees[0] === 'Normal' || degrees[1] === 'Normal') return;

  const sameDegree = sameElements(degrees);
  const sameConfig = sameElements(freqs);

  // Asymmetrical implies different degrees or configs.
  if (diffPTA > 10) {
    if (!sameDegree) return 'Asymmetrical';
    if (!sameConfig) return 'Asymmetrical';
  }
  // Symmetrical implies same degrees and configs.
  if (sameDegree && sameConfig) return 'Symmetrical';
}


/**
 * Classifies lateral and symmetry. Returns
 * a String of all the configurations.
 * 
 * @param {[string]} degrees 
 * @param {[string]} freqs 
 * @param {integer} diffPTA 
 * 
 * @returns {string}
 */
function getConfigClassificationStr(degrees, freqs, diffPTA) {
  let config = simplifyClassificationStr(freqs);
  const configs = config === 'Normal' ? [] : [ config ];

  // Classify bilateral or unilateral.
  config = classifyLateral(degrees);
  if (config) configs.push(config);

  // Classify symmetry.
  config = classifySymmetry(degrees, freqs, diffPTA);
  if (config) configs.push(config);

  return configs.join(' | ') || 'Normal';
}



/*************************************/
/*          DRIVER FUNCTION          */
/*************************************/

/**
 * Classifies the type and degree of the left
 * ear and the right ear. If the types and
 * degrees are the same, removes 'Left' and
 * 'Right' from the final type and degree.
 * 
 * @param {Object} leftEar
 * @param {Object} rightEar
 * 
 * @returns {Object}
 */
function classifyTwoEars(leftEar, rightEar) {
  const types   = [ leftEar['Type'],   rightEar['Type'] ];
  const degrees = [ leftEar['Degree'], rightEar['Degree'] ];
  const freqs   = [ leftEar['Config'], rightEar['Config'] ];

  try {
    const diffPTA = Math.abs(leftEar['PTA'] - rightEar['PTA']);

    return {
      'Left Ear': {
        'AC': leftEar['AC'],
        'BC': leftEar['BC'],
      },
      'Right Ear': {
        'AC': rightEar['AC'],
        'BC': rightEar['BC'],
      },
      'Type': simplifyClassificationStr(types),
      'Degree': simplifyClassificationStr(degrees),
      'Configuration': getConfigClassificationStr(degrees, freqs, diffPTA)
    };
  }
  catch (ignore) { /* Invalid instance */ }
}



/********************************************/

module.exports = { classifyTwoEars };