import { NaturalUser } from "./user.js";
import Configs from './configs.js'

export class Db {
  _users = [];

  constructor() {
    this.configs = Configs.GetConfigs();
  }

  GetUsers() {
    return this._users[0]
  }

  GetOrCreateUser(id, type) {
    const user = this._users.find((usr) => usr.user_id == id);
    if (!user) {
      if (type === "natural") {
        const { week_limit } = this.configs.cashOut.natural;
        const newUser = new NaturalUser(id, week_limit.amount);
        this._users.push(newUser);
        return newUser;
      }
    } else {
      return user;
    }
  }
}

export default new Db()
