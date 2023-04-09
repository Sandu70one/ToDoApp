import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { REGISTER } from "../services/apiConstants.js";
import axios from "axios";
import Header from "./Header.jsx";

function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigation = useNavigate();
  const [errors, setErrors] = useState(null);

  //if correctly registered redirect to the home route
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //after call of  submit(register) button
  const Register = async (data) => {
    return axios.post(REGISTER, data);
  };

  const handleSubmit = async () => {
    console.log({ form });

    //wait for data that client submit
    const result = await Register(form);

    //checking the statuses
    if (result.status === 200) {
      if (result.data.status === 201) {
        setErrors(result.data.data);
         console.log(result.data.message)
        return;
      }

      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }

      if (result.data.status === 202) {
        console.log(result.data.message);
        return;
      }
    } else {
     // try to to input a innerHTML tag
      console.log('something went wrong')
    }
  };

  return (
   <div>
    <Header/>
    <div className="container">
      <div className="row justify-content-center mt-4">
        <div className="col-lg-5 card border-primary mb-4">
          <div className="card-body"> 
            <div className="card-header h4 text-center">New account</div>

            <div className="form-group">
              <label className="col-form-label mt-4">Name</label>
              <input
                name="name"
                onChange={handleInputChange}
                type="text"
                className="form-control"
                placeholder="Enter username"
              />
              {/* this is for that toast thing */}
              {errors?.name && (
                <small id="emailHelp" className="form-text text-muted">
                  {errors.name.msg}
                </small>
              )}
            </div>

            <div className="form-group">
              <label className="col-form-label mt-4">Username</label>
              <input
                name="username"
                onChange={handleInputChange}
                type="text"
                className="form-control"
                placeholder="Enter username"
              />

              {/* this is for that toast thing */}
              {errors?.username && (
                <small id="emailHelp" className="form-text text-muted">
                  {errors.username.msg}
                </small>
              )}
            </div>

            <div className="form-group">
              <label className="col-form-label mt-4">Email</label>
              <input
                name="email"
                onChange={handleInputChange}
                type="text"
                className="form-control"
                placeholder="Enter your email"
              />
              {errors?.email && (
                <small id="emailHelp" className="form-text text-muted">
                  {errors.email.msg}
                </small>
              )}
            </div>

            <div className="form-group">
              <label className="col-form-label mt-4">password</label>
              <input
                name="password"
                onChange={handleInputChange}
                type="text"
                className="form-control"
                placeholder="Enter your password"
              />

              {errors?.password && (
                <small id="emailHelp" className="form-text text-muted">
                  {errors.password.msg}
                </small>
              )}
            </div>
            <div className="row justify-content-md-center form-group mt-4">
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary"
                
              >
                Register me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>  
  );
}

export default Register;
