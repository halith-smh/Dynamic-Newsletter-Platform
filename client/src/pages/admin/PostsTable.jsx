import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "wc-toast";

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
      const resData = await axios.get("admin/table-posts");
      setData(resData.data);
      console.log(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const shareURL = (date) => {
    navigator.clipboard.writeText(
      `http://localhost:5173/newsletter/${date}`
    );
    toast(`Copied to Clipboard`, { theme: { type: "dark" } });
  };

  return (
    <div className="col-11 m-auto rounded shadow">
      <table className="table table-hover rounded" style={{ fontSize: 18 }}>
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
              <td className="">{ele.comments.length}</td>
              <td>
                <span
                  type="button"
                  onClick={() => shareURL(formatDateLink(ele.date))}
                  title="Share"
                  className="px-2"
                >
                  <i className="bi bi-share-fill"></i>
                </span>
                <Link
                  target="_blank"
                  to={`/newsletter/${formatDateLink(ele.date)}`}
                >
                  {formatDateLink(ele.date)}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostsTable;
