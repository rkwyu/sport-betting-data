# Sport-betting-data
[![License: GPLv3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## ▶️ About ##
A scrapper written in Node.js for sport betting data from brokers.  
The first stage focuses on the data on Hong Kong Jockey Club (HKJC) website, including Mark Six, Horse Racing and Football betting data. 
Please refer to the [Development Plan](#-development-plan) for the progress.

## ▶️ Prerequisites ##
To running this tool, please make sure the following prerequisites are ready:
- Node.js ([https://nodejs.org/](https://nodejs.org/))

## ▶️ Setup ##
1. Download repository  
```console
git clone https://github.com/rkwyu/sport-betting-data
```
2. Install dependencies
```console
cd ./sport-betting-data
npm install
```

## ▶️ Usage (CLI) ##
```console
Usage: node run.js [options]  
Options:  
  -hkjc_hr        Get HKJC Horse Racing Odds  
  -hkjc_ms        Get HKJC Marksix Result
```

#### ▶️ Example ####
```console
node run.js -hkjc_ms
```

## ▶️ Development Plan ##
- [Hong Kong Jockey Club (HKJC)](https://www.hkjc.com/)
  - [x] Mark Six
    - [x] Results (since 1993)
  - [ ] Horse Racing
    - [ ] Jockey Challenge Scheduled Rides List
    - [ ] Jockey Challenge Results
    - [ ] Jockey Challenge Statistics
    - [x] Total Pool Investments (in a race)
    - [x] Pool Investments (in a race)
    - [ ] Race Cards
    - [ ] Race Changes
    - [ ] Race Entries
    - [x] Race Odds
      - [x] Pre-sell WIN and PLACE odds
      - [x] Pre-sell QUINELLA odds
      - [x] Pre-sell QUINELLA PLACE odds
      - [x] Pre-sell DOUBLE odds
      - [x] WIN odds
      - [x] WIN and PLACE odds
      - [x] QUINELLA odds
      - [x] QUINELLA PLACE odds
      - [x] FORECAST odds
      - [x] TIERCE odds (Top 20, Banker Top 10) and Investment
      - [x] TRIO odds (Top 20, Banker Top 10, all)
      - [x] FIRST FOUR odds (Top 20, Banker Top 10, all)
      - [x] QUARTET odds (Top 20, Banker Top 10)
      - [x] DOUBLE odds
      - [x] JOCKEY CHALLENGE odds
      - [x] TRAINER CHALLENGE odds
      - [x] Progressive WIN odds
    - [ ] Race Results
    - [x] Scratched Horses
    - [ ] Trainer Challenge Entries List
    - [ ] Trainer Challenge Odds Chart
    - [ ] Trainer Challenge Results
    - [ ] Trainer Challenge Statistics
  - [ ] Football
  - [x] Important Notices
 

## ▶️ License ##
[GNU GPL v3.0](LICENSE.md)
