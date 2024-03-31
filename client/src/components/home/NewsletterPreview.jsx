import React from "react";
import { Link } from "react-router-dom";

function NewsletterPreview({element}) {
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
      const date = formatDateLink(element.date);
      
  return (
    <Link className="col-md-4" to={`/newsletter/${date}`}>
      <div>
        <div className="card">
          <img src={element.thumbnail} className="" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{formatDate(element.date)}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {timeAgo(element.date)}
            </h6>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NewsletterPreview;
