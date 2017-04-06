/**
 * これは、カレンダーピッカーの表示確認用のComponentマウントスクリプトです。
 * @file
 */

import React          from 'react'
import { render }     from 'react-dom'
import CalenderPicker from '../src/CalenderPicker.jsx'

render(
  <CalenderPicker name={ 'Bob' } />,
  document.getElementById('app')
)
