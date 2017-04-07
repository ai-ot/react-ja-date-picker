# Calender Picker

[![CircleCI](https://circleci.com/bb/ai-ot/calender-picker.svg?style=svg&circle-token=7d65bdcc898b13dacd1af9bf47ffdfacc25dcfae)](https://circleci.com/bb/ai-ot/calender-picker)

カレンダーピッカーです。

## 開発

```shell
$ git clone git@bitbucket.org:ai-ot/calender-picker.git
$ cd calender-picker
$ yarn
$ npm test      # テスト実行
$ npm run build # ビルド実行
$ npm start     # プレビュー
```

## 要件

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
  + リンクモードにおいては、`linkFormat:string|function`プロパティによって、aタグのリンク先のURL等を指定できます.
      - 文字列でフォーマットを指定するか、コールバックで指定するかのどちらか、あるいは両方の入力を許容します
  + ボタンモードでは、それぞれの日付は`button`タグの中にレンダリングされます
  + ボタンモードにおいては、`onSelect:function`プロパティによってコールバックを指定できます
  + コールバックには、選択された年、月、日の値とカレンダーピッカーを閉じるコールバックが渡されます

### 実装例

#### リンクモード

```html
<CalenderPicker
  calenderType={ 'link' }
  className={ 'some-class' }
  date={ '2017/12/31' }
  linkFormat={ 'http://example.com/{{year}}/{{month}}/{{day}}' }
/>
```

#### ボタンモード

```html
<CalenderPicker
  calenderType={ 'button' }
  className={ 'some-class' }
  date={ '2017/12/31' }
  onSelect={ (year, month, day, closeMe) => {
    alert(`${year}/${month}/${day}を選択しました`)
    closeMe()
  } }
/>
```
