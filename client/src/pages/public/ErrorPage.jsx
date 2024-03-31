import React from "react";
//404 error page

import img from '../../assets/imgs/404.gif';
import { Link } from "react-router-dom";
function ErrorPage() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-8 text-center">
          <img
            src={img}
            alt="404 Error Image"
            className="error-image img-fluid"
          />
          <div className="error-message mt-4 mb-2">Page Not Found</div>
          <Link to='/' className="btn btn-primary error-link">Go to Home Page</Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
