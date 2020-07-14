

class Operations {
    constructor(configs, db) {
        this.configs = configs
        this.db = db
    }
     NewCashInOperation(ele) {
        let { percents, max } = this.configs.cashIn;
        if ((ele.operation.amount * percents) / 100 >= max.amount) {
          return 5;
        } else {
         return (ele.operation.amount * percents) / 100;
        }
      }
    
       NewCashOutOperation(ele) {
        switch (ele.user_type) {
          case "natural":
            let { percents } = this.configs.cashOut.natural;
            const user = this.db.GetOrCreateUser(ele.user_id, "natural") 
            const num = user.AddToTotal(ele.operation.amount, ele.date);
            //   console.log(num)
              if (num) {
                  return num * percents / 100
              } else {
                  return 0
              }
            break;
          case "juridical":
            // console.log("juridical");
            break;
        }
      }

}


  module.exports = Operations
