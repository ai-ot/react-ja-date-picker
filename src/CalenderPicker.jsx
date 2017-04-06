import React from 'react'

/**
 * Calender Component
 * @param  {object}         props props
 * @return {ReactComponent}       render a calender
 */
export default props => {

  const name = props.name

  return (
    <div>
      <p>{ `Hello, ${name}` }</p>
    </div>
  )
}
