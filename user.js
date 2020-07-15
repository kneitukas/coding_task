import GetWeek from "./helpers.js";

export class User {
  constructor(id) {
    this.deposit = [];
    this.user_id = id;
  }
}

export class NaturalUser extends User {
  constructor(id, week_limit) {
    super(id);
    this.week_limit = week_limit;
    this.cap = week_limit;
  }

  AddToTotal(amount, date) {
    const week = GetWeek(new Date(date));
    const i = this.deposit.push({ amount, date, week });
    const boo = this.IsOverLimit(i - 1);

    return boo;
  }

  IsOverLimit(i) {
    const obj = this.deposit[i];
    const filtered = this.deposit
      .filter((item) => obj.week == item.week)
      .map((val) => (val = val.amount));
    if (filtered.length === 1) {
      this.cap = this.week_limit;
    }
    const last = filtered[filtered.length - 1];

    let diff = this.cap - last;
    if (diff <= 0) {
      this.cap = 0;
      return Math.abs(diff);
    } else {
      this.cap -= last;
      return 0;
    }
  }
}
