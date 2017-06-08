/**
 * これは、カレンダーピッカーの表示確認用のComponentマウントスクリプトです。
 * @file
 */

import React      from 'react'
import { render } from 'react-dom'
import DatePicker from '../src/DatePicker.jsx'

/**
 * [alertDate description]
 * @param  {number} year  selected year
 * @param  {number} month selected month
 * @param  {number} day   selected say
 * @return {void}
 */

render(
  <DatePicker />,
  document.getElementById('calendar-default')
)

render(
  <DatePicker
    date={ '2018-01-01' }
    format={ 'http://example.com/{year}/{month}/{day}' }
    type={ 'link' }
  />,
  document.getElementById('calendar-link')
)

render(
  <DatePicker
    date={ '2018-02-01' }
    onSelect={ (year, month, day) => alert(`${year}/${month}/${day}を選択しました`) }
    type={ 'button' }
  />,
  document.getElementById('calendar-button')
)
