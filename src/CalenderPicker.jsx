import React from 'react'

/**
 * Calender Component
 * @param  {object}         props props
 * @return {ReactComponent}       render a calender
 */
export default props => {

  const name = props.name
  const fruits = ['apple', 'banana', 'melon']

  return (
    <div>
      <p>{ `${name} likes ..` }</p>
      <ul>
        { fruits.map(fruit => <li key={ `item-${fruit}` }>{ fruit }</li>) }
      </ul>
    </div>
  )
}
