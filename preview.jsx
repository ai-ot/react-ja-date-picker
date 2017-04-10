/**
 * これは、カレンダーピッカーの表示確認用のComponentマウントスクリプトです。
 * @file
 */

import React          from 'react'
import { render }     from 'react-dom'
import DatePicker from './src/DatePicker.jsx'

render(
  <div>
    <DatePicker date={ '2017-12-01' } />
    <DatePicker date={ '2018-01-01' } type={ 'link' } />
    <DatePicker date={ '2018-02-01' } type={ 'button' } />
  </div>,
  document.getElementById('app')
)
