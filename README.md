# Calender Picker (alpha)

[![Build Status](https://travis-ci.org/ai-ot/react-ja-date-picker.svg?branch=master)](https://travis-ci.org/ai-ot/react-ja-date-picker)

カレンダーピッカーです。
このコンポーネントは現在開発中です。

[DEMO](https://ai-ot.github.io/react-ja-date-picker/)

## 使い方

ブラウザの場合は[Babel](https://babeljs.io/)を使って[Browserify](http://browserify.org/)、[webpack](https://webpack.github.io/)、[rollup](https://rollupjs.org/)などでバンドルして使うといいかもしれません。

### static import with JSX

```jsx
import React      from 'react'
import { render } from 'react-dom'
import DatePicker from 'react-ja-date-picker'

render(
  <DatePicker />,
  document.getElementById('app')
)

```

### commonJS

```javascript
const React      = require('react')
const render     = require('react-dom').render
const DatePicker = require('react-ja-date-picker')

render(
  react.createElement(DatePicker),
  document.getElementById('app')
)
```

## development

```shell
$ git clone git@github.com:ai-ot/react-ja-date-picker.git
$ cd react-ja-date-picker
$ npm install
$ npm test  
$ npm run build
$ npm start
```

## release (for commiters)

```shell
$ npm version patch
```

## Specification (just a Note)

### デザイン

- ある月の全ての日を要素として表示できます
- 日の要素は曜日ごとに整列しており、それぞれの曜日のクラスが振られています
- 祝日の要素にもクラスが振られています
- マウス操作で1つの日を選択できます
- ある日を選択した時、その日が視覚的に分かります
- 来月・先月に移動するインターフェースがあります
- 年を移動するインターフェースがあります
- カレンダーピッカーを閉じるインターフェースがあります

### API

- `date:string`をプロパティにとり、指定しない場合はデフォルトで本日になります。パースできなかった場合はエラーになります
- `calenderType:string`をプロパティにとり、値に応じてリンクモードとボタンモードの2つのモードで動作します。どちらかのモードをデフォルトにします
  + リンクモードでは、それぞれの日付は`a`タグの中にレンダリングされます
  + リンクモードにおいては、`linkFormat:string|function`プロパティによって、aタグのリンク先のURL等を指定できます
      - 文字列でフォーマットを指定するか、コールバックで指定するかのどちらか、あるいは両方の入力を許容します
  + ボタンモードでは、それぞれの日付は`button`タグの中にレンダリングされます
  + ボタンモードにおいては、`onSelect:function`プロパティによってコールバックを指定できます
  + コールバックには、選択された年、月、日の値とカレンダーピッカーを閉じるコールバックが渡されます
- `style:object`をプロパティにとり、デフォルトのスタイルを上書きできます。(NOTE: `style`がReactに予約されているプロパティかもしれないので、意図しない動作をしないかどうかを調査する必要があります)
### 実装例

#### リンクモード

```html
<DatePicker
  calenderType={ 'link' }
  className={ 'some-class' }
  date={ '2017/12/31' }
  linkFormat={ 'http://example.com/{{year}}/{{month}}/{{day}}' }
/>
```

#### ボタンモード

```html
<DatePicker
  calenderType={ 'button' }
  className={ 'some-class' }
  date={ '2017/12/31' }
  onSelect={ (year, month, day, closeMe) => {
    alert(`${year}/${month}/${day}を選択しました`)
    closeMe()
  } }
/>
```
