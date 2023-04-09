import React, { useEffect, useState } from "react";
import Todo from "./For home/Todo";
import Header from "./Header";
import AddTodoModal2 from "./AddTodoModal2";
import { useNavigate } from "react-router-dom";
import { getToDoListApi, getToken } from "../services/api";


function Home() {

  const navigation =useNavigate()
  const [list, setList] = useState([])
  const [refreshList, setrefreshList] = useState();



  useEffect(() => {
    if (!getToken()) {
      navigation(`/login`);
    }
    fetchTodoList()
  },[refreshList,navigation]);



  async function fetchTodoList(){
    const result = await getToDoListApi()
    console.log(`todolist`, result)
    if(result.status===200 && result.data.status===200){
      setList(result.data.data.todos.reverse)
    }
  }


  return (
    <div>
      <Header />
      
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {
            list.map((todo)=><Todo todo={todo} key={todo._id} />)
          }
          <Todo />
          <Todo />
          <Todo />
          
        </div>
      </div>
      <div
        className=""
        style={{ position: "fixed", right: 50, bottom: 50, zIndex: 100 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-secondary my-2 my-sm-0"
          style={{borderRadius: 50}}
        >
          add todo
        </button>
        
      </div>

      
     <AddTodoModal2  setrefreshList={setrefreshList} /> 
      
    </div>
  );
}

export default Home;
