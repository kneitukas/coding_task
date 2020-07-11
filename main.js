const fs = require("fs");
const axios = require('axios');


(function Main() {
    json = ReadArgs()
    let configs = LoadConfigs()
    // console.log(configs)

})()

function ReadArgs() {
    if (process.argv.length < 3) {
        console.log("Not enough arguments");
        process.exit(1)
    }
    return JSON.parse(fs.readFileSync(process.argv[2], {encoding: "utf8"})) 
}

  async function LoadConfigs() {
    const configs = {};
    Object.defineProperties(configs, {
        cashIn: {},
        cashOut: {
            natural:{}, 
            juridical:{}
        }})

    const req1 = axios.get('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-in')
    const req2 = axios.get('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/natural')
    const req3 = axios.get('http://private-38e18c-uzduotis.apiary-mock.com/config/cash-out/juridical')

     [configs] = await Promise.all([req1,req2,req3])

    console.log(configs)
}


