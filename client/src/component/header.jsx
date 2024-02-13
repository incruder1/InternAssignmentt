import React from 'react'

import { useAuth } from "../context/auth.js";
import { NavLink, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
function Header() {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    // console.log(auth?.user?.name);
    const handleLogout = () => {
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
      };
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-primary fixed-top">
      <div className="container-fluid">
      <Link to="/" className="navbar-brand">
         blinkit
          </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 bg-primary ">
           
            <li className="nav-item text-light ">
              <NavLink to="/" className="nav-link  text-light">
                Home
              </NavLink>
            </li>
           

            {!auth?.user ? (
              <>
                <li className="nav-item bg-light">
                  <NavLink to="/signup " className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item bg-light">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{ border: "none", color:"white" }}
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu bg-light">
                    <li>
                      <NavLink
                        to="/"
                        className="dropdown-item bg-light"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </>
    
  )
}

export default Header