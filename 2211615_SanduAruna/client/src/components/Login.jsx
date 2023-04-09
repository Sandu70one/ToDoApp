import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN } from "../services/apiConstants.js";
import Header from "./Header";

function Login({user,setUser}) {
  const navigation = useNavigate();


  const [form, setForm] = useState({
    username: "",
    password: "",
  });



  //if valid user logged in navigate to the home page
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  }, [navigation]);



  const [errors, setErrors] = useState(null);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const login = async (data) => {
    return axios.post(LOGIN, data);
  };


  
  //------
  const handleSubmit = async () => {
    const result = await login(form);
    console.log("form", result);
    setErrors(null);

    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }
      if (result.data.status === 201) {
        setErrors(result.data.data);
        return;
      }

      if (result.data.status === 202) {
        console.log(result.data.message);
        return;
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <form>
          <div className="row justify-content-center mt-4">
            <div className="col-lg-5 card border-primary mt-4">
              <div className="card-body">
                <h4 className="card-title">Login </h4>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label mt-4"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    onChange={handleChange}
                    name="username"
                    aria-describedby="emailHelp"
                    placeholder="Enter your username"
                  />
                  {errors?.username && (
                    <small id="emailHelp" className="form-text text-muted">
                      {errors.username.msg}
                    </small>
                  )}
                </div>

                <div className="form form-group">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label mt-4"
                  >
                    password
                  </label>

                  <input
                    type="password"
                    autoComplete="true"
                    className="form-control"
                    onChange={handleChange}
                    name="password"
                    id="exampleInputPassword1"
                    aria-describedby="emailHelp"
                    placeholder="password"
                  />
                  {errors?.password && (
                    <small id="emailHelp" className="form-text text-muted">
                      {errors.password.msg}
                    </small>
                  )}
                </div>
                <br />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
