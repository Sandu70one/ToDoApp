import React from "react";
//import moment from "moment/moment"
function Todo ({todo}){
    return(
        <div className="col-sm-3 mx-3 my-2 alert bg-light">
            <div className="card-header">reading 'isCompleted'
                {/* {todo.isCompleted ? `completed` : `not completed`} */}
            </div>
            <div className="card-body">
                <h4 className="card-title">reading 'desc'
                    {/* {todo.desc} */}
                </h4>
                <p className="card-text">reading 'date'
                    {/* {moment(todo.date).fromNow()} */}
                </p>
            </div>
        </div>
    )
}
export default Todo