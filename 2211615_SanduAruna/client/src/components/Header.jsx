import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    setUser(u)
  }, []);


  
  function handleLogOut(){
    localStorage.clear()
  }
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Todo List
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor02">

          <ul className="navbar-nav me-auto">
            
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>

          </ul>

          <form className="d-flex">
            {user && (
              <button
                className="btn btn-secondary my-2 my-sm-0"
                type="submit"
                onClick={handleLogOut}
              >
                Logout
              </button>
            )}

          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
