import React from "react";
import Verified from "./Verified";
import { Link } from "react-router-dom";

import userImg from "../../assets/imgs/home/user.png";

function Navbar({ role, email, Logout, homeActive }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container-fluid mx-5">
        <Link to="/" className="navbar-brand me-auto">
          <span>.I</span>GNITE
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav mx-auto">
            <li className={`nav-item ${homeActive ? homeActive : ""}`}>
              <Link to="/" className="nav-link">Home</Link>
              
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Editors
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Top Readers
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-text">
          <div className="btn-group">
            <div
              type="button"
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={userImg}
                width={30}
                height={30}
                className="userIcon"
                alt=""
              />
              {email}
              {role === "admin" && <Verified />}
            </div>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item" type="button">
                  Profile
                </button>
              </li>
              {role === "editor" && (
                <li>
                  <button className="dropdown-item" type="button">
                    <Link className="ref" to="/add-content">
                      {" "}
                      Add Content
                    </Link>
                  </button>
                </li>
              )}
              {role === "admin" && (
                <li>
                  <button className="dropdown-item" type="button">
                    <Link className="ref" to="/admin/dashboard">
                      {" "}
                      Approve post
                    </Link>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={Logout}
                  className="dropdown-item"
                  type="button"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
