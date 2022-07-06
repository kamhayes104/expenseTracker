import React from 'react'
import './ExpensesCard.css'

function ExpensesCard(props) {
  return (
    <div className='expenses-card'>{props.children}</div>
  )
}

export default ExpensesCard