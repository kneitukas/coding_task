class User {
  constructor(id) {
    this.deposit = [];
    this.user_id = id;
  }
}

class NaturalUser extends User {
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
    const diff = Diff(last, this.cap);
    if (this.cap) {
      this.cap = this.week_limit - diff;

      if (this.cap <= 0) {
        this.cap = 0;
      } else {
        return 0
      }
    }
    return diff;

    function Diff(a, b) {
      return Math.abs(a - b);
    }
  }
}

module.exports = User;
module.exports = NaturalUser;

function GetWeek(dt) {
  var date = dt;
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  var week1 = new Date(date.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}
