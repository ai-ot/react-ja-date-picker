import { expect } from 'chai'
import { normalizeStyle } from '../src/lib'

describe.skip('Test of normalizeStyle', () => {
  it('should create slug$hover type object', () => {
    const actual = normalizeStyle({
      slug: {
        someProp1: 'val0',
        $hover: {
          someProp1: 'val1',
          someProp2: 'val3'
        }
      }
    })
    expect(actual.slug.slug$hover.someProp1).toEqual('val1')
    expect(actual.slug.slug$hover.someProp2).toEqual('val2')
  })

  it('should erase $hover object', () => {
    const actual = normalizeStyle({
      slug: {
        someProp: 'val1',
        $hover: {
          someProp: 'val2'
        }
      }
    })
    expect(actual.slug.$hover).toBe.Undefined()
  })
})
