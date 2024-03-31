import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "wc-toast";

import Preview from "./Preview";
import Navbar from "../../components/home/Navbar";

function Editor() {
  // const [isLoading, setIsLoading] = useState(true);

  const nav = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [dept, setDept] = useState("");

  const verifyToken = async (token) => {
    try {
      const result = await axios.get("/posts/dashboard", {
        headers: {
          "x-access-token": token,
        },
      });
      if (result.status === 200) {
        console.log(result);
        setIsAuth(true);
      } else {
        nav("/");
        console.error(result);
      }
    } catch (err) {
      nav("/sign-in");
      console.error(err.message);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");

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

      const { role, email, department } = decodedToken;

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
      setDept(department);
      //   setFormData({ ...formData, dept: department });
      //   setDept({...formData, dept: department});

      console.log(decodedToken);
    } catch (err) {
      // Error decoding token
      Cookies.remove("token");
      console.error(err.message);
      nav("/sign-in");
    } finally {
      // setIsLoading(false);
    }
  }, []);

  //form-data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    img: null,
    department: null,
    editor: null,
  });
  const [events, setEvents] = useState([]);

  const eventPrevie = () => {
    events.map((ele) => {
      console.log(ele);
    });
  };

  const hangleFormSubmit = (e) => {
    e.preventDefault();

    setFormData((formData.department = dept));
    setFormData((formData.editor = email));

    setEvents([...events, formData]);
    setFormData({
      title: "",
      description: "",
      location: "",
      category: "",
      img: null,
      dept: dept,
    });
  };

  const handleEventsSubmit = async () => {
    try {
      const response = await axios.post(
        "posts/add",
        { events: events }, // Pass updated formData directly here
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response);
      toast.success('Posts submitted for Review')
      setEvents([]);
    } catch (error) {
      console.log(error);
      toast.error('An error oocured :(');
      // console.error("Error:", error.response.data);
    }
  };

  useEffect(() => {
    console.log(events);
    eventPrevie();
  }, [events]);

  const deleteEvent = (index) => {
    const updatedEvents = [...events]; // Create a copy of the events array
    updatedEvents.splice(index, 1); // Remove the element at the specified index
    setEvents(updatedEvents); // Update the state with the modified array
  };

  const Logout = () => {
    setIsAuth(false);
    nav("/sign-in");
    Cookies.remove("token");
    toast.success("Logout Successful");
  };

  const date = new Date();

  function getMonthName(month) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month];
  }

  return (
    <>
      {/* {isLoading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )} */}
      {isAuth && (
        <>
          <div className="HomePg">
            <Navbar role={role} email={email} Logout={Logout} active="active" />
          </div>
          <div className="add-content">
            <div className="content-layout">
              <div className="container-fluid bg-decor">
                <div className="d-flex justify-content-between">
                  <div className="info">
                    <h3>{`${date.getDate()} ${getMonthName(
                      date.getMonth()
                    )} ${date.getFullYear()}`}</h3>
                    <span>
                      👋 Happy{" "}
                      {date.toLocaleDateString("en-US", { weekday: "long" })}
                    </span>
                  </div>

                    {events.length > 0 && (<div className="bttn">
                    <div
                      className="btn btn-light"
                      onClick={handleEventsSubmit}
                      type="button"
                    >
                      <i className="bi bi-folder-symlink"></i> &nbsp; Submit For
                      Review
                    </div>
                  </div>)}
                  

                </div>
              </div>

             
              <div className="container formData">
                <div className="col-md-12 px-2">
                  <h5 className="m-auto today text-center pt-3">
                    Today's Content
                  </h5>
                  <h6 className="label-clr m-auto mt-2 text-center"><i className="bi bi-mortarboard"></i>  {dept}</h6>
                  <form onSubmit={hangleFormSubmit} className="mb-4 mt-3">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="form-control"
                        placeholder="Enter title"
                        required
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label>Description</label>
                      <textarea
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="form-control"
                        value={formData.description}
                        rows="3"
                        placeholder="Enter description"
                        required
                      ></textarea>
                    </div>
                    <div className="input-group mt-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="bi bi-geo-alt-fill"></i> Location
                        </div>
                      </div>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="form-control"
                        placeholder="Enter location"
                        required
                      />
                    </div>
                    <div className="input-group mt-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">Category</div>
                      </div>
                      <input
                        className="form-control"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        list="gfglist"
                        id="datalist"
                        placeholder="Select category"
                        required
                      />
                      <datalist id="gfglist">
                        <option value="Webinar" />
                        <option value="Placement" />
                      </datalist>
                    </div>

                    <div className="form-group my-3">
                      <label>
                        Upload <i className="bi bi-images"></i>&nbsp;&nbsp;
                      </label>
                      <input
                        onChange={(e) =>
                          setFormData({ ...formData, img: e.target.files[0] })
                        }
                        type="file"
                        accept="image/*"
                        className="form-control-file"
                        required
                      />
                    </div>
                    {/* <button type="submit" className="btn btn-primary mr-2">
                      Add News
                    </button> */}
                    <button className="auth-btn my-1" type="submit">
                      <i className="bi bi-file-earmark-plus"></i> Add News{" "}
                    </button>
                  </form>
                </div>
              </div>

              <hr />

              <h3 className="p-4" style={{fontWeight: 600}}>Content Preview</h3>
              <div
                className="container-fluid mt-4"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(calc(50% - 20px), 1fr))",
                  gap: "20px",
                }}
              >
                {events.map((event, index) => (
                  <Preview
                    key={index}
                    event={event}
                    index={index}
                    deleteEvent={deleteEvent}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Editor;
