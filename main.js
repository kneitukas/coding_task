import fs from "fs";
import { configs as Configs } from "./configs.js";
import { Db } from "./database.js";
import { Operations } from "./operations.js";
import { Ceil } from './helpers.js'

(async function Main() {
  const inputJson = ReadArgs();
  const configs = await Configs.LoadConfigs();
  const db = new Db(configs);
  const operations = new Operations(configs, db);
  ApplyCommissions(inputJson, operations);
})();

function ReadArgs() {
  if (process.argv.length < 3) {
    console.log("Not enough arguments");
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(process.argv[2], { encoding: "utf8" }));
}

function ApplyCommissions(input, operations) {
  const commisions = [];

  input.forEach((ele) => {
    if (ele.type === "cash_in") {
      commisions.push(operations.NewCashInOperation(ele));
    }
    if (ele.type === "cash_out") {
      commisions.push(operations.NewCashOutOperation(ele));
    }
  });

  commisions.forEach(el => console.log(Ceil(el, 2)));
}
