/********************************************/
/*           ClassifyContainer.js           */
/*                                          */
/* Holds the ClassifyContainer class, which */
/* encapsulates functions for calculating   */
/* classification variables.                */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   05/20/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const {
  getDegree,
  getEarValues,
  abgIsGreaterThan10
} = require('./ClassifyHelpers');

const {
  getAverage,
  getPTA
} = require('./GetAverage');



/*************************************/
/*      ClassifyContainer CLASS      */
/*************************************/

class ClassifyContainer {

  /*
   * Sets the calculation variables that
   * both the Type generation and Config
   * generation functions use.
   */
  setProp(dataSet) {
    // Left/Right Ear Decibel Values
    const [ leftAC, rightAC, leftBC, rightBC ] = getEarValues(dataSet);
    this.leftAC  = leftAC;
    this.rightAC = rightAC;
    this.leftBC  = leftBC;
    this.rightBC = rightBC;

    // Pure-Tone Averages
    this.averageAC = getPTA(this.leftAC, this.rightAC);
    this.averageBC = getPTA(this.leftBC, this.rightBC);

    // Air-Bone Gap
    const valuesAC = this.leftAC.concat(this.rightAC);
    const valuesBC = this.leftBC.concat(this.rightBC);
    this.abgGreater10 = abgIsGreaterThan10(valuesAC, valuesBC);
  }


  /*
   * Sets the calculation variables specific
   * to the Config generation functions.
   */
  setPropForConfig(dataSet) {
    this.setProp(dataSet);

    this.leftACDeg  = getDegree(getAverage(this.leftAC));
    this.rightACDeg = getDegree(getAverage(this.rightAC));
    this.leftBCDeg  = getDegree(getAverage(this.leftBC));
    this.rightBCDeg = getDegree(getAverage(this.rightBC));
  }

}


let classifyCont = new ClassifyContainer();



/********************************************/

module.exports = { classifyCont };