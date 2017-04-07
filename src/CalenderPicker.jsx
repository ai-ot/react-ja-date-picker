import React from 'react'
import moment from 'moment'
/**
 * reply 2017 holiday
 * @return {[array]} [holidays]
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
 * [指定した月のカレンダーを返してくれます]
 * @param  {[string]} year  [year]
 * @param  {[string]} month [month]
 * @return {[array]}        [[week1[{monday},{tueday}...],week2[..],...]]
 */
const getMonthCalendar = (year, month) => {
  const first = moment(`${year}-${month}-01`)
  let weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  let monthDays = []
  const holidays = getHolidays()
  let idx = moment(`${year}-${month}-01`)
  idx.subtract(idx.weekday() - 1, 'days').calendar()

  for (var i = 0 ; i < 6 ; i++ ) {
    monthDays.push([])
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
 * @return {ReactComponent}       render a calender
 */
export default props => {

  const name = props.name
  const fruits = ['apple', 'banana', 'melon']

  const month = 4
  const year = 2017
//  console.log(getMonthCalendar(2017, 4))
  const monthDays = [
    [ // 第1週
      { day: 27, month: 3, active: false, weekday: 'monday',    isHoliday: false },
      { day: 28, month: 3, active: false, weekday: 'tuesday',   isHoliday: false },
      { day: 29, month: 3, active: false, weekday: 'wednesday', isHoliday: false },
      { day: 30, month: 3, active: false, weekday: 'thursday',  isHoliday: false },
      { day: 31, month: 3, active: false, weekday: 'friday',    isHoliday: false },
      { day:  1, month: 4, active: true,  weekday: 'satuarday', isHoliday: false },
      { day:  2, month: 4, active: true,  weekday: 'sunday',    isHoliday: false },
    ],
    [ // 第2週
      { day: 3, month: 4, active: true, weekday: 'monday',    isHoliday: false },
      { day: 4, month: 4, active: true, weekday: 'tuesday',   isHoliday: false },
      { day: 5, month: 4, active: true, weekday: 'wednesday', isHoliday: false },
      { day: 6, month: 4, active: true, weekday: 'thursday',  isHoliday: false },
      { day: 7, month: 4, active: true, weekday: 'friday',    isHoliday: false },
      { day: 8, month: 4, active: true, weekday: 'satuarday', isHoliday: false },
      { day: 9, month: 4, active: true, weekday: 'sunday',    isHoliday: false },
    ],
    [ // 第3週
      { day: 10, month: 4, active: true, weekday: 'monday',    isHoliday: false },
      { day: 11, month: 4, active: true, weekday: 'tuesday',   isHoliday: false },
      { day: 12, month: 4, active: true, weekday: 'wednesday', isHoliday: false },
      { day: 13, month: 4, active: true, weekday: 'thursday',  isHoliday: false },
      { day: 14, month: 4, active: true, weekday: 'friday',    isHoliday: false },
      { day: 15, month: 4, active: true, weekday: 'satuarday', isHoliday: false },
      { day: 16, month: 4, active: true, weekday: 'sunday',    isHoliday: false },
    ],
    [ // 第4週
      { day: 17, month: 4, active: true, weekday: 'monday',    isHoliday: false },
      { day: 18, month: 4, active: true, weekday: 'tuesday',   isHoliday: false },
      { day: 19, month: 4, active: true, weekday: 'wednesday', isHoliday: false },
      { day: 20, month: 4, active: true, weekday: 'thursday',  isHoliday: false },
      { day: 21, month: 4, active: true, weekday: 'friday',    isHoliday: false },
      { day: 22, month: 4, active: true, weekday: 'satuarday', isHoliday: false },
      { day: 23, month: 4, active: true, weekday: 'sunday',    isHoliday: false },
    ],
    [ // 第5週
      { day: 24, month: 4, active: true, weekday: 'monday',    isHoliday: false },
      { day: 25, month: 4, active: true, weekday: 'tuesday',   isHoliday: false },
      { day: 26, month: 4, active: true, weekday: 'wednesday', isHoliday: false },
      { day: 27, month: 4, active: true, weekday: 'thursday',  isHoliday: false },
      { day: 28, month: 4, active: true, weekday: 'friday',    isHoliday: false },
      { day: 29, month: 4, active: true, weekday: 'satuarday', isHoliday: true  },
      { day: 30, month: 4, active: true, weekday: 'sunday',    isHoliday: false },
    ],
    [ // 第6週
      { day: 1, month: 5, active: false, weekday: 'monday',    isHoliday: false },
      { day: 2, month: 5, active: false, weekday: 'tuesday',   isHoliday: false },
      { day: 3, month: 5, active: false, weekday: 'wednesday', isHoliday: true  },
      { day: 4, month: 5, active: false, weekday: 'thursday',  isHoliday: true  },
      { day: 5, month: 5, active: false, weekday: 'friday',    isHoliday: true  },
      { day: 6, month: 5, active: false, weekday: 'satuarday', isHoliday: false },
      { day: 7, month: 5, active: false, weekday: 'sunday',    isHoliday: false },
    ]
  ]

  return (
    <div className={ 'calender-wrapper' }>
      <div className={ 'calender-picker__container' }>
        <div className={ 'calender-picker__navigation' }>
          <span　className={ 'calender-picker__navigation__button calender-picker__navigation__prev' }>←</span>
          <span　className={ 'calender-picker__navigation__button calender-picker__navigation__next' }>→</span>
        </div>

        <div className={ 'calender-picker__month' }>
          <div className={ 'calender-picker__caption' }>
            <strong>{month}月</strong>
          </div>
          <table>
            <thead className={ 'calender-picker__week' }>
              <tr>
              <td>月</td>
              <td>火</td>
              <td>水</td>
              <td>木</td>
              <td>金</td>
              <td>土</td>
              <td>日</td>
              </tr>
            </thead>

            <tbody className={ 'calender-picker__month__grid' }>
              {calenderList}
            </tbody>
          </table>

        </div>

        <div className={ 'calender-picker__month' }>
          <div className={ 'calender-picker__caption' }>
            <strong>{month + 1}月</strong>
          </div>
          <table>
            <thead className={ 'calender-picker__week' }>
              <tr>
              <td>月</td>
              <td>火</td>
              <td>水</td>
              <td>木</td>
              <td>金</td>
              <td>土</td>
              <td>日</td>
              </tr>
            </thead>

            <tbody className={ 'calender-picker__month__grid' }>
              {calenderList}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
