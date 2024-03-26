import React from 'react'

function PreviewPost({data}) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text">{data.description}</p>
        <p className="card-text">Location: {data.location}</p>
        <p className="card-text">Category: {data.category}</p>
        {data.img && (
          <img width={100} src={`http://localhost:4000/${data.img}`} alt="" />
        )}
        <br />
        {/* <button onClick={() => deleteEvent(index)} className="btn btn-danger">
          Delete
        </button> */}
      </div>
    </div>
  )
}

export default PreviewPost