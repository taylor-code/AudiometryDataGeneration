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
  getEarValues,
  splitStr,
  abgIsGreaterThan10
} = require('./ClassifyHelpers');

const { getPTAArrFunc, getPTA } = require('./GetAverage');
const { getDegree } = require('../HearingDegrees');



/*************************************/
/*      ClassifyContainer CLASS      */
/*************************************/

class ClassifyContainer {

  /*-----------------------------------*/
  /*              SETTERS              */
  /*-----------------------------------*/

  /*
   * Prepares the classification variables.
   */
  setProp(dataSet, tryType) {
    this.tryType   = tryType;
    this.earValues = getEarValues(dataSet);

    this.setDiffEarsPTA()
  }


  /*
   * Sets the PTA for each ear. Used to classify
   * Low- or High-Frequency hearing loss.
   */
  setDiffEarsPTA() {
    const [ left, right ] = this.getLeftAndRightArrays();

    this.lowLeftPTA   = getPTA(...left,  'Low-Frequency');
    this.lowRightPTA  = getPTA(...right, 'Low-Frequency');
    this.highLeftPTA  = getPTA(...left,  'High-Frequency');
    this.highRightPTA = getPTA(...right, 'High-Frequency');

    this.leftDiff  = this.highLeftPTA  - this.lowLeftPTA;
    this.rightDiff = this.highRightPTA - this.lowRightPTA;

    // The program sometimes inaccurately classifies
    // Normal hearing as low- or high-frequency.
    // If the low and high degrees are in the
    // normal range, set the difference to 0.
    const lowDeg_L  = getDegree(this.lowLeftPTA);
    const lowDeg_R  = getDegree(this.lowRightPTA);
    const highDeg_L = getDegree(this.highLeftPTA);
    const highDeg_R = getDegree(this.highRightPTA);

    if (lowDeg_L === highDeg_L === 'Normal') this.leftDiff  = 0;
    if (lowDeg_R === highDeg_R === 'Normal') this.rightDiff = 0;
  }


  /*
   * After determining if a set shows Low- or
   * High-Frequency loss, sets the variables
   * to determine the type, degree, and other
   * configuration information.
   */
  setFinalPTA(freq) {
    const [ leftFreq, rightFreq ] = this.getLeftAndRightFreq(freq);

    // Left/Right Ear Degrees
    const [ leftAC, rightAC, leftBC, rightBC ] = this.earValues;

    this.leftACDeg  = getDegree(getPTA(leftAC,  leftFreq));
    this.rightACDeg = getDegree(getPTA(rightAC, rightFreq));
    this.leftBCDeg  = getDegree(getPTA(leftBC,  leftFreq));
    this.rightBCDeg = getDegree(getPTA(rightBC, rightFreq));


    // Average Left/Right Ear PTA.
    // Used by classifySymmetry()
    const [ left, right ] = this.getLeftAndRightArrays();

    this.leftPTA  = getPTA(...left,  leftFreq);
    this.rightPTA = getPTA(...right, rightFreq);


    // Air-Bone Gap
    const leftACHz  = getPTAArrFunc(leftFreq)(leftAC);
    const rightACHz = getPTAArrFunc(rightFreq)(rightAC);
    const leftBCHz  = getPTAArrFunc(leftFreq)(leftBC);
    const rightBCHz = getPTAArrFunc(rightFreq)(rightBC);

    this.abgGreater10_left  = abgIsGreaterThan10(leftACHz,  leftBCHz);
    this.abgGreater10_right = abgIsGreaterThan10(rightACHz, rightBCHz);
  }


  /*-----------------------------------*/
  /*              GETTERS              */
  /*-----------------------------------*/

  /*
   * Returns the decibel values of both ears.
   * If the type is Conductive, returns only
   * the AC values.
   */
  getLeftAndRightArrays() {
    const [ leftAC, rightAC, leftBC, rightBC ] = this.earValues;

    let l = this.tryType === 'Conductive' ? [ leftAC  ] : [ leftAC,  leftBC  ];
    let r = this.tryType === 'Conductive' ? [ rightAC ] : [ rightAC, rightBC ];
    
    return [ l, r ];
  }


  /*
   * Returns the frequency hearing loss
   * (if any) of the left and right ears.
   */
  getLeftAndRightFreq(freq) {
    let leftFreq  = freq || 'Normal';
    let rightFreq = freq || 'Normal';

    // One or both ears show frequency hearing loss.
    if (freq) {
      const freqSplit = splitStr(freq);

      if (freq.includes('Left'))  leftFreq  = freqSplit[1];
      if (freq.includes('Right')) rightFreq = freqSplit[3] || freqSplit[1];
    }

    return [ leftFreq, rightFreq ];
  }

}


let classifyCont = new ClassifyContainer();



/********************************************/

module.exports = { classifyCont };