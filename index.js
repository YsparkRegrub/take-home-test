import { Drug, Pharmacy } from "./pharmacy.js";
import { DrugName } from "./drug.js";

import fs from "fs";

const drugs = [
  new Drug(DrugName.DOLIPRANE, 20, 30),
  new Drug(DrugName.HERBAL_TEA, 10, 5),
  new Drug(DrugName.FERVEX, 12, 35),
  new Drug(DrugName.MAGIC_PILL, 15, 40),
  new Drug(DrugName.DAFALGAN, 10, 40),
];
const pharmacy = new Pharmacy(drugs);

const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
}

/* eslint-disable no-console */
fs.writeFile(
  "output.json",
  JSON.stringify({ result: log }, null, 2).concat("\n"),
  (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
    }
  },
);

/* eslint-enable no-console */
