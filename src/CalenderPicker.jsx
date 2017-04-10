import React, { PropTypes, Component } from 'react'
import moment from 'moment'
import STYLE  from './style'
import { getMonthCalendar }     from './calc'

/**
 * internal classname prefix
 * @type {string}
 */
export const CLASS_PREFIX =  'calender-picker__'

/**
 * Define Calender Picker Component
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
    type: 'link',
  }

  /**
   * initializ state
   * @param  {Props} props given props
   * @return {void}
   */
  constructor(props) {
    super(props)
    const date = moment(this.props.date)
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
    const nextMonth = () => {
      const nYear = (this.state.month + 1 > 12 ? this.state.year + 1 : this.state.year)
      const nMonth = (this.state.month + 1) % 12
      this.setState({ year: nYear, month: nMonth })
    }

    /**
     * change prev month
     * @return {void}
     */
    const prevMonth = () => {
      const nYear = (this.state.month - 1 == 0 ? this.state.year - 1 : this.state.year)
      const nMonth = (this.state.month - 1 == 0 ? 12 : this.state.month - 1)
      this.setState({ year: nYear, month: nMonth })
    }

    // parse props
    const type = this.props.type

    // obtain date info
    const { year, month } = this.state

    /**
     * 当月の日の情報をまとめたオブジェクトを出力する
     * @type {array<array<{day:number,month:number,active:boolean,weekday:string,isHoliday:boolean}>>}
     */
    const thisMonth = getMonthCalendar(year, month)

    // NOTE:
    // classNameプロパティとstyleプロパティは動的に生成したいです。こんな感じ
    // ```
    // const cssProps = (slug, hover) => ({
    //  className: CLASS_PREFIX + slug,
    //  style: hover && isHovering(slug) ?
    //    { ...STYLE[slug], ...STYLE[slug].$hover } :
    //    STYLE[slug],
    //  onMouseEnter: hover ? hoverOn(slug)  : false,
    //  onMouseLeave: hover ? hoverOn(false) : false
    // })
    //
    // return <element ...cssProps('element', true) />
    // ```

    /**
     * 当月の日をリストアップして出力する
     * @type {array<ReactComponent>}
     */
    const thisList = thisMonth.map((week, i) => <tr key={ `${month}-${i}` }>
      { week.map(({ day, month, active, isHoliday }, j) => {

        const key = `month-day-${month}-${day}`
        const tdStyle = isHovering(key) ? { ...STYLE.day, ...STYLE.day$hover } : STYLE.day

        return (<td
          className={ `${CLASS_PREFIX + 'day'}
            ${CLASS_PREFIX + (active ? 'active' : 'not-active')}
            ${CLASS_PREFIX + (isHoliday ? 'is-holiday' : 'is-weekday')}` }
          key={ `${month}-${i}-day-${j}` }
          style={ tdStyle }
          onMouseEnter={ hoverOn(key) }
          onMouseLeave={ hoverOn(false) }
        >
          { type === 'link' ? // aタグとボタンタグを条件に応じて出力する
            <a
              className={ CLASS_PREFIX + 'day' }
              href={ `http://example/${year}/${month}/${day}` }
              style={ STYLE.link }
            >{ day }</a> :
            <button
              className={ CLASS_PREFIX + 'day' }
              style={ STYLE.button }
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
      { ...STYLE.navButton, ...STYLE.navPrev, ...STYLE.navButton$hover } :
      { ...STYLE.navButton, ...STYLE.navPrev }
      /**
       * ホバーしているかどうかに基づいて、来月に移動するボタンのクラスをオブジェクトの形式で生成する
       * @type {object}
       */
    const styleNext = isHovering('button-next') ?
      { ...STYLE.navButton, ...STYLE.navNext, ...STYLE.navButton$hover } :
      { ...STYLE.navButton, ...STYLE.navNext }

    return (
      <div className={ 'calender-wrapper' }>
        <div className={ CLASS_PREFIX + 'container' } style={ STYLE.container }>
          <div className={ CLASS_PREFIX + 'nav__wrap' } style={ STYLE.navWrap }>
            <button
              className={ CLASS_PREFIX + 'nav__button ' + CLASS_PREFIX + 'nav__prev' }
              style={ stylePrev }
              onClick={ prevMonth }
              onMouseEnter={ hoverOn('button-prev') }
              onMouseLeave={ hoverOn(false) }
            >{'←'}</button>
            <button
              className={ CLASS_PREFIX + 'nav__button ' + CLASS_PREFIX + 'nav__next' }
              style={ styleNext }
              onClick={ nextMonth }
              onMouseEnter={ hoverOn('button-next') }
              onMouseLeave={ hoverOn(false) }
            >{'→'}</button>
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
