import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import moment from 'moment'
import update from 'immutability-helper'

import {
  getMonthCalendar,
  normalizeStyle,
  strFormat,
  snake2camel,
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
      styles   : normalizeStyle(DEFAULT_STYLE),
      hovering : false,
      focusing : false,
    }
  }

  /**
   * generate static className and style objects
   * @param  {array<string>|string} slug your slug in snake-case
   * @return {{className:string,style:cssInJs}} generated object
   */
  classStyle(slug) {
    const result = {
      className : CLASS_PREFIX + slug,
      style     : this.state.styles[snake2camel(slug)]
    }
    return result
  }

  /**
   * manage hover status
   * @param  {string} id id
   * @return {{onMouseEnter:function,onMouseLeave:function}}  eventHandlers
   */
  enableHover(id) {
    return ({
      onMouseEnter: () => this.hoverOn(id),
      onMouseLeave: () => this.hoverOn(false)
    })
  }

  /**
   * manage focus status
   * @param  {string} id id
   * @return {{onBlur:function,onFocus:function}}  eventHandlers
   */
  enableFocus(id) {
    return ({
      onBlur  : () => this.focusOn(false),
      onFocus : () => this.focusOn(id)
    })
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
   * @param  {string}  id  given id
   * @return {boolean}     whether hoverring
   */
  isHovering(id) {
    return this.state ? this.state.hovering === id : false
  }

  /**
   * check if a elelment with certain id is being focused
   * @param  {string}  id given id
   * @return {boolean}    whether focusing
   */
  isFocusing(id) {
    return this.state ? this.state.focusing === id : false
  }

  /**
   * create callback to set hoverirng state
   * @param  {string|boolean} id giving id, or false to cancel it
   * @return {void}
   */
  hoverOn(id) {
    this.setState(update(this.state, { hovering: { $set: id } }))
  }

  /**
   * create callback to set focusing state
   * @param  {string|boolean} id giving id, or false to cancel it
   * @return {void}
   */
  focusOn(id) {
    this.setState(update(this.state, { focusing: { $set: id } }))
  }

  /**
   * change next month
   * @return {void}
   */
  moveMonthFoward() {
    const nYear = (this.state.month + 1 > 12 ? this.state.year + 1 : this.state.year)
    const nMonth = (this.state.month == 12 ? 1 : this.state.month + 1)
    this.setState(update(this.state, { year: { $set: nYear }, month: { $set: nMonth } }))
  }

  /**
   * change prev month
   * @return {void}
   */
  moveMonthBackward() {
    const nYear = (this.state.month - 1 == 0 ? this.state.year - 1 : this.state.year)
    const nMonth = (this.state.month - 1 == 0 ? 12 : this.state.month - 1)
    this.setState(update(this.state, { year: { $set: nYear }, month: { $set: nMonth } }))
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
      <th
        scope={ 'row' }
        { ...this.classStyle('sr-only') }
      >{ '週' }</th>

      { config.weekLabels.ja.map(label => <th
        key={ 'weeklabel-' + label }
        scope={ 'col' }
        { ...this.classStyle('week-label') }
      >{ label }</th>
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
    const bodyRows = thisMonth.map((week, i) => <tr key={ `${month}-${i + 1}` }>
      <th
        scope={ 'row' }
        { ...this.classStyle('sr-only') }
      >{ `第${i + 1}週` }</th>

      { week.map(({ day, month, active, weekday, isHoliday }) => {

        const key = `month-day-${year}-${month}-${day}`

        /**
         * deprecated
         * NOTE: これは、CSS-in-JSのようなものを試そうとした名残
         * v2.0.0では廃止して外部のライブラリ導入を目指す
         * @type {Object}
         */
        const style = {
          ...STYLE.day, // 普通のやつ
          ...(active ? STYLE.active : STYLE.notActive),     // 活不活
          ...(STYLE[weekday]),                 // 週日
          ...(isHoliday ? STYLE.holiday : {}), // 祝日
          ...(this.isHovering(key) ? STYLE['day:hover'] : {}), // ホバーしている時
        }

        return (<td
          className={ [
            'day',
            (active    ? 'active'  : 'not-active'),
            (isHoliday ? 'holiday' : 'weekday'),
          ].map(slug => CLASS_PREFIX + slug).join(' ') }
          key={ key }
          style={ style }
          { ...this.enableHover(key) }
        >{ type === 'link' ? // exports <a> or <button>
          <a
            className={ CLASS_PREFIX + 'day_' + type }
            href={ this.getURL(year, month, day) }
            style={ this.isFocusing(key) ? STYLE['link:focus'] : STYLE.link }
            { ...this.enableFocus(key) }
            onClick={ () => onSelect(year, month, day) }
          >{ day }</a> :
          <button
            className={ CLASS_PREFIX + 'day_' + type }
            style={ this.isFocusing(key) ? STYLE['button:focus'] : STYLE.button }
            { ...this.enableFocus(key) }
            onClick={ () => onSelect(year, month, day) }
          >{ day }</button>

        }</td>)
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
      <div { ...this.classStyle('container') }>

        <nav { ...this.classStyle('navigation') }>

          <button
            className={ CLASS_PREFIX + 'nav-button ' + CLASS_PREFIX + 'nav-prev' }
            onClick={ () => this.moveMonthBackward() }
            style={ stylePrev }
            { ...this.enableHover('button-prev') }
          >{ '←' }</button>
          <button
            className={ CLASS_PREFIX + 'nav-button ' + CLASS_PREFIX + 'nav-next' }
            onClick={ () => this.moveMonthFoward() }
            style={ styleNext }
            { ...this.enableHover('button-next') }
          >{ '→' }</button>

        </nav>

        <div { ...this.classStyle('calender') }>

          <table>

            <caption { ...this.classStyle('caption') }>{ `${year}年${month}月` }</caption>

            <thead { ...this.classStyle('week-labels') }>{ headRow }</thead>

            <tbody { ...this.classStyle('calender-grid') }>{ bodyRows }</tbody>

          </table>

        </div>

      </div>
    )
  }
}
