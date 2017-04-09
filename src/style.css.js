/*
 * カレンダーピッカーのCSS
 * https://facebook.github.io/react/docs/dom-elements.html#style
 */

export default {

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

  navWrap: {

  },

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

  navButton$hover: {
    'border' : '1px solid #c4c4c4',
    'color'  : '#c4c4c4',
  },

  navPrev: {
    left: '20px',
  },

  navNext: {
    right: '20px',
  },

  month: {
    width   : '50%',
    // background: 'pink',
    display : 'inline-block',
  },

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
