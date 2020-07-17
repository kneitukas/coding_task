import Configs from '../configs.js'
import pkg from 'chai'
const {expect} = pkg;



describe('Configs', function() {
    it('should return a config object', async function() {
        const conf = await Configs.LoadConfigs()
            expect(conf).have.keys(['cashIn', 'cashOut']).not.be.empty
        })    
    })
