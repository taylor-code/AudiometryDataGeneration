/********************************************/
/*             ClassifyData.js              */
/*                                          */
/* Holds the data classification driver.    */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/04/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const { getAverageBothEars } = require('./GetAverage');

const {
  abgIsGreaterThan10,
  getEarValues
} = require('./ClassifyDataHelpers');

const {
  classifyConductive,
  classifySensorineural,
  classifyMixed
} = require('./ClassifyType');

const {
  classifyHighFrequency,
  classifyLowFrequency,
  classifyBilateral,
  classifyUnilateral,
  classifySymmetrical,
  classifyAsymmetrical
} = require('./ClassifyConfiguration');



/*************************************/
/*     CLASSIFICATION FUNCTIONS      */
/*************************************/

/* 
 * classifyData() Function
 *
 * For each object in dataArr,
 * classifies the hearing loss.
 *
 * @param: dataArr, an Array of earing data objects.
 * 
 * @return: dataArr with the classifications.
 */
function classifyData(data) {
  for (let obj of data) {
    
    // Get the calculation variables.
    const { leftAC, rightAC, leftBC, rightBC } = getEarValues(obj);
    const valuesAC     = leftAC.concat(rightAC);
    const valuesBC     = leftBC.concat(rightBC);
    const averageAC    = getAverageBothEars(leftAC, rightAC);
    const averageBC    = getAverageBothEars(leftBC, rightBC);
    const abgGreater10 = abgIsGreaterThan10(valuesAC, valuesBC);
    const abgLess10    = !abgGreater10;

    // Classify conductive hearing loss.
    obj['Degree'] = classifyConductive(averageAC, averageBC, abgGreater10);
    
    
    if (obj['Degree'] === 'Normal') obj['Type'] = 'None';
    else if (obj['Degree'] !== 'null') obj['Type'] = 'Conductive';

    
    // Classify sensorineural hearing loss.
    if (obj['Degree'] === 'null') {
      obj['Degree'] = classifySensorineural(averageAC, averageBC, abgLess10);

      if (obj['Degree'] !== 'null') obj['Type'] = 'Sensorineural';
    }

    // Classify mixed hearing loss.
    if (obj['Degree'] === 'null') {
      obj['Degree'] = classifyMixed(averageAC, averageBC, abgLess10);

      if (obj['Degree'] !== 'null') obj['Type'] = 'Mixed';
    }
    
  }
  
  return data;
}



/********************************************/

module.exports = { classifyData };