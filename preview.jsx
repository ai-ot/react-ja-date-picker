/**
 * これは、カレンダーピッカーの表示確認用のComponentマウントスクリプトです。
 * @file
 */

import React          from 'react'
import { render }     from 'react-dom'
import CalenderPicker from './src/CalenderPicker.jsx'

render(
  <div>
    <CalenderPicker month={ 12 } year={ 2017 } />
    <CalenderPicker month={ 1 } year={ 2018 } type={ 'link' } />
    <CalenderPicker month={ 2 } year={ 2018 } type={ 'button' } />
  </div>,
  document.getElementById('app')
)
