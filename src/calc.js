/**
 * カレンダーピッカーに必要なJavaScriptライブラリ
 * @file
 */

import moment from 'moment'

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
export const getMonthCalendar = (year, month) => {
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
 * 何か素敵な日付計算の関数
 * @param  {[type]} arg [description]
 * @return {[type]}     [description]
 */
export const calculateAwesome = arg => {
  // do something awesome
  return 'something'
}
