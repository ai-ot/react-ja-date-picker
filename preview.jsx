/**
 * これは、カレンダーピッカーの表示確認用のComponentマウントスクリプトです。
 * @file
 */

import React          from 'react'
import { render }     from 'react-dom'
import DatePicker from './src/DatePicker.jsx'

render(
  <div>
    <DatePicker date={ '2017-12-1' } />
    <DatePicker date={ '2018-1-1' } type={ 'link' } />
    <DatePicker date={ '2018-2-1' } type={ 'button' } />
  </div>,
  document.getElementById('app')
)
