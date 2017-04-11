import React, { PropTypes, Component } from 'react'
import moment from 'moment'
import DEFAULT_STYLE  from './style'
import { getMonthCalendar } from './calc'
import { normalizeStyle, strFormat }   from './lib'
import { weekLabels } from './config'

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
    }
  }

  /**
   * render
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

    /**
     * change next month
     * @return {void}
     */
    const moveFoward = () => {
      const nYear = (this.state.month + 1 > 12 ? this.state.year + 1 : this.state.year)
      const nMonth = (this.state.month + 1) % 12
      this.setState({ year: nYear, month: nMonth })
    }

    /**
     * change prev month
     * @return {void}
     */
    const moveBackward = () => {
      const nYear = (this.state.month - 1 == 0 ? this.state.year - 1 : this.state.year)
      const nMonth = (this.state.month - 1 == 0 ? 12 : this.state.month - 1)
      this.setState({ year: nYear, month: nMonth })
    }

    // parse props
    const type     = this.props.type
    const onSelect = this.props.onSelect
    const format   = this.props.format

    const getURL = typeof format === 'function' ?
      (year, month, day) => format(year, month, day) : // use it
      (year, month, day) => strFormat(format, year, month, day) // use embedded

    // parse style object
    const STYLE = normalizeStyle(DEFAULT_STYLE)

    // obtain date info
    const { year, month } = this.state

    /**
     * 当月の日の情報をまとめたオブジェクトを出力する
     * @type {array<array<{day:number,month:number,active:boolean,weekday:string,isHoliday:boolean}>>}
     */
    const thisMonth = getMonthCalendar(year, month)

    /**
     * render week labels as date picker table head component
     * @type {array<ReactComponent>}
     */
    const headRow = <tr>
      <th scope={ 'row' } style={ { display: 'none' } }>{ '週' }</th>
      { weekLabels.map(label => <th
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
     * render date picker table body component
     * @type {array<ReactComponent>}
     */
    const bodyRow = thisMonth.map((week, i) => <tr key={ `${month}-${i}` }>
      <th scope={ 'row' } style={ { display: 'none' } }>{ '第' + i + '週' }</th>
      { week.map(({ day, month, active, isHoliday }) => {

        const key = `month-day-${month}-${day}`

        return (<td
          className={ [
            'day',
            (active    ? 'active'     : 'not-active'),
            (isHoliday ? 'is-holiday' : 'is-weekday'),
          ].map(slug => CLASS_PREFIX + slug).join(' ') }
          key={ key }
          style={ isHovering(key) ? STYLE['day:hover'] : STYLE.day }
          onMouseEnter={ hoverOn(key) }
          onMouseLeave={ hoverOn(false) }
        >
          { type === 'link' ? // aタグとボタンタグを条件に応じて出力する
            <a
              className={ CLASS_PREFIX + 'day' }
              href={ getURL(year, month, day) }
              style={ STYLE.link }
            >{ day }</a> :
            <button
              className={ CLASS_PREFIX + 'day' }
              style={ STYLE.button }
              onClick={ () => onSelect(year, month, day) }
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
    const stylePrev = isHovering('button-prev') ?
      { ...STYLE['navButton:hover'], ...STYLE.navPrev } :
      { ...STYLE.navButton,          ...STYLE.navPrev }
      /**
       * ホバーしているかどうかに基づいて、来月に移動するボタンのクラスをオブジェクトの形式で生成する
       * @type {object}
       */
    const styleNext = isHovering('button-next') ?
      { ...STYLE['navButton:hover'], ...STYLE.navNext } :
      { ...STYLE.navButton,          ...STYLE.navNext }

    return (
      <div className={ CLASS_PREFIX + 'container' } style={ STYLE.container }>

        <div className={ CLASS_PREFIX + 'nav__wrap' } style={ STYLE.navWrap }>
          <button
            className={ CLASS_PREFIX + 'nav-button ' + CLASS_PREFIX + 'nav-prev' }
            style={ stylePrev }
            onClick={ moveBackward }
            onMouseEnter={ hoverOn('button-prev') }
            onMouseLeave={ hoverOn(false) }
          >{ '←' }</button>
          <button
            className={ CLASS_PREFIX + 'nav-button ' + CLASS_PREFIX + 'nav-next' }
            style={ styleNext }
            onClick={ moveFoward }
            onMouseEnter={ hoverOn('button-next') }
            onMouseLeave={ hoverOn(false) }
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
