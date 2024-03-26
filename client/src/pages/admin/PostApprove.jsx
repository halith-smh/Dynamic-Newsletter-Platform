import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "wc-toast";

import Navbar from "../../components/home/Navbar";
import PreviewPost from "../../components/admin/PreviewPost";
import PostsTable from "./PostsTable";

function PostApprove() {
  const [isLoading, setIsLoading] = useState(true);

  const nav = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const token = Cookies.get("token");
  axios.defaults.headers["x-access-token"] = token;

  const verifyToken = async (token) => {
    try {
      const result = await axios.get(
        "http://localhost:4000/api/admin/dashboard"
      );
      if (result.status === 200) {
        console.log(result);

        const count_value = result.data.count;
        const postD = result.data.p_data;

        if (postD !== null) {
          const eventD = postD.events;
          setEvents(eventD);
        }

        setCounts(count_value);
        setPostdata(postD);

        console.log(events);
        setIsAuth(true);
      } else {
        nav("/sign-in");
        console.error(result);
      }
    } catch (err) {
      nav("/sign-in");
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!token) {
      nav("/sign-in");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);

      if (decodedToken.exp * 1000 < Date.now()) {
        // Token expired
        Cookies.remove("token");
        nav("/sign-in");
        return;
      }

      const { role, email } = decodedToken;

      if (!role) {
        // User role not found
        Cookies.remove("token");
        nav("/sign-in");
        return;
      }

      // Optionally, verify token with backend
      verifyToken(token);
      setEmail(email);
      setRole(role);
      //   setFormData({ ...formData, dept: department });
      //   setDept({...formData, dept: department});

      console.log(decodedToken);
    } catch (err) {
      // Error decoding token
      Cookies.remove("token");
      console.error(err.message);
      nav("/sign-in");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const Logout = () => {
    setIsAuth(false);
    nav("/sign-in");
    Cookies.remove("token");
    toast.success("Logout Successful");
  };

  //dashboard Page
  const [counts, setCounts] = useState({});
  const [postData, setPostdata] = useState({});
  const [events, setEvents] = useState({});

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

  const [selectedImage, setSelectedImage] = useState("/thumbnail/img1.png");

  const handleImageChange = (event) => {
    setSelectedImage(event.target.value);
  };

  const handlePublish = async () => {
    const data = { _id: postData._id, events, thumbnail: selectedImage };
    console.log(data);

    try {
      const response = await axios.patch(
        "http://localhost:4000/api/admin/publish",
        data
      );
      console.log(response);
      setEvents({});
      verifyToken();
    } catch (error) {
      console.error("Error publishing post:", error);
    }
  };
  return (
    <>
      {isLoading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {isAuth && (
        <>
          <div className="HomePg">
            <Navbar role={role} email={email} Logout={Logout} active="active" />
          </div>
          {/* =============Model==========  */}
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    {postData && formatDate(postData.date)}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <h6>Thumbnails</h6>

                  <div>
                    <input
                      type="radio"
                      id="img1"
                      name="image"
                      value="/thumbnail/img1.png"
                      onChange={handleImageChange}
                      checked
                    />
                    <label htmlFor="img1">
                      <img src="/thumbnail/img1.png" width={80} alt="" />
                    </label>

                    <input
                      type="radio"
                      id="img2"
                      name="image"
                      value="/thumbnail/img1.png"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="img2">
                      <img src="/thumbnail/img1.png" width={80} alt="" />
                    </label>

                    <input
                      type="radio"
                      id="img3"
                      name="image"
                      value="/thumbnail/img1.png"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="img3">
                      <img src="/thumbnail/img1.png" width={80} alt="" />
                    </label>

                    <input
                      type="radio"
                      id="img4"
                      name="image"
                      value="/thumbnail/img1.png"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="img4">
                      <img src="/thumbnail/img1.png" width={80} alt="" />
                    </label>

                    <input
                      type="radio"
                      id="img5"
                      name="image"
                      value="/thumbnail/img1.png"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="img5">
                      <img src="/thumbnail/img1.png" width={80} alt="" />
                    </label>
                    <hr />
                    {selectedImage && (
                      <div>
                        <h5>Newsletter Preview</h5>
                        <img src={selectedImage} width={150} alt="" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={handlePublish}
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* =============Model==========  */}

          <div className="adminPg">
            <div className="container-fluid bg-decor">
              <div className="d-flex justify-content-between">
                <div className="info">
                  <h3> Dashboard</h3>
                </div>
                <div className="bttn">
                  <div
                    className="btn btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Approve Newsletter
                  </div>
                </div>
              </div>
            </div>
            <div className="conatiner px-2 box-info">
              <div className="d-flex justify-content-between">
                <div className="card col-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h6 className="card-title">No. of Letters</h6>
                      <div className="icon">
                        <i className="bi bi-newspaper"></i>
                      </div>
                    </div>
                    <h1>{counts.p_count.toString().padStart(2, "0")}</h1>
                    <h6>Published</h6>
                  </div>
                </div>

                <div className="card col-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h6 className="card-title">No. of Letters</h6>
                      <div className="icon">
                        <i className="bi bi-newspaper"></i>
                      </div>
                    </div>
                    <h1>{counts.pen_count.toString().padStart(2, "0")}</h1>
                    <h6>Pending</h6>
                  </div>
                </div>

                <div className="card col-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h6 className="card-title">No. of Students</h6>
                      <div className="icon">
                        <i className="bi bi-newspaper"></i>
                      </div>
                    </div>
                    <h1>{counts.s_count.toString().padStart(2, "0")}</h1>
                    <h6>All Dept</h6>
                  </div>
                </div>

                <div className="card col-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h6 className="card-title">No. of Editors</h6>
                      <div className="icon">
                        <i className="bi bi-newspaper"></i>
                      </div>
                    </div>
                    <h1>{counts.e_count.toString().padStart(2, "0")}</h1>
                    <h6>All Dept</h6>
                  </div>
                </div>
              </div>
            </div>

            {events &&
              events.length > 0 &&
              events.map((ele) => <PreviewPost key={ele._id} data={ele} />)}

            {counts.pen_count === 0 && (
              <PostsTable token={token} formatDate={formatDate} />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default PostApprove;
