# React ja Date Picker

[![Build Status](https://travis-ci.org/ai-ot/react-ja-date-picker.svg?branch=master)](https://travis-ci.org/ai-ot/react-ja-date-picker)
[![npm](https://img.shields.io/npm/v/react-ja-date-picker.svg)](https://www.npmjs.com/package/react-ja-date-picker)

日本語に対応したカレンダーピッカーのReactコンポーネントです。

[DEMO](https://ai-ot.github.io/react-ja-date-picker/)

## 使い方

ブラウザの場合は[Browserify](http://browserify.org/)、[webpack](https://webpack.github.io/)、[rollup](https://rollupjs.org/)などを使ってスクリプトにバンドルしてください。

### install

```shell
$ npm install react react-dom prop-types react-ja-date-picker --save
```

### static import with JSX

```javascript
import React      from 'react'
import { render } from 'react-dom'
import DatePicker from 'react-ja-date-picker'

render(
  <DatePicker />,
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
$ npm version patch -m"Release note"
```
