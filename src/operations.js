import Configs from "./configs.js";
import Db from "./database.js";
import { Ceil } from "./helpers.js";

export class Operations {
  constructor() {
    this.configs = Configs.GetConfigs();
  }

  NewCashInOperation(ele) {
    let { percents, max } = this.configs.cashIn;
    if ((ele.operation.amount * percents) / 100 >= max.amount) {
      return 5;
    } else {
      return Ceil((ele.operation.amount * percents) / 100, 2);
    }
  }

  NewCashOutOperation(ele) {
    switch (ele.user_type) {
      case "natural":
        let { percents } = this.configs.cashOut.natural;
        const user = Db.GetOrCreateUser(ele.user_id, "natural");
        const num = user.AddToTotal(ele.operation.amount, ele.date);
        return num ? Ceil((num * percents) / 100, 2) : 0;

      case "juridical":
        const { percents: juridical, min } = this.configs.cashOut.juridical;
        const result = (ele.operation.amount * juridical) / 100;
        return result <= min.amount ? min.amount : Ceil(result, 2);
    }
  }
}

export default new Operations();
