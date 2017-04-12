import { expect } from 'chai'
import { normalizeStyle, strFormat } from '../src/lib'

describe('Test of normalizeStyle', () => {
  it('should create slug:hover type object', () => {
    const actual = normalizeStyle({
      slug: {
        someProp1: 'val1',
        someProp2: 'val2',

        ':hover': {
          someProp2: 'val2_overwriting',
          someProp3: 'val3',
        },
        ':focus': {
          someProp1: 'val1_overwriting',
        }
      }
    })
    const expected = {
      slug: {
        someProp1: 'val1',
        someProp2: 'val2',
      },
      'slug:hover': {
        someProp1: 'val1',
        someProp2: 'val2_overwriting',
        someProp3: 'val3',
      },
      'slug:focus': {
        someProp1: 'val1_overwriting',
        someProp2: 'val2'
      }
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
