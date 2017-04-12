import { expect } from 'chai'
import {
  getMonthCalendar,
  normalizeStyle,
  strFormat
} from '../src/calc'


describe('Test of getMonthCalendar', () => {


  it('should return weeks', () => {
    const weeks = getMonthCalendar(2017, 4)
    expect(weeks.length).to.be.above(3)
    expect(weeks.length).to.be.below(7)
  })
})

describe('Test of normalizeStyle', () => {
  it('should create slug:hover type object', () => {
    const actual = normalizeStyle({
      slug1: {
        someProp1: 'val1',
        someProp2: 'val2',

        ':hover': {
          someProp2: 'val2_overwriting',
          someProp3: 'val3',
        },
        ':focus': {
          someProp1: 'val1_overwriting',
        }
      },
      slug2: {
        someProp1: 'val1',
      }
    })
    const expected = {
      slug1: {
        someProp1: 'val1',
        someProp2: 'val2',
      },
      'slug1:hover': {
        someProp1: 'val1',
        someProp2: 'val2_overwriting',
        someProp3: 'val3',
      },
      'slug1:focus': {
        someProp1: 'val1_overwriting',
        someProp2: 'val2'
      },
      slug2: {
        someProp1: 'val1',
      },
      'slug2:hover': {
        someProp1: 'val1',
      },
      'slug2:focus': {
        someProp1: 'val1',
      },
    }
    expect(actual).to.deep.equal(expected)
  })
})


describe('Test of format', () => {
  it('should format text', () => {
    expect(strFormat('http://example.com/{year}/{month}/{day}', { year: 2017, month: 12, day: 10 }))
      .to.equal('http://example.com/2017/12/10')
  })
})
