/**
 * これは、カレンダーピッカーの表示確認用のComponentマウントスクリプトです。
 * @file
 */

import React      from 'react'
import { render } from 'react-dom'
import DatePicker from './src/DatePicker.jsx'

/**
 * [alertDate description]
 * @param  {number} year  selected year
 * @param  {number} month selected month
 * @param  {number} day   selected say
 * @return {void}
 */
const alertDate = (year, month, day) => alert(`${year}/${month}/${day}`)

render(
  <div>
    <h2>{ 'default' }</h2>
    <DatePicker />

    <h2>{ 'Link' }</h2>
    <DatePicker
      date={ '2018-01-01' }
      format={ 'http://example.com/{0}/{1}/{2}' }
      type={ 'link' }
    />

    <h2>{ 'button' }</h2>
    <DatePicker
      date={ '2018-02-01' }
      type={ 'button' }
      onSelect={ alertDate }
    />
  </div>,
  document.getElementById('app')
)
