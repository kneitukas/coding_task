class User {
  constructor(id) {
    this.deposit = [];
    this.user_id = id;
  }
}

class NaturalUser extends User {
  constructor(id, week_limit, curentWeek) {
    super(id);
    this.week_limit = week_limit;
    this.curentWeek = curentWeek;
  }

  AddToTotal(amount, date) {
    const week = GetWeek(new Date(date));
    const i = this.deposit.push({ amount, date, week });
    const boo = this.IsOverLimit(i - 1);
    console.log(boo)
    return boo ? amount : false
  }

  IsOverLimit(i, amount) {
    const obj = this.deposit[i];
    const filtered = this.deposit
      .filter((item) => obj.week == item.week)
      .map((val) => (val = val.amount));
    const total = filtered.reduce((acc, curr) => acc + curr);
     if (total - amount < this.week_limit) {
        return amount - this.week_limit;
     }
    return true
  }
}

module.exports = User;
module.exports = NaturalUser;

function GetWeek(dt) {
  var date = dt;
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
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
