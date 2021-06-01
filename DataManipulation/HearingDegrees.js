/********************************************/
/*            HearingDegrees.js             */
/*                                          */
/* Holds the hearing degrees.               */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   05/29/2021                      */
/********************************************/


/*************************************/
/*             CONSTANTS             */
/*************************************/

const HEARING_DEGREES = {
  'Normal':            { MIN: -10,  MAX: 15  },
  'Slight':            { MIN:  16,  MAX: 25  },
  'Mild':              { MIN:  26,  MAX: 40  },
  'Moderate':          { MIN:  41,  MAX: 55  },
  'Moderately-Severe': { MIN:  56,  MAX: 70  },
  'Severe':            { MIN:  71,  MAX: 90  },
  'Profound':          { MIN:  91,  MAX: 100 }
};

const NORMAL_MIN = HEARING_DEGREES.Normal.MIN;
const NORMAL_MAX = HEARING_DEGREES.Normal.MAX;



/*************************************/
/*         DEGREE FUNCTIONS          */
/*************************************/


// Returns true if x is between min and max.
const isInRange = (x, min, max) => (x - min) * (x - max) <= 0;


/*
 * Uses the hearing degrees maxes and mins to
 * determine the hearing loss severity (degree).
 */
function getDegree(dB) {
  // Shorter names for readability:
  const HD = HEARING_DEGREES;
  const MOD_SEV = 'Moderately-Severe';

  if (isInRange(dB, HD.Normal.MIN,   HD.Normal.MAX))   return 'Normal';
  if (isInRange(dB, HD.Slight.MIN,   HD.Slight.MAX))   return 'Slight';
  if (isInRange(dB, HD.Mild.MIN,     HD.Mild.MAX))     return 'Mild';
  if (isInRange(dB, HD.Moderate.MIN, HD.Moderate.MAX)) return 'Moderate';
  if (isInRange(dB, HD[MOD_SEV].MIN, HD[MOD_SEV].MAX)) return 'Moderately-Severe';
  if (isInRange(dB, HD.Severe.MIN,   HD.Severe.MAX))   return 'Severe';
  if (isInRange(dB, HD.Profound.MIN, HD.Profound.MAX)) return 'Profound';
  return 'null';
}


function getMinMaxArr(degrees) {
  let minMax = [];

  for (let degree of degrees) {
    // Round the min to the next multiple of 5.
    minMax.push(Math.ceil(HEARING_DEGREES[degree]['MIN'] / 5) * 5);
    minMax.push(HEARING_DEGREES[degree]['MAX'])
  }

  return minMax;
}



/************************************************/

module.exports = {
  NORMAL_MIN,
  NORMAL_MAX,
  getDegree,
  getMinMaxArr
};