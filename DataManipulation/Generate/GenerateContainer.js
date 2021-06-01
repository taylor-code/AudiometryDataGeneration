/********************************************/
/*           GenerateContainer.js           */
/*                                          */
/* Holds the GenerateContainer class, which */
/* encapsulates generation variables and    */
/* generators for getting decibel values.   */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   05/23/2021                      */
/********************************************/


const { getMinMaxArr } = require('../HearingDegrees');



/*************************************/
/*      GenerateContainer CLASS      */
/*************************************/

class GenerateContainer {

  /*
   * Sets the generation variables.
   */
  setProp(type, degrees, config = null) {
    this.freq   = config && config.includes('Frequency') ? config : null;
    this.type   = type;
    this.config = config;

    this.minMax = [...getMinMaxArr(degrees)];
    this.gen = this.getDegree();
  }


  /*
   * A round-robin generator that yields
   * decibels in the `minMax` array.
   */
  *getDegree() {
    const numDecibels = this.minMax.length;
    let i = 0;

    while (true) {
      if (i % numDecibels === 0) i = 0;
      yield this.minMax[i++];
    }
  }


  /*
   * Uses the getDegree() generator.
   */
  getNextDb() {
    return this.gen.next().value;
  }

}


let generateCont = new GenerateContainer();



/********************************************/

module.exports = { generateCont };