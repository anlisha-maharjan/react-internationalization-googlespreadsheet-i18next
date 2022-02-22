const { GoogleSpreadsheet } = require("google-spreadsheet");
const secret = require("./secret.json");

const fs = require("fs");

//# Initialize the sheet
const doc = new GoogleSpreadsheet(
  "1B1njd441X7di47joj9OvQGuJZ-mR9yFQrpr0WNW6c94"
); //# spreadsheet ID

//# Initialize Auth
const init = async () => {
  await doc.useServiceAccountAuth({
    client_email: secret.client_email,
    private_key: secret.private_key,
  });
};

const read = async () => {
  await doc.loadInfo(); //# loads document properties and worksheets
  const sheet = doc.sheetsByTitle.Sheet1; //# get the sheet by title, I left the default title name. If you changed it, then you should use the name of your sheet
  await sheet.loadHeaderRow(); //# loads the header row (first row) of the sheet
  const colTitles = sheet.headerValues; //# array of strings from cell values in the first row
  const rows = await sheet.getRows({ limit: sheet.rowCount }); //# fetch rows from the sheet (limited to row count)
  let result = {};
  //# map rows values and create an object with keys as columns titles starting from the second column (languages names) and values as an object with key value pairs, where the key is a key of translation, and value is a translation in a respective language
  rows.map((row) => {
    colTitles.slice(1).forEach((title) => {
      result[title] = result[title] || [];
      const key = row[colTitles[0]];
      result = {
        ...result,
        [title]: {
          ...result[title],
          [key]: row[title] !== "" ? row[title] : undefined,
        },
      };
    });
  });
  return result;
};

function parseDotNotation(str, val, obj) {
  let currentObj = obj;
  const keys = str.split(".");
  let i;
  const l = Math.max(1, keys.length - 1);
  let key;

  for (i = 0; i < l; ++i) {
    key = keys[i];
    currentObj[key] = currentObj[key] || {};
    currentObj = currentObj[key];
  }

  currentObj[keys[i]] = val;
  delete obj[str];
}

Object.expand = function (obj) {
  for (const key in obj) {
    if (key.indexOf(".") !== -1) {
      parseDotNotation(key, obj[key], obj);
    }
  }
  return obj;
};

const write = (data) => {
  Object.keys(data).forEach((key) => {
    const tempObject = Object.expand(data[key]);
    fs.writeFile(
      `./public/locales/${key}/translation.json`,
      JSON.stringify(tempObject, null, 2),
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  });
};

init()
  .then(() => read())
  .then((data) => write(data))
  .catch((err) => console.log("ERROR!!!!", err));
