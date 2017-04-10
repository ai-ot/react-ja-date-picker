import React, { PropTypes, Component } from 'react'
import moment from 'moment'
import STYLE  from './style'
import {}     from './calc'

/**
 * internal classname prefix
 * @type {string}
 */
export const CLASS_PREFIX =  'calender-picker__'

/**
 * generate 2017 holiday
 * @return {array<string>} holidays
 */
const getHolidays = () => {
  return [
    '2017-01-01',
    '2017-01-02',
    '2017-02-11',
    '2017-03-20',
    '2017-04-29',
    '2017-05-03',
    '2017-05-04',
    '2017-05-05',
    '2017-07-17',
    '2017-08-11',
    '2017-09-18',
    '2017-09-23',
    '2017-10-09',
    '2017-11-03',
    '2017-11-23',
    '2017-12-23',
  ]
}

/**
 * 指定した月のカレンダーを返してくれます
 * @param  {number} year  year
 * @param  {number} month month
 * @return {array<{day:number, month:number, active:boolean, weekday:string, isHoliday:boolean}>} day information object
 */
const getMonthCalendar = (year, month) => {
  const first = moment(`${year}-${month}-01`)
  const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const monthDays = []
  const holidays = getHolidays()
  const idx = moment(`${year}-${month}-01`)
  idx.subtract(idx.weekday() - 1, 'days').calendar()

  // 第1週から第6週までをイテレート
  for (var i = 0 ; i < 6 ; i++ ) {
    monthDays.push([])
    // 日曜から土曜までをいてレート
    for (var j = 0 ; j < 7 ; j++ ) {
      monthDays[i].push({
        day: idx.date(),
        month: idx.month() + 1,
        active: (idx.month() + 1 == month),
        weekday: weekdays[idx.weekday()],
        isHoliday: holidays.indexOf(idx.format('YYYY-MM-DD')) == 0
      })
      idx.add(1, 'days')
    }
  }
  return monthDays
}

/**
 * Define Calender Picker
 * @return {ReactComponent} React Component
 */
export default class CalenderPicker extends Component {

  /**
   * props type check
   * @type {Object}
   */
  static propTypes = {
    date: PropTypes.string,
    type: PropTypes.string,
  }

  /**
   * default values of props
   * @type {Object}
   */
  static defaultProps = {
    date: '',
    type: 'link'
  }

  /**
   * render
   * @param  {object} state components state
   * @return {ReactComponent} render a calender picker
   */
  render() {

    /**
     * check if a element with certain id is being hovered
     * @param  {string}  id  given id
     * @return {boolean}     whether hoverring
     */
    const isHovering = id => this.state ? this.state.hovering === id : false

    /**
     * create callback to set hoverirng state
     * @param  {string|boolean} id giving id, or false to cancel it
     * @return {function} callback to set state
     */
    const hoverOn = id => () => this.setState({ ...this.state, ...{ hovering: id } })

    // parse props
    const date = moment(this.props.date)
    const type = this.props.type

    // obtain date info
    const month = date.month() + 1
    const year = date.year()

  //  console.log(getMonthCalendar(2017, 4))
    const thisMonth = getMonthCalendar(year, month)

    const thisList = thisMonth.map((week, i) => <tr key={ `${month}-${i}` }>
      { week.map(({ day, month }, j) => {

        const key = `month-day-${month}-${day}`
        const tdStyle = isHovering(key) ? { ...STYLE.day, ...STYLE.day$hover } : STYLE.day

        return (<td
          className={ CLASS_PREFIX + 'day' }
          key={ `${month}-${i}-day-${j}` }
          style={ tdStyle }
          onMouseEnter={ hoverOn(key) }
          onMouseLeave={ hoverOn(false) }
        >
          { type === 'link' ?
            <a
               style={ STYLE.link }
               href={ `http://example/${year}/${month}/${day}` }>{ day }</a> :
            <button
              style={ STYLE.button }>{ day }</button>
          }
        </td>)
      }) }
    </tr>)

    // generate each style for buttons
    const stylePrev = isHovering('button-prev') ?
      { ...STYLE.navButton, ...STYLE.navPrev, ...STYLE.navButton$hover } :
      { ...STYLE.navButton, ...STYLE.navPrev }
    const styleNext = isHovering('button-next') ?
      { ...STYLE.navButton, ...STYLE.navNext, ...STYLE.navButton$hover } :
      { ...STYLE.navButton, ...STYLE.navNext }

    return (
      <div className={ 'calender-wrapper' }>
        <div className={ CLASS_PREFIX + 'container' } style={ STYLE.container }>
          <div className={ CLASS_PREFIX + 'nav__wrap' } style={ STYLE.navWrap }>
            <span
              className={ CLASS_PREFIX + 'nav__button ' + CLASS_PREFIX + 'nav__prev' }
              style={ stylePrev }
              onMouseEnter={ hoverOn('button-prev') }
              onMouseLeave={ hoverOn(false) }
            >{'←'}</span>
            <span
              className={ CLASS_PREFIX + 'nav__button ' + CLASS_PREFIX + 'nav__next' }
              style={ styleNext }
              onMouseEnter={ hoverOn('button-next') }
              onMouseLeave={ hoverOn(false) }
            >{'→'}</span>
          </div>

          <div className={ CLASS_PREFIX + 'month' } style={ STYLE.month }>
            <div className={ CLASS_PREFIX + 'caption' } style={ STYLE.caption }>
              <strong>{ (year) + '年' + (month) + '月' }</strong>
            </div>
            <table>
              <thead className={ CLASS_PREFIX + 'week' } style={ STYLE.week }>
                <tr>
                  <td className={ CLASS_PREFIX + 'week-label' } style={ STYLE.weekLabel }>{'月'}</td>
                  <td className={ CLASS_PREFIX + 'week-label' } style={ STYLE.weekLabel }>{'火'}</td>
                  <td className={ CLASS_PREFIX + 'week-label' } style={ STYLE.weekLabel }>{'水'}</td>
                  <td className={ CLASS_PREFIX + 'week-label' } style={ STYLE.weekLabel }>{'木'}</td>
                  <td className={ CLASS_PREFIX + 'week-label' } style={ STYLE.weekLabel }>{'金'}</td>
                  <td className={ CLASS_PREFIX + 'week-label' } style={ STYLE.weekLabel }>{'土'}</td>
                  <td className={ CLASS_PREFIX + 'week-label' } style={ STYLE.weekLabel }>{'日'}</td>
                </tr>
              </thead>

              <tbody className={ CLASS_PREFIX + 'month__grid' } style={ STYLE.monthGrid }>
                { thisList }
              </tbody>

            </table>
          </div>

        </div>
      </div>
    )
  }
}
