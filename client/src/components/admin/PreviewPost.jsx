import React from 'react'

function PreviewPost({event}) {
  return (
    <div className="card rounded shadow mb-4" style={{width: 550}}>
    <div className="card-body p-3">
      <h5
        className="card-title m-auto text-center py-3"
        style={{ fontSize: 25, fontWeight: 600 }}
      >
        {event.title}
      </h5>
      {event.img && (
        <img
          className="card-img-to p-4 shadow border"
          width={520}
          src={`http://localhost:4000/${event.img}`}
          alt="Event Preview"
        />
      )}
      <p className="card-text p-2 my-2" style={{ fontSize: 18 }}>
        <strong>Description: </strong>{event.description}
      </p>
      <div className="right">
          <h6 className="label-clr mt-4">
            <i className="bi bi-mortarboard"></i> {event.department}
          </h6>
        </div>
      <div className="card-footerCC d-flex justify-content-between">
        <div className="left">
          <h6 className="mt-2" style={{ fontSize: 18 }}>
            <i className="bi bi-geo-alt-fill" style={{ color: "#6d23e4" }}></i>{" "}
            {event.location}
          </h6>
          <h6 className="mt-3" style={{ fontSize: 18 }}>
            <i className="bi bi-tag-fill" style={{ color: "#6d23e4" }}></i>{" "}
            {event.category}
          </h6>
        </div>
        
      </div>
    </div>

   
  </div>
  )
}

export default PreviewPost