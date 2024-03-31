import React, { useState } from "react";

import Editor from "../../assets/imgs/newsletter/editor.png";
import { useNavigate } from "react-router-dom";

function EditorsPreview() {
  const [date, setdate] = useState("");

  const handleDateClick = () => {
    const formattedDate = date.split("-").reverse().join("-");

    // Constructing the URL with the formatted date
    const url = `/newsletter/${formattedDate}`;

    // Opening the URL in a new tab
    window.open(url);
  };

  return (
    <div className="col-4">
      <div className="editors-prev">
        <div className="head d-flex">
          <h4 className="mt-1 title">Search</h4>
        </div>
        <div className="input-group input-prev mb-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
          />
          <div
            className="input-group-append"
            type="button"
            onClick={handleDateClick}
          >
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
          </div>
        </div>
        <div className="head d-flex">
          <h4 className="mt-1 title">Editors</h4>
        </div>

        <div className="info">
          <div className="d-flex box">
            <div className="icons">
              <img src={Editor} width={38} alt="" />
              {/* <i className="bi bi-person-circle"></i> */}
            </div>
            <div className="desc">
              <h5>Mohamed Halith S</h5>
              <h6>Dept: AI & Ds</h6>
            </div>
          </div>
          <div className="d-flex box">
            <div className="icons">
              <img src={Editor} width={38} alt="" />
              {/* <i className="bi bi-person-circle"></i> */}
            </div>
            <div className="desc">
              <h5>Mohamed Halith S</h5>
              <h6>Dept: AI & Ds</h6>
            </div>
          </div>
          <div className="d-flex box">
            <div className="icons">
              <img src={Editor} width={38} alt="" />
              {/* <i className="bi bi-person-circle"></i> */}
            </div>
            <div className="desc">
              <h5>Mohamed Halith S</h5>
              <h6>Dept: AI & Ds</h6>
            </div>
          </div>
          <div className="d-flex box">
            <div className="icons">
              <img src={Editor} width={38} alt="" />
              {/* <i className="bi bi-person-circle"></i> */}
            </div>
            <div className="desc">
              <h5>Mohamed Halith S</h5>
              <h6>Dept: AI & Ds</h6>
            </div>
          </div>
          <div className="d-flex box">
            <div className="icons">
              <img src={Editor} width={38} alt="" />
              {/* <i className="bi bi-person-circle"></i> */}
            </div>
            <div className="desc">
              <h5>Mohamed Halith S</h5>
              <h6>Dept: AI & Ds</h6>
            </div>
          </div>
          <div className="d-flex box pb-4">
            <div className="icons">
              <img src={Editor} width={38} alt="" />
              {/* <i className="bi bi-person-circle"></i> */}
            </div>
            <div className="desc">
              <h5>Mohamed Halith S</h5>
              <h6>Dept: AI & Ds</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorsPreview;
