import React from 'react'
import moment from "moment/moment"
function TodoItems({todo}) {
  return (
    <div className='alert col-sm-3 mx-3 my-2 bg-light '>

      <div className="card-header">
        {todo.isCompleted ? `completed` : `not completed`}
      </div>

      <div className="card-body">
        <h4 className='card-title'>
        {todo.desc}
      </h4>

      <p className='card-text'>
        {moment(todo.date).fromNow()}
      </p>
      
      </div>
    </div>
  )
}

export default TodoItems