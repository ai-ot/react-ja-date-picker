import { expect } from 'chai'
import { getMonthCalendar } from '../src/calc'


describe('Test of getMonthCalendar', () => {
  it('should return weeks', () => {
    const weeks = getMonthCalendar(2017, 4)
    expect(weeks.length).toBe.above(3)
    expect(weeks.length).toBe.below(7)
  })
})
