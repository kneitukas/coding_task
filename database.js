const NaturalUser = require('./user')

class Db {
    _users = [];

    constructor(configs) {
        this.configs = configs
    }

    GetOrCreateUser(id, type) {
        const user = this._users.find((usr) => usr.user_id == id);
        if (user == undefined | null) {
            if (type === 'natural') {
                const {week_limit} = this.configs.cashOut.natural
                const user = new NaturalUser(
                    id,
                    week_limit.amount
                  );
                this._users.push(user)
                return user
            }
        } else {
           return user
        }
    }
}

module.exports = Db;