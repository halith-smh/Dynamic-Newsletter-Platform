import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "wc-toast";

import Navbar from "../../components/home/Navbar";
import Breadcrumb from "../../components/newsletter/Breadcrumb";
import SinglePost from "../../components/newsletter/SinglePost";

function Newsletter() {
  const nav = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [notFound, setNotFound] = useState(false);

  const token = Cookies.get("token");
  axios.defaults.headers["x-access-token"] = token;

  const { date } = useParams();

  const serverRequest = async () => {
    try {
      const respone = await axios.get(
        "http://localhost:4000/api/newsletter/" + date
      );
      if (respone.status === 200) {
        setIsAuth(true);
        setData(respone.data.data[0]);
      }
    } catch (error) {
      setNotFound(true);
      console.log(respone);
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

      setEmail(email);
      setRole(role);
      serverRequest();
      console.log(data);
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

  //newletter data
  const [data, setData] = useState({});

  return (
    <>
      {isAuth && (
        <>
          <div className="HomePg">
            <Navbar role={role} email={email} Logout={Logout} active="active" />
          </div>
          <div className="newsletter">
           <div className="col-12">
           <div className="title-cc container-fluid">
              <Breadcrumb date={data.date} />
            </div>
            <div className="conatiner mt-4">
              <div className="px-lg-5">
                {data.events.map((ele) => (
                  <SinglePost key={ele._id} mainId={data._id} data={ele} email={email} />
                ))}
              </div>
            </div>
           </div>
          </div>
        </>
      )}
      {notFound && (
        <>
          <h1 style={{height: '100vh'}} className="d-flex justify-content-center align-items-center">404 Not Found</h1>
        </>
      )}
    </>
  );
}

export default Newsletter;
