import React from "react";

function Preview({ event, index, deleteEvent }) {
  return (
    <>
      <div class="card">
        <div class="card-body">
          <h5
            class="card-title m-auto text-center py-3"
            style={{ fontSize: 25, fontWeight: 600 }}
          >
            {event.title}
          </h5>
          {event.img && (
            <img
              class="card-img-top"
              width={600}
              height={450}
              src={URL.createObjectURL(event.img)}
              alt="Event Preview"
            />
          )}
          <p className="card-text p-2 my-2" style={{ fontSize: 18 }}>
            {event.description}
          </p>
          <div className="card-footerCC d-flex justify-content-between">
            <div className="left" >
              <h6 className="mt-2" style={{fontSize: 18}}>
                <i class="bi bi-geo-alt-fill" style={{color: '#6d23e4'}} ></i> {event.location}
              </h6>
              <h6 className="mt-3" style={{fontSize: 18}}>
                <i class="bi bi-tag-fill" style={{color: '#6d23e4'}}></i> {event.category}
              </h6>
            </div>
            <div className="right">
            <h6 className="label-clr mt-4">{event.department}</h6>
            </div>
          </div>
        </div>

        <button
          title="Delete an event"
          onClick={() => deleteEvent(index)}
          className="btn btn-danger mr-2 position-absolute"
          style={{ top: "5px", right: "5px" }}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </>
    // <div
    //   className="card col-12 shadow position-relative mb-4"
    //   style={{ display: 'flex', flexDirection: 'column',   height: '100%' }}
    // >
    //   <div className="card-body" style={{flex: 1, overflow: 'hidden'}}>
    //     <h4 className="card-title">{event.title}</h4>
    //     {event.img && (
    //       <img

    //         width={600}
    //         height={450}
    //         src={URL.createObjectURL(event.img)}
    //         alt="Event Preview"
    //       />
    //     )}
    //     <p className="card-text">{event.description}</p>
    //     <p className="card-text">Category: {event.category}</p>
    //     <p className="card-text">
    //       <i className="bi bi-geo-alt-fill"></i> Location: {event.location}
    //     </p>

    //     <button
    //       onClick={() => deleteEvent(index)}
    //       className="btn btn-danger mr-2 position-absolute"
    //       style={{ top: "5px", right: "5px" }}
    //     >
    //       <i className="bi bi-trash"></i>
    //     </button>
    //   </div>
    // </div>
  );
}

export default Preview;
