import { expect } from 'chai'
import { normalizeStyle } from '../src/lib'

describe.only('Test of normalizeStyle', () => {
  it('should create slug$hover type object', () => {
    const actual = normalizeStyle({
      slug: {
        someProp1: 'val1',
        someProp2: 'val2',

        '&:hover': {
          someProp2: 'val2_',
          someProp3: 'val3',
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
        someProp2: 'val2_',
        someProp3: 'val3',
      }
    }
    expect(actual).to.deep.equal(expected)
  })
})
