/**
 * これは、カレンダーピッカーの表示確認用のComponentマウントスクリプトです。
 * @file
 */

import React      from 'react'
import { render } from 'react-dom'
import Highlight  from 'react-highlight'
import DatePicker from '../src/DatePicker.jsx'

/**
 * [alertDate description]
 * @param  {number} year  selected year
 * @param  {number} month selected month
 * @param  {number} day   selected say
 * @return {void}
 */

render(
  <div>
    <section className="flex">

      <div className="flex-box">
        <h2>{ '日付をリンクとして扱う' }</h2>
        <DatePicker
          date={ '2018-01-01' }
          format={ 'https://ai-ot.github.io/react-ja-date-picker/?selected_date={year}/{month}/{day}' }
          type={ 'link' }
        />
      </div>
      <div className="flex-box">
        <h2>{ '日付をボタンとして扱う' }</h2>
        <DatePicker
          date={ '2018-02-01' }
          type={ 'button' }
          onSelect={ (year, month, day) => alert(`${year}/${month}/${day}を選択しました`) }
        />
      </div>
    </section>

    <section>
      <h2>{ 'インストール' }</h2>
      <Highlight className="shell">{ '$ npm install react-ja-date-picker -S' }</Highlight>

      <h2>{ '使い方' }</h2>
      <Highlight className="typescript">
        { `
          import React      from 'react'
          import { render } from 'react-dom'
          import DatePicker from 'react-ja-date-picker'

          // リンクとして日付を扱う
          render(
            <DatePicker
              date={ '2018-01-01' }
              format={ 'https://ai-ot.github.io/react-ja-date-picker/?selected_date={year}/{month}/{day}' }
              type={ 'link' }
            />,
            document.getElementById('calendar-link')
          )

          // ボタンとして日付を扱う
          render(
            <DatePicker
              date={ '2018-02-01' }
              type={ 'button' }
              onSelect={ (year, month, day) => alert(\`\${year}/\${month}/\${day}を選択しました\`) }
            />,
            document.getElementById('calendar-button')
          )

        ` }
      </Highlight>
    </section>
  </div>,
  document.getElementById('demo')

)
