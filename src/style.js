/*
 * カレンダーピッカーのCSS
 * https://facebook.github.io/react/docs/dom-elements.html#style
 * 
 * [ルール]
 * - プロパティ名は Lower Camel Case で記述(ex. 'background-color' => 'backgroundColor')
 * [制約]
 * - 擬似クラス(:hoverなど)は、className$hover のようにプロパティを作成する
 * - ただし、コンポーネント側でスタイルを振り分ける処理が必要
 * - なお、このルールは、以下のルールが使えるようにリファクタリングする予定
 *   {
 *     className: {
 *        someProp: 'value',
 *        $hover: {
 *          someProp: 'overwrited'
 *        }
 *     }
 *   }
 */

export default {

  // これは不要なら消す
  '.clearfix:after': {
    'content': ' ',
    'display': 'table',
    'clear': 'both',
  },

  // calender container
  container: {
    'width'    : '618px',
    'position' : 'relative',
    'border'   : '1px solid #e4e7e7',
    'padding'  : '15px 5px 20px',
  },

  // wrapper for navigations
  navWrap: {},

  // nav button generic style
  navButton: {
    position     : 'absolute',
    display      : 'block',
    width        : '40px',
    height       : '30px',
    border       : '1px solid #e4e7e7',
    borderRadius : '3px',
    textAlign    : 'center',
    lineHeight   : '30px',
    color        : '#e4e7e7',
    cursor       : 'pointer',
    transition   : '.2s',
  },

  // navButton:hover
  navButton$hover: {
    'border' : '1px solid #c4c4c4',
    'color'  : '#c4c4c4',
  },

  navPrev: { left  : '20px' },
  navNext: { right : '20px' },

  // month wrapper
  month: {
    width   : '50%',
    // background: 'pink',
    display : 'inline-block',
  },

  // caption text as date
  caption: {
    textAlign : 'center',
    padding   : '5px 0',
  },

  week: {
    margin    : '10px 0',
    padding   : '0',
    textAlign : 'center',
  },

  weekLabel: {
    listStyle : 'none',
    display   : 'inline-block',
    width     : '40px',
    textAlign : 'center',
    // background: 'lightblue'
  },

  monthGrid: {
    display        : 'table',
    // background : 'lightgreen',
    borderCollapse : 'collapse',
    margin         : '0 auto',
  },

  day: {
    // display: 'table-cell,'
    width     : '40px',
    height    : '40px',
    border    : '1px solid #e4e7e7',
    boxSizing : 'border-box',
    textAlign : 'center',
    cursor    : 'pointer'
  },
  day$hover    : {
    background : '#37c5ab',
    color      : '#fff',
  }
}
