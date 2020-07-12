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
            let {percents,max} = configs.cashIn
            if (ele.operation.amount * percents >= max.amount) {
                commisions.push(5)
            } else {
                commisions.push(ele.operation.amount * 0.03)
            }
        }
        if (ele.type === 'cash_out') {
            if (ele.user_type === 'natural') {
                let date = new Date(ele.date)
                let day = date.getDay()

                const id = users.findIndex( usr => usr.user_id == ele.user_id)
                if (id == -1) {
                    const user = new User(ele.user_id)
                    user.AddToTotal(ele.operation.amount, ele.date)
                    users.push(user)
                } 
                 else {
                    users[id].AddToTotal(ele.operation.amount, ele.date)
                 }
            
            }
      
        }
    });
    console.log(users[0].GetTotal())
}

class User {
    user_id;
    deposit = []
    constructor(id) {
        this.user_id = id;  
    }

    AddToTotal(amount, date) {
        this.deposit.push({amount, date})
    }

    GetTotal() {
         let total = 0;
         this.deposit.forEach( el => total += el.amount)
         return total
    }
}


