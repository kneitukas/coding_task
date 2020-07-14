const NaturalUser = require('./user')

class Db {
    _users = [];

    constructor(configs) {
        this.configs = configs
    }

     GetUserById (id) {
       const index = this._users.findIndex((usr) => usr.user_id == id);
       return users[index]
    }

    GetOrCreateUser(id, type) {

        const index = this._users.findIndex((usr) => usr.user_id == id);
   
        if (index === -1) {
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
           return this._users[index]
        }
    }
}

module.exports = Db;