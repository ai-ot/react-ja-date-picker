import React          from 'react'
import { shallow }    from 'enzyme'
import { expect }     from 'chai'
import CalenderPicker from '../src/CalenderPicker.jsx'


describe('Test of CalenderPicker Component', () => {

  it('should render .calender-wrapper', () => {
    const wrapper = shallow(<CalenderPicker />)
    expect(wrapper.find('.calender-wrapper')).to.have.length(1)
  })

  it('should render 7 day label component', () => {
    const wrapper = shallow(<CalenderPicker />)
    expect(wrapper.find('.day-label')).to.have.length(7)
  })

  it('should render 31 days for December', () => {
    const wrapper = shallow(<CalenderPicker date={ '2017/12/1' } />)
    expect(wrapper.find('.day')).to.be.length(31)
  })
})
