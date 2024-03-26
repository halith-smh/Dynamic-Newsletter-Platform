import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PostsTable({ token, formatDate }) {
  axios.defaults.headers["x-access-token"] = token;

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

  const [data, setData] = useState([]);

  const dataFetch = async () => {
    try {
      const resData = await axios.get(
        "http://localhost:4000/api/admin/table-posts"
      );
      setData(resData.data);
      console.log(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Comments</th>
            <th scope="col">Preview</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ele, index) => (
            <tr key={ele._id}>
              <th scope="row">{index + 1}</th>
              <td>{formatDate(ele.date)}</td>
              <td>{ele.comments.length}</td>
              <td>
                <Link target="_blank" to={`/newsletter/${formatDateLink(ele.date)}`}>{formatDateLink(ele.date)}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostsTable;
