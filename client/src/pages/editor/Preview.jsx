import React from "react";

function Preview({ event, index, deleteEvent }) {
  return (
    <>
      <div className="card" style={{width: '530px', height: '350'}}>
        <div className="card-body">
        <div className="right">
              <h6 className="label-clr mt-1">
                <i className="bi bi-mortarboard"></i> {event.department}
              </h6>
            </div>
          {event.img && (
            <img
              className="card-img-top rounded"
              width={600}
              height={450}
              src={URL.createObjectURL(event.img)}
              alt="Event Preview"
            />
          )}
          <h5
            className="py-1 mt-2"
            style={{ fontSize: 22, fontWeight: 600 }}
          >
            {event.title}
          </h5><p className="card-text" style={{ fontSize: 17 }}>
            {event.description}
          </p>
         
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

        {deleteEvent && (
          <button
            title="Delete an event"
            onClick={() => deleteEvent(index)}
            className="btn btn-danger mr-2 position-absolute"
            style={{ top: "8px", right: "5px", fontSize: '13px' }}
          >
            <i className="bi bi-trash"></i> Remove
          </button>
        )}
      </div>
    </>
  );
}

export default Preview;
