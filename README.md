## About

React application that automates the process of internationalization using google-spreadsheet plugin, v4 google sheets API and i18next framework.
The project is for the front-end developers who are suffering from the manual “copy-and-paste” internationalization process, executing a single line of script shall automate the entire process.

Use Case:
- React app that supports multiple languages (with i18next and react-i18next library)
- Setup Google Spreadsheet as JSON Hosting + v4 Google sheet API authentication
- Script that auto synchronize translations between Google Spreadsheet & JSON file (with google-spreadsheet library & Google Sheets API) by given two methods:
  - Scanning the key from the source code and uploading the scanned key to Google spreadsheet.
  - Downloading the translated strings from Google spreadsheet when building the source code.

Feel free to leave a ⭐ as motivation if this was useful to you 😊

## Requirements

- Node >= 14.0.0
- npm >= 5.6

## Context
```bash
- React 17.0.2
- Packages:
  - google-spreadsheet
  - i18next
  - react-i18next
  - @mui/material
```

## Getting started

```bash
# Clone the repo
git clone
cd react-internationalization-googlespreadsheet-i18next

# Install npm packages
npm install

# Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files
npm start

```

## Building the project

```bash

# Build artifacts will be stored in the `build/` directory.
npm run build

```
