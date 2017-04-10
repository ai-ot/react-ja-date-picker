/**
 * これは、カレンダーピッカーの表示確認用のComponentマウントスクリプトです。
 * @file
 */

import React          from 'react'
import { render }     from 'react-dom'
import CalenderPicker from './src/CalenderPicker.jsx'

render(
  <div>
    <CalenderPicker date={ '2017-12-1' } />
    <CalenderPicker date={ '2018-1-1' } type={ 'link' } />
    <CalenderPicker date={ '2018-2-1' } type={ 'button' } />
  </div>,
  document.getElementById('app')
)
