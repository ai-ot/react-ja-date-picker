import React       from 'react'
import { shallow } from 'enzyme'
import { expect }  from 'chai'
import sinon       from 'sinon'
import DatePicker, { CLASS_PREFIX } from '../src/DatePicker.jsx'

/**
 * test helper to regularize class prefix
 * @param  {string} word [description]
 * @return {string}      [description]
 */
const getClass = word => '.' + CLASS_PREFIX + word

describe('1. DatePicker Component, ', () => {

  describe('1) prev and next button, ', () => {
    it('should render 2 buttons', () => {
      const wrapper = shallow(<DatePicker />)
      expect(wrapper.find(getClass('nav-button'))).to.have.length(2)
    })
    it('should render prev and next button', () => {
      const wrapper = shallow(<DatePicker />)
      expect(wrapper.find(getClass('nav-prev'))).to.have.length(1)
      expect(wrapper.find(getClass('nav-next'))).to.have.length(1)
    })

    it('should toggle month backward', () => {
      const wrapper = shallow(<DatePicker date={ '2017-05-01' } />)
      wrapper.find(getClass('nav-prev')).simulate('click')
      expect(wrapper.find(getClass('caption')).text()).to.contains('2017年4月')
    })

    it('should toggle month foward', () => {
      const wrapper = shallow(<DatePicker date={ '2017-05-01' } />)
      wrapper.find(getClass('nav-next')).simulate('click')
      expect(wrapper.find(getClass('caption')).text()).to.contains('2017年6月')
    })
  })

  describe('2) caption, ', () => {
    it('should render year年month月', () => {
      const wrapper = shallow(<DatePicker date={ '2017-12-01' } />)
      expect(wrapper.find(getClass('caption')).text()).to.contains('2017年12月')
    })
  })

  describe('3) Test of day, ', () => {
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

    it('should render 42 day link totally', () => {
      const wrapper = shallow(<DatePicker date={ '2017-12-01' } type={ 'link' } />)
      expect(wrapper.find('a' + getClass('day_link'))).to.have.length(42)
      expect(wrapper.find('td' + getClass('day'))).to.have.length(42)
    })

    it('should render 42 day buttons totally including previous month and next month', () => {
      const wrapper = shallow(<DatePicker date={ '2017-12-01' } type={ 'button' } />)
      expect(wrapper.find('button' + getClass('day_button'))).to.have.length(42)
      expect(wrapper.find('td' + getClass('day'))).to.have.length(42)
    })

    it('should render 1 holidays for December 2017', () => {
      const wrapper = shallow(<DatePicker date={ '2017-12-01' } />)
      expect(wrapper.find(getClass('holiday'))).to.have.length(1)
    })

    it('should call onSelect callback if type `buton` given', () => {
      const spy = sinon.spy()
      const wrapper = shallow(<DatePicker type={ 'button' } onSelect={ spy } />)
      wrapper.find('button' + getClass('day')).forEach(node => {
        node.simulate('click')
        expect(spy.calledOnce).to.be.ok
        spy.reset()
      })
    })
  })
})
