import axios from "axios";
import { CREATE_TODO, LOGIN, REGISTER, TODO_LIST } from "./apiConstants.js";

export const login = async (data) => {
  return axios.post(LOGIN, data);
};

export const Register = async (data) => {
  return axios.post(REGISTER, data);
};

export async function createTodoApi(data) {

  let token = getToken();
  console.log(token, "token");
  return axios.post(CREATE_TODO, data,{
    headers: {
      auth: token,
    }
  })
}

export async function getToDoListApi (data) {
  let token = getToken();
  //console.log(token)

  return axios.get(TODO_LIST,data, {
    headers: {
      auth:token,
    },
  })
}


export function getToken() {
  let user = localStorage.getItem("user");
  if (!user){
    // console.log("no logged user available")
    return;
  } 
  const userObj = JSON.parse(user);
  return userObj.token;
}
