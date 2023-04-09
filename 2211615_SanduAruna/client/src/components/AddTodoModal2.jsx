import React from "react";
import { useState } from "react";
import { createTodoApi } from "../services/api"; 

function AddTodoModal2(setrefreshList) {
  const [todoDesc, setTodoDesc] = useState("");

 

  const handleTodoSubmit = async () => {

    console.log(todoDesc, "todoDesc");
    if (todoDesc === "") {
      console.log("empty todo");
      return;
    }
    const result = await createTodoApi({ desc: todoDesc });

    if (result.status === 200 && result.data.status === 200) {
    // setrefreshList(new Date())
      console.log("Todo is added");
    } else {
      console.log(result.data.message);
    }
  };




  return (
    <div className="modal mt-5" id="exampleModal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Make a todo</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
            >
              <span arial-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <textarea
                className="form-control"
                name=""
                rows={3}
                placeholder="Write your todo here.."
                onChange={(e) => {
                  setTodoDesc(e.target.value);
                }}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                setTodoDesc("");
              }}
            >
              close
            </button>

            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleTodoSubmit}
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodoModal2;
