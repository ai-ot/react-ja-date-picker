import React from 'react'

/**
 * Calender Component
 * @param  {object}         props props
 * @return {ReactComponent}       render a calender
 */
export default props => {

  const name = props.name
  const fruits = ['apple', 'banana', 'melon']


  const monthDays = [
    [ // 第1週
      { day: 27, month: 3, active: false, weekday: 'monday',    isHoliday: false },
      { day: 28, month: 3, active: false, weekday: 'tuesday',   isHoliday: false },
      { day: 29, month: 3, active: false, weekday: 'wednesday', isHoliday: false },
      { day: 30, month: 3, active: false, weekday: 'thursday',  isHoliday: false },
      { day: 31, month: 3, active: false, weekday: 'friday',    isHoliday: false },
      { day:  1, month: 4, active: true,  weekday: 'satuarday', isHoliday: false },
      { day:  2, month: 4, active: true,  weekday: 'sunday',    isHoliday: false },
    ],
    [ // 第2週
      { day: 3, month: 4, active: true, weekday: 'monday',    isHoliday: false },
      { day: 4, month: 4, active: true, weekday: 'tuesday',   isHoliday: false },
      { day: 5, month: 4, active: true, weekday: 'wednesday', isHoliday: false },
      { day: 6, month: 4, active: true, weekday: 'thursday',  isHoliday: false },
      { day: 7, month: 4, active: true, weekday: 'friday',    isHoliday: false },
      { day: 8, month: 4, active: true, weekday: 'satuarday', isHoliday: false },
      { day: 9, month: 4, active: true, weekday: 'sunday',    isHoliday: false },
    ],
    [ // 第3週
      { day: 10, month: 4, active: true, weekday: 'monday',    isHoliday: false },
      { day: 11, month: 4, active: true, weekday: 'tuesday',   isHoliday: false },
      { day: 12, month: 4, active: true, weekday: 'wednesday', isHoliday: false },
      { day: 13, month: 4, active: true, weekday: 'thursday',  isHoliday: false },
      { day: 14, month: 4, active: true, weekday: 'friday',    isHoliday: false },
      { day: 15, month: 4, active: true, weekday: 'satuarday', isHoliday: false },
      { day: 16, month: 4, active: true, weekday: 'sunday',    isHoliday: false },
    ],
    [ // 第4週
      { day: 17, month: 4, active: true, weekday: 'monday',    isHoliday: false },
      { day: 18, month: 4, active: true, weekday: 'tuesday',   isHoliday: false },
      { day: 19, month: 4, active: true, weekday: 'wednesday', isHoliday: false },
      { day: 20, month: 4, active: true, weekday: 'thursday',  isHoliday: false },
      { day: 21, month: 4, active: true, weekday: 'friday',    isHoliday: false },
      { day: 22, month: 4, active: true, weekday: 'satuarday', isHoliday: false },
      { day: 23, month: 4, active: true, weekday: 'sunday',    isHoliday: false },
    ],
    [ // 第5週
      { day: 24, month: 4, active: true, weekday: 'monday',    isHoliday: false },
      { day: 25, month: 4, active: true, weekday: 'tuesday',   isHoliday: false },
      { day: 26, month: 4, active: true, weekday: 'wednesday', isHoliday: false },
      { day: 27, month: 4, active: true, weekday: 'thursday',  isHoliday: false },
      { day: 28, month: 4, active: true, weekday: 'friday',    isHoliday: false },
      { day: 29, month: 4, active: true, weekday: 'satuarday', isHoliday: true  },
      { day: 30, month: 4, active: true, weekday: 'sunday',    isHoliday: false },
    ],
    [ // 第6週
      { day: 1, month: 5, active: false, weekday: 'monday',    isHoliday: false },
      { day: 2, month: 5, active: false, weekday: 'tuesday',   isHoliday: false },
      { day: 3, month: 5, active: false, weekday: 'wednesday', isHoliday: true  },
      { day: 4, month: 5, active: false, weekday: 'thursday',  isHoliday: true  },
      { day: 5, month: 5, active: false, weekday: 'friday',    isHoliday: true  },
      { day: 6, month: 5, active: false, weekday: 'satuarday', isHoliday: false },
      { day: 7, month: 5, active: false, weekday: 'sunday',    isHoliday: false },
    ]
  ]


  return (
    <div className={ 'calender-wrapper' }>
      { monthDays.map(function(week){
        return <div>{week[0].day}</div>
      }) }
    </div>
  )
}
