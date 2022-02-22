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

const traverse = function (enObj, fiObj, arr) {
  const enObjData = enObj.data;
  const fiObjData = fiObj.data;
  for (const i in enObjData) {
    if (enObjData[i] !== null && typeof enObjData[i] == "object") {
      //# going one step down in the object tree!!
      const label = enObj.label !== "" ? `${enObj.label}.${i}` : `${i}`;
      const childEn = { label: label, data: enObjData[i] };
      const childFi = { label: label, data: fiObjData[i] };
      traverse(childEn, childFi, arr);
    } else {
      arr.push({
        key: enObj.label !== "" ? `${enObj.label}.${i}` : `${i}`,
        en: enObjData[i],
        fi: fiObjData[i],
      });
    }
  }
  return arr;
};

const read = async () => {
  await doc.loadInfo(); //# loads document properties and worksheets
  const sheet = doc.sheetsByTitle.Sheet1; //# get the sheet by title, I left the default title name. If you changed it, then you should use the name of your sheet
  const rows = await sheet.getRows({ limit: sheet.rowCount }); //# fetch rows from the sheet (limited to row count)
  //# read /public/locales/en/translation.json
  const en = fs.readFileSync(`./public/locales/en/translation.json`, {
    encoding: "utf8",
    flag: "r",
  });
  //# read /public/locales/fi/translation.json
  const fi = fs.readFileSync(`./public/locales/fi/translation.json`, {
    encoding: "utf8",
    flag: "r",
  });
  const enObj = { label: "", data: JSON.parse(en) };
  const fiObj = { label: "", data: JSON.parse(fi) };
  //# loop over JSON object and create new array
  // eslint-disable-next-line no-undef
  const result = traverse(enObj, fiObj, (arr = []));
  //# difference between google-spreadsheet rows and newly created array
  const el = result.filter(
    ({ key: id1 }) => !rows.some(({ key: id2 }) => id2 === id1)
  );
  return el;
};

const append = async (data) => {
  await doc.loadInfo(); //# loads document properties and worksheets
  const sheet = doc.sheetsByTitle.Sheet1; //# get the sheet by title, I left the default title name. If you changed it, then you should use the name of your sheet
  await await sheet.addRows(data); //# append rows
};

init()
  .then(() => read())
  .then((data) => append(data))
  .catch((err) => console.log("ERROR!!!!", err));
