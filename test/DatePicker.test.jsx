import React       from 'react'
import { shallow } from 'enzyme'
import { expect }  from 'chai'
import DatePicker, { CLASS_PREFIX } from '../src/DatePicker.jsx'

/**
 * test helper to regularize class prefix
 * @param  {string} word [description]
 * @return {string}      [description]
 */
const getClass = word => '.' + CLASS_PREFIX + word

describe('Test of DatePicker Component', () => {

  it('should render .calender-wrapper', () => {
    const wrapper = shallow(<DatePicker />)
    expect(wrapper.find('.calender-wrapper')).to.have.length(1)
  })

  it('should render 7 day label component', () => {
    const wrapper = shallow(<DatePicker />)
    expect(wrapper.find(getClass('week-label'))).to.have.length(7)
  })

  it('should render 31 days for December', () => {
    const wrapper = shallow(<DatePicker date={ '2017-12-01' } />)
    expect(wrapper.find(getClass('active'))).to.be.length(31)
  })

  it('should render 28 days for Febrary', () => {
    const wrapper = shallow(<DatePicker date={ '2017-02-01' } />)
    expect(wrapper.find(getClass('active'))).to.be.length(28)
  })

  it('should render 29 days for Febrary in leap year', () => {
    const wrapper = shallow(<DatePicker date={ '2016-02-01' } />)
    expect(wrapper.find(getClass('active'))).to.be.length(29)
  })

  it('should render year年month月', () => {
    const wrapper = shallow(<DatePicker date={ '2017-12-01' } />)
    expect(wrapper.find(getClass('caption')).text()).to.contains('2017年12月')
  })

  it('should render 42 day link totally', () => {
    const wrapper = shallow(<DatePicker date={ '2017-12-01' } type={ 'link' } />)
    expect(wrapper.find('a' + getClass('day'))).to.have.length(42)
  })

  it('should render 42 day buttons totally', () => {
    const wrapper = shallow(<DatePicker date={ '2017-12-01' } type={ 'button' } />)
    expect(wrapper.find('button' + getClass('day'))).to.have.length(42)
  })

  it('should render 1 holidays for December 2017', () => {
    const wrapper = shallow(<DatePicker date={ '2017-12-01' } />)
    expect(wrapper.find(getClass('is-holiday'))).to.have.length(1)
  })
})
