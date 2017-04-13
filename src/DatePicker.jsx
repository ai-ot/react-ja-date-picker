import React, { Component } from 'react'
import PropTypes            from 'prop-types'

import moment from 'moment'

import {
  getMonthCalendar,
  normalizeStyle,
  strFormat,
} from './calc'

import DEFAULT_STYLE from './style'
import config        from './config'

/**
 * internal classname prefix
 * @type {string}
 */
export const CLASS_PREFIX =  'react-ja-date-picker__'

/**
 * Define Calender Picker Component
 * @return {ReactComponent} React Component
 */
export default class DatePicker extends Component {

  /**
   * props type check
   * @type {Object}
   */
  static propTypes = {
    date     : PropTypes.string,
    format   : PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    type     : PropTypes.oneOf(['link', 'button']),
    onSelect : PropTypes.func,
  }

  /**
   * default values of props
   * @type {Object}
   */
  static defaultProps = {
    date     : '',
    format   : '#',
    type     : 'link',
    onSelect : x => x,
  }

  /**
   * initializ state
   * @public
   * @param  {Props} props given props
   * @return {void}
   */
  constructor(props) {
    super(props)
    const tmp = moment(this.props.date)
    const date = tmp.isValid() ? tmp : moment()
    this.state = {
      year     : date.year(),
      month    : date.month() + 1,
      hovering : false,
      focusing : false,
    }
  }

  /**
   * format prop overload with {string} or {function}
   * @param  {number} year  year
   * @param  {number} month month
   * @param  {number} day day
   * @return {string} the aimed URL string
   */
  getURL(year, month, day) {
    const result = typeof this.props.format === 'function' ?
      format(year, month, day) : // use it as it is
      strFormat(this.props.format, { year, month, day }) // use embedded
    return result
  }

  /**
   * check if a element with certain id is being hovered
   * @private
   * @param  {string}  id  given id
   * @return {boolean}     whether hoverring
   */
  isHovering(id) {
    return this.state ? this.state.hovering === id : false
  }

  /**
   * check if a elelment with certain id is being focused
   * @private
   * @param  {string}  id given id
   * @return {boolean}    whether focusing
   */
  isFocusing(id) {
    return this.state ? this.state.focusing === id : false
  }

  /**
   * create callback to set hoverirng state
   * @private
   * @param  {string|boolean} id giving id, or false to cancel it
   * @return {void}
   */
  hoverOn(id) {
    this.setState({ ...this.state, ...{ hovering: id } })
  }

  /**
   * create callback to set focusing state
   * @param  {string|boolean} id giving id, or false to cancel it
   * @return {void}
   */
  focusOn(id) {
    this.setState({ ...this.state, ...{ focusing: id } })
  }

  /**
   * change next month
   * @private
   * @return {void}
   */
  moveFoward() {
    const nYear = (this.state.month + 1 > 12 ? this.state.year + 1 : this.state.year)
    const nMonth = (this.state.month + 1) % 12
    this.setState({ year: nYear, month: nMonth })
  }

  /**
   * change prev month
   * @private
   * @return {void}
   */
  moveBackward() {
    const nYear = (this.state.month - 1 == 0 ? this.state.year - 1 : this.state.year)
    const nMonth = (this.state.month - 1 == 0 ? 12 : this.state.month - 1)
    this.setState({ year: nYear, month: nMonth })
  }

  /**
   * render
   * @return {ReactComponent} render a calender picker
   */
  render() {

    // parse props
    const type     = this.props.type
    const onSelect = this.props.onSelect

    // parse style object
    const STYLE = normalizeStyle(DEFAULT_STYLE)

    // parse state
    const { year, month } = this.state

    /**
     * render week labels as date picker table head component
     * @type {array<ReactComponent>}
     */
    const headRow = <tr>
      <th scope={ 'row' } style={ STYLE.srOnly }>{ '週' }</th>
      { config.weekLabels.ja.map(label => <th
        className={ CLASS_PREFIX + 'week-label' }
        key={ 'weeklabel-' + label }
        scope={ 'col' }
        style={ STYLE.weekLabel }
      >
        { label }
      </th>
      ) }
    </tr>

    /**
     * 当月の日の情報をまとめたオブジェクトを出力する
     * @type {array<array<{day:number,month:number,active:boolean,weekday:string,isHoliday:boolean}>>}
     */
    const thisMonth = getMonthCalendar(year, month)

    /**
     * render date picker table body component
     * @type {array<ReactComponent>}
     */
    const bodyRow = thisMonth.map((week, i) => <tr key={ `${month}-${i + 1}` }>
      <th scope={ 'row' } style={ STYLE.srOnly }>{ `第${i + 1}週` }</th>
      { week.map(({ day, month, active, isHoliday }) => {

        const key = `month-day-${month}-${day}`

        return (<td
          className={ [
            'day',
            (active    ? 'active'     : 'not-active'),
            (isHoliday ? 'is-holiday' : 'is-weekday'),
          ].map(slug => CLASS_PREFIX + slug).join(' ') }
          key={ key }
          style={ this.isHovering(key) ? STYLE['day:hover'] : STYLE.day }
          onMouseEnter={ () => this.hoverOn(key) }
          onMouseLeave={ () => this.hoverOn(false) }
        >
          { type === 'link' ? // aタグとボタンタグを条件に応じて出力する
            <a
              className={ CLASS_PREFIX + 'day' }
              href={ this.getURL(year, month, day) }
              style={ this.isFocusing(`${year}-${month}-${day}`) ? STYLE['link:focus'] : STYLE.link }
              onBlur={ () => this.focusOn(false) }
              onFocus={ () => this.focusOn(`${year}-${month}-${day}`) }
            >{ day }</a> :
            <button
              className={ CLASS_PREFIX + 'day' }
              style={ this.isFocusing(`${year}-${month}-${day}`) ? STYLE['day:focus'] : STYLE.day }
              onBlur={ () => this.focusOn(false) }
              onClick={ () => onSelect(year, month, day) }
              onFocus={ () => this.focusOn(`${year}-${month}-${day}`) }
              onMouseEnter={ false }
            >{ day }</button>
          }
        </td>)
      }) }
    </tr>)

    // generate each style for buttons
    /**
     * ホバーしているかどうかに基づいて、先月に移動するボタンのクラスをオブジェクトの形式で生成する
     * @type {object}
     */
    const stylePrev = this.isHovering('button-prev') ?
      { ...STYLE['navButton:hover'], ...STYLE.navPrev } :
      { ...STYLE.navButton,          ...STYLE.navPrev }
      /**
       * ホバーしているかどうかに基づいて、来月に移動するボタンのクラスをオブジェクトの形式で生成する
       * @type {object}
       */
    const styleNext = this.isHovering('button-next') ?
      { ...STYLE['navButton:hover'], ...STYLE.navNext } :
      { ...STYLE.navButton,          ...STYLE.navNext }

    return (
      <div className={ CLASS_PREFIX + 'container' } style={ STYLE.container }>

        <div className={ CLASS_PREFIX + 'nav__wrap' } style={ STYLE.navWrap }>
          <button
            className={ CLASS_PREFIX + 'nav-button ' + CLASS_PREFIX + 'nav-prev' }
            style={ stylePrev }
            onClick={ () => this.moveBackward() }
            onMouseEnter={ () => this.hoverOn('button-prev') }
            onMouseLeave={ () => this.hoverOn(false) }
          >{ '←' }</button>
          <button
            className={ CLASS_PREFIX + 'nav-button ' + CLASS_PREFIX + 'nav-next' }
            style={ styleNext }
            onClick={ () => this.moveFoward() }
            onMouseEnter={ () => this.hoverOn('button-next') }
            onMouseLeave={ () => this.hoverOn(false) }
          >{ '→' }</button>
        </div>

        <div className={ CLASS_PREFIX + 'month' } style={ STYLE.month }>

          <table>

            <caption className={ CLASS_PREFIX + 'caption' } style={ STYLE.caption }>
              <strong>{ `${year}年${month}月` }</strong>
            </caption>

            <thead className={ CLASS_PREFIX + 'week' } style={ STYLE.week }>{ headRow }</thead>

            <tbody className={ CLASS_PREFIX + 'month-grid' } style={ STYLE.monthGrid }>{ bodyRow }</tbody>

          </table>
        </div>

      </div>
    )
  }
}
