import { Db } from '../database.js'
import Configs  from '../configs.js'
import pkg from 'chai'
const { expect } = pkg;


describe('Db', function () {
    let dbInstance;
    before( async function() {
        await Configs.LoadConfigs()
    })
    it('Should create a and return a db instance', async function () {
        dbInstance = new Db()
        expect(dbInstance).with.property('_users')
    })
    it('GetOrCreateUser should push user to an array and return the user', function() {
        let user = dbInstance.GetOrCreateUser(1,'natural')
        expect(user).not.empty
        expect(dbInstance).property('_users').have.length('1')
    })
    
})