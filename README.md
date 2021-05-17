# Audiometry Data Generation
JavaScript program to generate hearing loss data.

---

## How To Run

**Note: Running the program on replit will take 8–10x longer
than in Visual Studio Code.*

### On replit:
1. Go to: https://replit.com/@taylorcode/AudiometryDataGeneration
2. Click the green "run" button.

### On Your Computer:
1. Download Node.js for your platform: https://nodejs.org/en/download/
2. In Visual Studio Code, open the **/AudiometryDataGeneration** folder.
3. Type `npm install` in the terminal to install the dependencies.
4. Type `node index` or `node .` to run the program.

---

## Program Process
1. Loads the training and testing data from **/JSONData**.
2. Combines the data into one object.
3. Generates and classifies new data.
4. Appends the new data to the previous sets.
5. Ensures no duplicate entries exist.
6. Splits the data into two sets: training data and testing data.
7. Saves the sets in JSON format and in CSV format.

---

## Data
90% of the data is written to **/JSONData/AudiometryTrain.json**.
<br/>
This data is also written to **/CSVData/AudiometryTrain.csv**.

10% of the data is written to **/JSONData/AudiometryTest.json**.
<br/>
This data is also written to **/CSVData/AudiometryTest.csv**.


### Data Set

Here is a sample data set:
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
  }
```

One hearing set contains the following information:
- Air Conduction (`AC`) Hearing Test Values
- Bone Conduction (`BC`) Hearing Test Values
- `Degree`: Normal, Slight, Mild, Moderate, Moderately-Severe, Severe, or Profound
- `Type`: Conductive, Sensorineural, Mixed, or None (no hearing loss).
