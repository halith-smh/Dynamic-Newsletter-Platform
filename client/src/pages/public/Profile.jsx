import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/home/Navbar";
import { toast } from "wc-toast";

function Profile() {
  const nav = useNavigate();

  const token = Cookies.get("token");

  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [data, setData] = useState({});
  const [department, setDepartment] = useState("");

  const verifyToken = async (token) => {
    try {
      const result = await axios.get("profile", {
        headers: {
          "x-access-token": token,
        },
      });
      if (result.status === 200) {
        console.log(result);
        if (result.data.user) {
          setData(result.data.user);
          setDepartment(result.data.user.department);
        }
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
      console.log(decodedToken);
    } catch (err) {
      // Error decoding token
      Cookies.remove("token");
      console.error(err.message);
      nav("/sign-in");
    }
  }, []);

  const Logout = () => {
    setIsAuth(false);
    nav("/sign-in");
    Cookies.remove("token");
    toast.success("Logout Successful");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.patch(
        "/profile",
        { department },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (result) {
        console.log(result);
        setDepartment(result.data.user.department);
        toast.success("Profile Updated...");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="HomePg">
        <Navbar
          role={role}
          email={email}
          Logout={Logout}
          profileActive="active"
        />
      </div>
      {isAuth && (
        <>
          <div className="profile-main">
            <div className="container profilePg">
              <div className="row mt-5">
                <div className="col-md-4">
                  <div
                    className="card m-auto text-center"
                    style={{ boxShadow: "-2px 2.5px 21.5px 3.5px #dddddd" }}
                  >
                    <img
                      className="m-auto rounded mt-4"
                      src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                      alt="Profile"
                      width={200}
                      style={{ border: "3px solid #6d23e4" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title text-capitalize">
                        {data.name}
                      </h5>
                      <p className="card-text text-capitalize">{data.role}</p>
                    </div>
                    {data.role === "student" && (
                      <div className="my-2">
                        <button
                          style={{
                            background: "#6d23e4",
                            color: "white",
                            fontSize: 15,
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#updateProfile"
                          className="btn btn-sm px-4 my-2"
                        >
                          <i className="bi bi-pencil-fill"></i> Edit
                        </button>
                      </div>
                    )}
                    {/* <!-- Modal --> */}
                    <div
                      className="modal fade"
                      id="updateProfile"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="exampleModalLabel"
                            >
                              Update Profile
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div className="modal-body text-start">
                              <span className="text-start my-2">
                                Department
                              </span>
                              <select
                                onChange={(e) => setDepartment(e.target.value)}
                                className="form-select"
                                value={department}
                                required
                              >
                                <option value="" disabled selected>
                                  Choose your department
                                </option>
                                <option value="Artificial Intelliegence & Data Science">
                                  AIDS
                                </option>
                                <option value="Computer Science & Engineerig">
                                  CSE
                                </option>
                                <option value="Information Technology">
                                  IT
                                </option>
                                <option value="Electrical & Electronics Engineering ">
                                  ECE
                                </option>
                              </select>
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
                                type="submit"
                                data-bs-dismiss="modal"
                                className="btn btn-primary"
                              >
                                Save changes
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Profile Details</h5>
                      <ul className="list-group">
                        <li className="list-group-item">
                          <strong>
                            <i
                              className="bi bi-envelope-at-fill"
                              style={{ color: "#6d23e4" }}
                            ></i>{" "}
                            Email:
                          </strong>{" "}
                          {data.email}
                        </li>
                        <li className="list-group-item">
                          <strong>
                            <i
                              className="bi bi-mortarboard-fill"
                              style={{ color: "#6d23e4" }}
                            ></i>{" "}
                            Department:
                          </strong>{" "}
                          {department}
                        </li>
                        <li className="list-group-item">
                          {data.role === "admin" || data.role === "editor" ? (
                            <>

                            </>
                          ) : (
                            <>
                              {" "}
                              {/* Render the score if user is not admin or editor */}
                              <i
                                className="bi bi-award-fill"
                                style={{ color: "gold" }}
                              ></i>
                              <strong>Score:</strong> {data.score} xp
                            </>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card mt-3">
                    <div className="card-body">
                      <h5 className="card-title">
                        Liked Posts:{" "}
                        <span>
                          {data.liked.length}{" "}
                          <i
                            className="bi bi-heart-fill"
                            style={{ color: "red" }}
                          ></i>
                        </span>
                      </h5>
                      <hr />
                      <h5 className="card-title">
                        <i
                          className="bi bi-calendar-event-fill"
                          style={{ color: "#6d23e4", fontSize: 18 }}
                        ></i>{" "}
                        Joined on: {formatDate(data.createdAt)}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
