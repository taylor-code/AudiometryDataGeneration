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

const { getAverageBothEars } = require('./ClassifyHelpers/GetAverage');

const {
  abgIsGreaterThan10,
  getEarValues
} = require('./ClassifyHelpers/ClassifyDataHelpers');

const {
  classifyConductive,
  classifySensorineural
} = require('./ClassifyHelpers/ClassifyType');

const {
  classifyHighFrequency,
  classifyLowFrequency,
  classifyBilateral,
  classifyUnilateral,
  classifySymmetrical,
  classifyAsymmetrical
} = require('./ClassifyHelpers/ClassifyConfiguration');



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
function classifyData(dataArr) {
  for (let obj of dataArr) {
    // Get the calculation variables.
    const { leftAC, rightAC, leftBC, rightBC } = getEarValues(obj);
    const valuesAC = leftAC.concat(rightAC);
    const valuesBC = leftBC.concat(rightBC);
    const averageAC = getAverageBothEars(leftAC, rightAC);
    const averageBC = getAverageBothEars(leftBC, rightBC);
    const abgGreater10 = abgIsGreaterThan10(valuesAC, valuesBC);

    // Classify conductive hearing loss.
    obj['Degree'] = classifyConductive(averageAC, averageBC, abgGreater10);
    
    // Normal hearing; no hearing loss.
    if (obj['Degree'] === 'Normal') obj['Type'] = 'None';

    // Conductive hearing loss.
    else if (obj['Degree'] !== 'null') obj['Type'] = 'Conductive';

    /*
    // Sensorineural loss:
    if (obj['Degree'] === 'null') {
      obj['Degree'] = classifySensorineural(averageAC, averageBC, abgGreater10);

    }
    */
  }
  
  return dataArr;
}



/********************************************/

module.exports = { classifyData };