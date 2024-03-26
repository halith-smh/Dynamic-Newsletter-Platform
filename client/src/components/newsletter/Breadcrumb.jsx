import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ date }) {
  const formatDate = (date) => {
    const date_ = new Date(date);

    // Format the date into the desired format
    const formattedDate = date_.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
    return formattedDate;
  };

  const formatDateLink = (date) => {
    const date_ = new Date(date.toString());
    const day = date_.getDate();
    const month = date_.getMonth() + 1; // Month is zero-based, so add 1
    const year = date_.getFullYear();

    const formattedDate = `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;

    return formattedDate;
  };

  function timeAgo(date) {
    const currentDate = new Date();
    const providedDate = new Date(date);
  
    const timeDifferenceInSeconds = Math.floor((currentDate - providedDate) / 1000);
  
    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds} sec ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} min ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hr ago`;
    } else if (timeDifferenceInSeconds < 604800) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} day ago`;
    } else {
      return providedDate.toDateString(); // If more than a week, return the full date
    }
}

  return (
    <div className="col-7 d-flex justify-content-between">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">Newsletter</li>
          <li className="breadcrumb-item" style={{color: '#6d23e4'}}>
            <strong>{formatDateLink(date)}</strong>
          </li>
        </ol>
        <div id="date">{formatDate(date)}</div>
      </nav>
      <div className="info">
        <div className="label-clr">
          {new Date(date).toLocaleDateString("en-US", { weekday: "long" })}
        </div>
        <div className="mt-3" style={{fontSize: 16, fontWeight: 500}} id="time">
        <i class="bi bi-clock-history" style={{color: '#6d23e4', fontWeight: 800}}></i> {timeAgo(date)}
        </div>
      </div>
    </div>
  );
}



export default Breadcrumb;
