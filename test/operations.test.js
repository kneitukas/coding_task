import Operations from '../src/operations.js'

import pkg from 'chai'
const { expect } = pkg;

const samples = {
    cashIn: { date: "2016-01-05", user_id: 1, user_type: "natural", type: "cash_in", operation: { amount: 200.00, currency: "EUR" } },
    freeCashout: { date: "2016-01-05", user_id: 1, user_type: "natural", type: "cash_out", operation: { amount: 200.00, currency: "EUR" } },
    cashout: { date: "2016-01-05", user_id: 2, user_type: "natural", type: "cash_out", operation: { amount: 1200.00, currency: "EUR" } },
    cashOutNextWeek: { date: "2016-01-24", user_id: 2, user_type: "natural", type: "cash_out", operation: { amount: 700.00, currency: "EUR" } },
}


describe('Operations', () => {
    it('should return a commision from amount (cash-in)', () => {
        const cashIn = Operations.NewCashInOperation(samples.cashIn)
        expect(cashIn).equal(0.06)
    })
    it('should return 0 from amount (free cash-out)', () => {
        const cashOut = Operations.NewCashOutOperation(samples.freeCashout)
        expect(cashOut).equal(0)
    })
    it('should return a commision from amount (cash-out)', () => {
        const cashOut = Operations.NewCashOutOperation(samples.cashout)
        expect(cashOut).equal(0.6)
    })
    it('limit should reset on next week', () => {
        const cashOut = Operations.NewCashOutOperation(samples.cashOutNextWeek)
        expect(cashOut).equal(0)
    })
})