import { expect } from 'chai'
import { calculateAwesome } from '../src/lib'


describe('Test of lib', () => {
  it('should do something awesome', () => {
    expect(calculateAwesome('something')).to.be('awesome!')
  })
})
