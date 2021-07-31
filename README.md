# Audiometry Data Generation
JavaScript program to generate hearing loss data.

---

## How To Run

1. Download Node.js for your platform: https://nodejs.org/en/download/
2. In Visual Studio Code, open the **/AudiometryDataGeneration** folder.
3. Type `npm install` in the terminal to install the dependencies.
4. Type `node index` to run the program.

---

## Performance

One execution produces approximately 


---

## Data
80% of the data is written to **/JSONData/AudiometryTrain.json**.
<br/>
This data is also written to **/CSVData/AudiometryTrain.csv**.

20% of the data is written to **/JSONData/AudiometryTest.json**.
<br/>
This data is also written to **/CSVData/AudiometryTest.csv**.

Three instances are written to **/CSVData/AudiometryPred.csv**.


### Data Instance

Here is a sample instance:
```json
  {
    "Left Ear": {
      "AC": {
        "250 Hz": -10,
        "500 Hz": -10,
        "1000 Hz": 5,
        "2000 Hz": 10,
        "4000 Hz": 35,
        "8000 Hz": 35
      },
      "BC": {
        "250 Hz": 0,
        "500 Hz": 5,
        "1000 Hz": 0,
        "2000 Hz": 10,
        "4000 Hz": 35,
        "8000 Hz": 35
      }
    },
    "Right Ear": {
      "AC": {
        "250 Hz": 95,
        "500 Hz": 95,
        "1000 Hz": 100,
        "2000 Hz": 0,
        "4000 Hz": -5,
        "8000 Hz": 5
      },
      "BC": {
        "250 Hz": 45,
        "500 Hz": 55,
        "1000 Hz": 50,
        "2000 Hz": 15,
        "4000 Hz": 0,
        "8000 Hz": 0
      }
    },
    "Type": "Left: Sensorineural & Right: Mixed",
    "Degree": "Left: Mild & Right: AC: Profound | BC: Moderate",
    "Configuration": "Left: High-Frequency & Right: Low-Frequency | Bilateral | Asymmetrical"
  }
```

One instance contains the following information:
- `Left Ear`: Air Conduction (`AC`) and Bone Conduction (`BC`) Hearing Test Values
- `Right Ear`: Air Conduction (`AC`) and Bone Conduction (`BC`) Hearing Test Values
- `Type`: Conductive, Sensorineural, Mixed, or None (no hearing loss)
- `Degree`: Normal, Slight, Mild, Moderate, Moderately-Severe, Severe, Profound
- `Configuration`: Bilateral, Unilateral, Symmetrical, Asymmetrical, Low-Frequency, High-Frequency

---

## Program Process
1. Loads the training and testing data from **/JSONData**.
2. Combines the data into one object.
3. Generates and classifies single-ear instances.
4. Combines the single-ear instances into two-ear instances.
5. Classifies the two-ear instances.
6. Appends the new data to the previous data.
7. Ensures no duplicate entries exist.
8. Splits the data into three sets: prediction, testing, and training data.
9. Saves the sets in JSON format and in CSV format.