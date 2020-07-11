const fs = require("fs");
const axios = require('axios');
const { config } = require("process");


(async function Main() {
    const inputJson = ReadArgs()
    const configs = await LoadConfigs()
    ApplyCommissions(inputJson, configs)
})()

function ReadArgs() {
    if (process.argv.length < 3) {
        console.log("Not enough arguments");
        process.exit(1)
    }
    return JSON.parse(fs.readFileSync(process.argv[2], { encoding: "utf8" }))
}

async function LoadConfigs() {
    const configs = {
        cashIn: {},
        cashOut: {
            natural: {},
            juridical: {}
        }
    };

    try {
        await axios.get('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in').then(res => configs.cashIn = res.data)
        await axios.get('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural').then(res => configs.cashOut.natural = res.data)
        await axios.get('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical').then(res => configs.cashOut.juridical = res.data)
    }
    catch (err) {
        console.error(err)
        process.exit(1);
    }
    finally { return configs }
}

function ApplyCommissions (input, configs) {
    const users = [];
    const commisions = [];

   input.forEach(ele => {
        if (ele.type === 'cash_in') {
            if (ele.operation.amount * 0.03 >= 5) {
                commisions.push(5)
            } else {
                commisions.push(ele.operation.amount * 0.03)
            }
            console.log(commisions)
        }
    });
}


