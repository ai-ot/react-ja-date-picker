/*
 * CSS in JS
 *
 * https://facebook.github.io/react/docs/dom-elements.html#style
 * 
 * [ルール]
 * - プロパティ名は Lower Camel Case で記述(ex. 'background-color' => 'backgroundColor')
 * [制約]
 * - 擬似クラス(:hoverなど)は、className:hover のようにプロパティを作成する。今の所、:hoverと:focus
 *   {
 *     className: {
 *        someProp: 'value',
 *        '&:hover': {
 *          someProp: 'overwritten'
 *        }
 *     },
 *     className:hover {
 *       someProp: 'overwritten'
 *     }
 *   }
 */

export default {


  // calender container
  container: {
    width     : '326px',
    position  : 'relative',
    border    : '1px solid #e4e7e7',
    padding   : '20px',
    boxSizing : 'border-box',
    margin    : '0 auto',
  },

  // wrapper for navigations
  navigation: {},

  // nav button generic style
  navButton: {
    position     : 'absolute',
    display      : 'block',
    width        : '40px',
    height       : '30px',
    border       : '1px solid #e4e7e7',
    borderRadius : '3px',
    textAlign    : 'center',
    color        : '#e4e7e7',
    cursor       : 'pointer',
    transition   : '.2s',
    background : 'transparent',

    ':hover': {
      'border' : '1px solid #c4c4c4',
      'color'  : '#c4c4c4',
    }

  },

  navPrev: { left  : '20px' },
  navNext: { right : '20px' },

  calender: {
    width   : '100%',
    display : 'inline-block',
  },

  // caption text as date
  caption: {
    textAlign  : 'center',
    fontWeight : 'bold',
    padding    : '5px 0',
  },

  weekLabels: {
    margin    : '10px 0',
    padding   : '0',
    textAlign : 'center',
    height    : '42px',
  },

  weekLabel: {
    listStyle : 'none',
    display   : 'inline-block',
    width     : '40px',
    padding   : '10px 0',
    textAlign : 'center',
    boxSizing: 'border-box'
  },

  calenderGrid: {
    display        : 'table',
    borderCollapse : 'collapse',
    margin         : '0 auto',
  },

  day: {
    width     : '40px',
    height    : '40px',
    border    : '1px solid #e4e7e7',
    boxSizing : 'border-box',
    textAlign : 'center',
    cursor    : 'pointer',
    transition: '.2s',
    padding   : '0',

    ':hover' : {
      background : '#37c5ab',
      color      : '#fff',
    },

    ':focus' : {
      color: 'red', //sample
    }
  },

  notActive: {
    opacity: .2,
  },
  holiday: {
    color: 'red',
  },
  sunday: {
    color: 'red',
  },
  monday: {},
  tuesday: {},
  wednesday: {},
  thurseday: {},
  friday: {},
  saturaday: {},

  link: {
    display        : 'block',
    textDecoration : 'none',
    color          : 'inherit',
    width          : '100%',
    height         : '100%',
    lineHeight     : '36px',

    ':focus' : {
      background : '#37c5ab',
      color      : '#fff',
      outline    : 'none',
    }
  },

  button: {
    border     : '0',
    background : 'transparent',
    outline    : 'none',
    padding    : '0',
    fontSize   : 'inherit',
    color      : 'inherit',
    cursor     : 'pointer',
    width      : '100%',
    height     : '100%',

    ':focus' : {
      background : '#37c5ab',
      color      : '#fff',
      outline    : 'none',
    }
  },

  srOnly: {
    display: 'none',
  }
}
