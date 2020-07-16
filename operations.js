

export class Operations {
  constructor(configs, db) {
    this.configs = configs;
    this.db = db;
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
        const user = this.db.GetOrCreateUser(ele.user_id, "natural");
        const num = user.AddToTotal(ele.operation.amount, ele.date);
        return num ? (num * percents) / 100 : 0;

      case "juridical":
        const { percents: juridical, min } = this.configs.cashOut.juridical;
        const result = (ele.operation.amount * juridical) / 100;
        return result <= min.amount ? min.amount : result;
    }
  }
}
