# Audiometry Data Generation
JavaScript program to generate pure-tone hearing loss data.

One execution produces approximately 17,500 instances in one second.

---

## How To Run

1. Download Node.js for your platform: https://nodejs.org/en/download/
2. In Visual Studio Code, open the **/AudiometryDataGeneration** folder.
3. Type `npm install` in the terminal to install the dependencies.
4. Type `node index` to run the program.

---

## Data
One execution produces three data sets:
1. Training Set: Approximately 14,000 instances
2. Testing Set: Approximately 3,500 instances
3. Prediction Set: 3 instances

The training and testing sets are saved in JSON format to **/Data/JSON**.

The three sets are saved in CSV format to **/Data/CSV**.


### Data Instance

Here is a sample instance:
```json
  {
    "Left Ear": {
      "AC": {
        "250 Hz": -10,
        "500 Hz": -10,
        "1000 Hz": 5,
        "2000 Hz": 0,
        "4000 Hz": 45,
        "8000 Hz": 50
      },
      "BC": {
        "250 Hz": -5,
        "500 Hz": -10,
        "1000 Hz": 10,
        "2000 Hz": 10,
        "4000 Hz": 35,
        "8000 Hz": 30
      }
    },
    "Right Ear": {
      "AC": {
        "250 Hz": 40,
        "500 Hz": 30,
        "1000 Hz": 30,
        "2000 Hz": 40,
        "4000 Hz": -10,
        "8000 Hz": -10
      },
      "BC": {
        "250 Hz": 40,
        "500 Hz": 40,
        "1000 Hz": 30,
        "2000 Hz": 35,
        "4000 Hz": 10,
        "8000 Hz": -5
      }
    },
    "Type": "Left: Mixed & Right: Sensorineural",
    "Degree": "Left: AC: Moderate | BC: Mild & Right: Mild",
    "Configuration": "Left: High-Frequency & Right: Low-Frequency | Bilateral | Asymmetrical"
  }
```

One instance contains the following information:
- `Left Ear`: Air Conduction (`AC`) and Bone Conduction (`BC`) Pure-Tone Hearing Test Values
- `Right Ear`: `AC` and `BC` Pure-Tone Hearing Test Values
- `Type`: Conductive, Sensorineural, Mixed, or Normal (no hearing loss)
- `Degree`: Normal, Slight, Mild, Moderate, Moderately-Severe, Severe, Profound
- `Configuration`: Bilateral, Unilateral, Symmetrical, Asymmetrical, Low-Frequency, High-Frequency

---

## Program Process
1. Generates and classifies single-ear instances.
2. Combines the single-ear instances into two-ear instances.
3. Classifies the two-ear instances.
4. Ensures no duplicate entries exist.
5. Splits the data into three sets: prediction, testing, and training data.
6. Saves the sets in JSON format and in CSV format.
