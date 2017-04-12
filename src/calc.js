/**
 * カレンダーピッカーに必要なJavaScriptライブラリ
 * @file
 */

import moment from 'moment'
import config from './config'


/**
 * 指定した月のカレンダーを返してくれます
 * @param  {number} year  year
 * @param  {number} month month
 * @return {array<{day:number, month:number, active:boolean, weekday:string, isHoliday:boolean}>} day information object
 */
export const getMonthCalendar = (year, month) => {
  const monthDays = []
  const idx = moment([year, month - 1, 1])
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
        weekday: config.weekLabels.en[idx.weekday()],
        isHoliday: config.holidays.indexOf(idx.format('YYYY-MM-DD')) > 0
      })
      idx.add(1, 'days')
    }
  }
  return monthDays
}

/**
 * normalize style object
 * @param  {object} style normalizing style object
 * @return {object} normalized style object
 */
export const normalizeStyle = style => {

  // acceptable pseudo class
  const pseudoClasses = ['hover', 'focus']
  /**
   * check if is a prop is pseudo class
   * @param  {string}  prop propery. if isPseudoClass, it might be like :hover
   * @return {boolean}      result
   */
  const isPseudoClass = prop => pseudoClasses.map(pseudoClass => `:${pseudoClass}`).includes(prop)

  const result = {}


  const slugs = Object.keys(style)

  slugs.forEach(slug => {
    result[slug] = {}

    // prepare in case without those pseudo calsses
    pseudoClasses.map(pseudoClass => `:${pseudoClass}`).forEach(prop => {
      if (!style[slug][prop]) {
        result[slug + prop] = { ...style[slug], ...style[slug][prop] }
      }
    })

    // merge, flatten and spread nested properies
    const props = Object.keys(style[slug])
    props.forEach(prop => {
      if (isPseudoClass(prop)) {
        result[slug + prop] = { ...style[slug], ...style[slug][prop] }
      } else {
        result[slug][prop] = style[slug][prop]
      }
    })
  })

  // cleanup nested pseudo class
  Object.keys(result).forEach(slug => {
    Object.keys(result[slug]).forEach(prop => {
      if (isPseudoClass(prop)) {
        delete result[slug][prop]
      }
    })
  })
  return result
}

/**
 * formatter
 * @param  {string} format str including {word}
 * @param  {object} args   give varables in { word: 'value' }
 * @return {string}        formatted text
 */
export const strFormat = (format, args) => {
  return format.replace(/\{(\w+)\}/g, (x, matched) => args[matched])
}
