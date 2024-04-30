# Sport-betting-data ![nodedotjs](https://img.shields.io/badge/node.js-v21.6-339933.svg?style=flat&logo=nodedotjs&logoColor=white) ![npm](https://img.shields.io/badge/npm-10.2-dc2c35.svg?style=flat&logo=npm&logoColor=white)  

<a href="https://buymeacoffee.com/r1y5i" target="_blank">
<img style="border-radius: 20px" src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174">
</a>

## About ##
A scrapper for sport betting data from different brokers.  
The first stage focuses on the data on Hong Kong Jockey Club (HKJC) website, including Mark Six, Horse Racing and Football betting.  
Please refer to the [Development Plan](#development-plan) for the current progress.  

## Prerequisites ##
Please make sure the following tool(s) / application(s) are properly setup and ready to use:
- Node.js ([https://nodejs.org/](https://nodejs.org/))

## Setup ##
1. Download repository  
```console
git clone https://github.com/rkwyu/sport-betting-data
```
2. Install dependencies
```console
cd ./sport-betting-data
npm install
```

## Configuration ##
Output directory can be configured in `config.ini`
```ini
[DIRECTORY]
output=output
```

## Usage (CLI) ##
```console
Usage: npm start [-- options]  
Options:  
  -hkjc_hr        Get HKJC Horse Racing Odds  
  -hkjc_ms        Get HKJC Marksix Result
```

#### Example 1: Download HKJC's mark six data ####
```console
npm start -hkjc_ms
```

#### Example 2: Download HKJC's horse racing data ####
```console
npm start -hkjc_hr
```

## Output Directory Structure ##
```
.
├── {output directory}
│   └── {broker}
│      └── {type}
│         └── ...
```

#### Example ####
```
.
├── output
│   └── hkjc
│      └── football
│      └── marksix
│         ├── 1993.json
│         ├── 1994.json
│         └── ...
│      └── racing
│         ├── 2024-04-28_ST
│         │   ├── 01
│         │   │   ├── dbl
│         │   │   ├── ...
│         │   │   └── winprog
│         │   ├── 02
│         │   ├── ...
│         │   ├── importantnotices
│         │   ├── jkc
│         │   ├── scratched
│         │   ├── tnc
│         │   ├── winodds
│         │   ├── winplaodds
│         │   └── winplaoddspre
│         └── ...
```
Date-based data will be grouped into a directory using date-identifier (e.g. `2024-04-28_ST`) as the directory name  
Match-based / Race-based data will be further grouped into a directory using match-identifier / race-identifier (e.g. `01`, `02`, ...) as the directory name  

## Development Plan ##
- Hong Kong Jockey Club (HKJC) ([https://www.hkjc.com/](https://www.hkjc.com/))
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
 

## License ##
This project is licensed under the [MIT License](LICENSE.md)
