import fs from "fs";
import Configs from "./configs.js";
import Operations from "./operations.js";

(async function Main() {
    const inputObject = ReadArgs(process.argv);
    await Configs.LoadConfigs();
    const commisions = ApplyCommissions(inputObject);
    PrintToStdout(commisions)
})();

export function ReadArgs(args) {
    return JSON.parse(fs.readFileSync(args[2], { encoding: "utf8" }));
}

export function ApplyCommissions(input) {
    const commisions = [];

    input.forEach((ele) => {
        if (ele.type === "cash_in") {
            commisions.push(Operations.NewCashInOperation(ele));
        }
        if (ele.type === "cash_out") {
            commisions.push(Operations.NewCashOutOperation(ele));
        }
    });

    return commisions

}

function PrintToStdout(commisions) {
    commisions.forEach(el => console.log(el));
}
