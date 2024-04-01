import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "wc-toast";

import Hero from "../../components/home/Hero";
import Navbar from "../../components/home/Navbar";
import NewsletterPreview from "../../components/home/NewsletterPreview";

function Index() {
  const nav = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [posts, setPosts] = useState({});

  const verifyToken = async (token) => {
    try {
      const result = await axios.get("auth/login", {
        headers: {
          "x-access-token": token,
        },
      });
      if (result.status === 200) {
        console.log(result);
        if (result.data.posts) {
          setPosts(result.data.posts);
          console.log(posts);
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
    const token = Cookies.get("token");

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

  return (
    <>
      {isAuth && (
        <div className="HomePg">
          <Navbar
            role={role}
            email={email}
            Logout={Logout}
            homeActive="active"
          />
          <div className="main">
            <Hero />
          </div>
          <div className="bgClrBlue">
          <div className="container homeNews">
            <h3 style={{ fontWeight: 600 }} className="mb-3 pt-5">
              {" "}
              Previous Newsletters
            </h3>
            <div className="row" style={{display: 'flex', justifyContent: 'space-evenly'}}>
              {posts.map((element, index) => (
                <NewsletterPreview key={element._id} element={element} />
              ))}
            </div>
          </div>
          </div>
         
        </div>
      )}
    </>
  );
}

export default Index;
