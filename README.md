# Audiometry Data Generation
JavaScript program to generate audiometry data.

## Program Process
Loads the training and testing data from /JSONData. Combines

the data into one object. Generates and classifies new data.

Appends the new data to the previous sets.


Ensures no duplicate entries exist. Splits the data into two

sets: training data and testing data. Saves the sets in JSON

format and in CSV format.


## How To Run

### On repl.it:
1. Go to: https://repl.it/@taylorcode/AudiometryDataGeneration
2. Click the green "run" button.

### On Your Computer:
1. Download Node.js for your platform: https://nodejs.org/en/download/
2. In Visual Studio Code, open the /AudiometryDataGeneration folder.
3. Type `npm install` in the terminal to install the dependencies.
4. Type `node index` or `node .` to run the program.


## Data
90% of the data is written to /JSONData/AudiometryTrain.json.

This data is also written to /CSVData/AudiometryTrain.csv.


10% of the data is written to /JSONData/AudiometryTest.json

This data is also written to /CSVData/AudiometryTest.csv.


### Data Set
One hearing set consists of decibel values for two hearing tests:
1. Air Conduction (AC)
2. Bone Conduction (BC)

A hearing set also includes `Degree` (Normal, Slight, Mild, Moderate

Moderately-Severe, Severe, or Profound), and `Type` (Conductive,

Sensorineural, Mixed, or None (no hearing loss))

Sample Set:
```json
  {
    "AC": {
      "Left Ear": {
        "250 Hz": 55,
        "500 Hz": 50,
        "1000 Hz": 45,
        "2000 Hz": 50,
        "4000 Hz": 45,
        "8000 Hz": 45
      },
      "Right Ear": {
        "250 Hz": 45,
        "500 Hz": 45,
        "1000 Hz": 40,
        "2000 Hz": 45,
        "4000 Hz": 50,
        "8000 Hz": 55
      }
    },
    "BC": {
      "Left Ear": {
        "250 Hz": 5,
        "500 Hz": 5,
        "1000 Hz": 5,
        "2000 Hz": -5,
        "4000 Hz": -5,
        "8000 Hz": -5
      },
      "Right Ear": {
        "250 Hz": 0,
        "500 Hz": 5,
        "1000 Hz": -5,
        "2000 Hz": 15,
        "4000 Hz": 0,
        "8000 Hz": -5
      }
    },
    "Degree": "Moderate",
    "Type": "Conductive"
  },
```