/********************************************/
/*                 index.js                 */
/*                                          */
/* Holds the main() function.               */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   02/01/2021                      */
/********************************************/


/*************************************/
/*              IMPORTS              */
/*************************************/

const { cleanseData   } = require('./DataManipulation/CleanseData');
const { createData    } = require('./DataManipulation/CreateData');
const { writeJSONFile } = require('./JSONCreation/JSONFileIO');

const {
  NEW_DATA_PATH,
  setup,
  printStats
} = require('./JSONCreation/MainHelpers');



/*************************************/
/*          MAIN() FUNCTION          */
/*************************************/

/*
 * main() Function
 *
 * Reads in the JSON file, generates and classifies
 * hearing test data, and writes to JSON files.
 */
function main() {
  console.time('Timer');

  let cleanedData;

  try {
    // Initialize the previous data object.
    let data = setup();

    // Generate and classify new data.
    let newData = createData();
    data = data.concat(newData);
    console.log('Generated the data.');

    // Cleanse the data.
    console.log('Now cleansing the data. This may take a while.');
    cleanedData = cleanseData(data);
    printStats(newData.length, cleanedData.length);
  }
  catch (err) {
    return console.error(err.message);
  }


  // Save the new data.
  try {
    writeJSONFile(NEW_DATA_PATH, cleanedData);
    console.log(`New data successfully saved to ${NEW_DATA_PATH}`);
  }
  catch (err) {
    console.error(`Error: Unable to save new data: \n'${err}'\n`);
  }

  console.timeEnd('Timer');

}



/********************************************/

main();