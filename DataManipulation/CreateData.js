/********************************************/
/*              CreateData.js               */
/*                                          */
/* Holds the functions to generate          */
/* and classify data.                       */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   04/15/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const { classifyTwoEars } = require('./Classify/ClassifyTwoEars');
const { generate        } = require('./Generate/GenerateData');



/*************************************/
/*    INSTANCE CREATION FUNCTIONS     */
/*************************************/

/*
 * Generates instances with same frequency,
 * low-frequency, and high-frequency hearing
 * loss with the given `degrees` and `type`.
 */
function createFrequencies(degrees, type) {
  return [].concat(generate(degrees, type),
                   generate(degrees, type, 'Low-Frequency'),
                   generate(degrees, type, 'High-Frequency'));
}


/*
 * Generates one ear instances. Creates
 * instances with Normal, Conductive,
 * Sensorineural, and Mixed types.
 */
function createInstances() {
  const HEARING_DEGREE_LABELS = [
    'Slight', 'Mild', 'Moderate',
    'Moderately-Severe', 'Severe', 'Profound'
  ];

  // No hearing loss (Normal)
  let instances = generate(['Normal'], 'Normal');

  for (let degree1 of HEARING_DEGREE_LABELS) {

    // Conductive and Sensorineural
    instances = instances.concat(
      createFrequencies([degree1, 'Normal'], 'Conductive'),
      createFrequencies([degree1], 'Sensorineural')
    );

    // Mixed
    for (let degree2 of HEARING_DEGREE_LABELS) {
      if (degree1 === degree2) break;
      instances = instances.concat(createFrequencies([degree1, degree2], 'Mixed'));
    }
  }

  return instances;
}



/*************************************/
/*       COMBINATIONS FUNCTION       */
/*************************************/

/*
 * Combines the single-ear instances
 * into two-ear combinations.
 */
function getCombinations(instances) {
  let combos   = [];
  let instance = [];

  for (let leftEar of instances) {
    for (let rightEar of instances) {
      instance = classifyTwoEars(leftEar, rightEar);
      if (instance) combos.push(instance);
    }
  }

  return combos;
}



/*************************************/
/*     CREATION DRIVER FUNCTION      */
/*************************************/

/*
 * Drives the data generation and classification process.
 */
function createData() {
  return getCombinations(createInstances());
}



/********************************************/

module.exports = { createData };