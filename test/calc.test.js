import { expect } from 'chai'
import {
  getMonthCalendar,
  normalizeStyle,
  strFormat,
  camel2snake,
  snake2camel
} from '../src/calc'
import config        from '../src/config'

describe('Test of getMonthCalendar', () => {
  it('should return weeks', () => {
    const weeks = getMonthCalendar(2017, 4)
    expect(weeks.length).to.be.above(3)
    expect(weeks.length).to.be.below(7)
  })

  it('should return 2017 April 1st as Saturday', () => {
    const weeks = getMonthCalendar(2017, 4)
    expect(weeks[0][6].day).to.equal(1)
    expect(weeks[0][6].weekday).to.equal('saturday')
  })

  it('should have same string classes described in configuration', () => {
    const weeks = getMonthCalendar(2017, 4)
    for (var i = 0 ; i < config.weekLabels.en.length ; i++) {
      expect(weeks[0][i].weekday).to.equal(config.weekLabels.en[i])
    }
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

describe('test of camel2snake', () => {
  it('should convert', () => {
    expect(camel2snake('aaBbCc')).to.equal('aa-bb-cc')
  })
})

describe('test of snake2camel', () => {
  it('should convert', () => {
    expect(snake2camel('dd-ee-ff')).to.equal('ddEeFf')
  })
})
