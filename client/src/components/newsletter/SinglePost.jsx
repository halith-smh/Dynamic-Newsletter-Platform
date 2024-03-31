import React from "react";
import Likes from "./Likes";

import "./Style.css";

function SinglePost({ data, email, mainId, date }) {


  return (
    <div className="col-8 mt-2 mb-5" id={data._id}>
      <div className="mainDiv">

        <div className="depts my-1">
          <span className="label-clr">
            <i className="bi bi-tag-fill"></i> {data.category}
          </span>
        </div>

        <h5 className="dept-head"><i className="bi bi-mortarboard"></i> {data.department}</h5>

        {/* <h4 id="title">{data.title}</h4> */}
        <div className="img-wrapper">
          <img
            src={`http://localhost:4000/${data.img}`}
            alt=""
            className="card-img-post"
            width={500}
            height={380}
          />
        </div>

        <div className="px-3 align-items-center card-footerCC d-flex justify-content-between">
          <div className="left">
            <h6 className="mt-2 location" style={{ fontSize: 16 }}>
              <i className="bi bi-geo-alt-fill" style={{ color: "#6d23e4" }}></i>{" "}
              {data.location}
            </h6>
           
          </div>

          <div className="right">
            <Likes date={date} data={data} mainId={mainId} email={email} />
          </div>
        </div>
        <p className="px-4 description pb-4"><strong>{data.title}: </strong>  {data.description}</p>
        

        {/* <div className="px-5">
          <p className="mb-0 description">{data.description}</p>
          <div className="d-flex justify-content-between">
            <div className="px-3">
              Location: {data.location}
              <h1>Catg: {data.category}</h1>
            </div>
            <p className="mb-0">
              <i className="fa fa-picture-o mr-2"></i>
              <span className="font-weight-bold">
                Department: {data.department}
              </span>
            </p>
          </div>
          <div id="like-comp">
            <Likes data={data} mainId={mainId} email={email} />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default SinglePost;
