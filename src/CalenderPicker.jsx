import React from 'react'
import moment from 'moment'

/**
 * reply 2017 holiday
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
 * Calender Component
 * @param  {object}         props props
 * @return {ReactComponent} render a calender
 */
export default props => {

  const date = moment(props.date)
  const type = props.type

  const month = date.month() + 1
  const year = date.year()

  /**
   * wrap element with button or anchor
   * @param  {Element} elem DOMElement
   * @return {Element}      DOMElement
   */
  const wrap = elem => type === 'button' ? <button>{ elem }</button> : <a href={ '#' }>{ elem }</a>

//  console.log(getMonthCalendar(2017, 4))
  const thisMonth = getMonthCalendar(year, month)
  let thisList = []
  for (var tr in thisMonth){
    thisList.push(<tr>
      <td className="calender-picker__day">{ wrap(thisMonth[tr][0].day) }</td>
      <td className="calender-picker__day">{ wrap(thisMonth[tr][1].day) }</td>
      <td className="calender-picker__day">{ wrap(thisMonth[tr][2].day) }</td>
      <td className="calender-picker__day">{ wrap(thisMonth[tr][3].day) }</td>
      <td className="calender-picker__day">{ wrap(thisMonth[tr][4].day) }</td>
      <td className="calender-picker__day">{ wrap(thisMonth[tr][5].day) }</td>
      <td className="calender-picker__day">{ wrap(thisMonth[tr][6].day) }</td>
    </tr>)
  }

  const nextMonth = getMonthCalendar(year, month + 1)
  let nextList = []
  for (var tr in nextMonth){
    nextList.push(<tr>
      <td className="calender-picker__day">{ wrap(nextMonth[tr][0].day) }</td>
      <td className="calender-picker__day">{ wrap(nextMonth[tr][1].day) }</td>
      <td className="calender-picker__day">{ wrap(nextMonth[tr][2].day) }</td>
      <td className="calender-picker__day">{ wrap(nextMonth[tr][3].day) }</td>
      <td className="calender-picker__day">{ wrap(nextMonth[tr][4].day) }</td>
      <td className="calender-picker__day">{ wrap(nextMonth[tr][5].day) }</td>
      <td className="calender-picker__day">{ wrap(nextMonth[tr][6].day) }</td>
    </tr>)
  }
  //　ここ以下どうにかする
  return (
    <div className={ 'calender-wrapper' }>
      <div className={ 'calender-picker__container' }>
        <div className={ 'calender-picker__navigation' }>
          <span　className={ 'calender-picker__navigation__button calender-picker__navigation__prev' }>{'←'}</span>
          <span　className={ 'calender-picker__navigation__button calender-picker__navigation__next' }>{'→'}</span>
        </div>

        <div className={ 'calender-picker__month' }>
          <div className={ 'calender-picker__caption' }>
            <strong>{ (month) + '月'}</strong>
          </div>
          <table>
            <thead className={ 'calender-picker__week' }>
              <tr>
                <td>{'月'}</td>
                <td>{'火'}</td>
                <td>{'水'}</td>
                <td>{'木'}</td>
                <td>{'金'}</td>
                <td>{'土'}</td>
                <td>{'日'}</td>
              </tr>
            </thead>

            <tbody className={ 'calender-picker__month__grid' }>
              { thisList }
            </tbody>
          </table>
        </div>
        <div className={ 'calender-picker__month' }>
          <div className={ 'calender-picker__caption' }>
            <strong>{ (month + 1) + '月'}</strong>
          </div>

          <table>
            <thead className={ 'calender-picker__week' }>
              <tr>
                <td>{'月'}</td>
                <td>{'火'}</td>
                <td>{'水'}</td>
                <td>{'木'}</td>
                <td>{'金'}</td>
                <td>{'土'}</td>
                <td>{'日'}</td>
              </tr>
            </thead>

            <tbody className={ 'calender-picker__month__grid' }>
              { nextList }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
