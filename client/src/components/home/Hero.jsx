import React, { useState } from "react";

import logo from "../../assets/imgs/home/logo.png";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [date, setdate] = useState("");

  const nav  = useNavigate();
  const handleDateClick = () => {
    const formatDate = date.split('-').reverse().join('-');
      nav(`/newsletter/${formatDate}`);
  }

  return (
    <>
      <div className="container">
        <div className="hero col-10 mx-auto text-center pt-4">
          <img width={150} src={logo} alt="" />
          <h1 className="navbar-brand">
            <div className="hero-txt">
              <span>.I</span>GNITE - 2024
            </div>
          </h1>
          <p>A DAILY NEWSLETTER</p>
          <p className="desc">
            Empowering our college experience with curated daily events.
          </p>
          <div className="input-group mb-3">
            <input
              value={date}
              type="date"
              onChange={(e) => setdate(e.target.value)}
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
            />
            <div className="input-group-append"  onClick={handleDateClick} type="button">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
