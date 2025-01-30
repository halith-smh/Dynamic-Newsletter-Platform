import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/home/Navbar";
import { toast } from "wc-toast";

function Editors() {
  const nav = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const verifyToken = async (token) => {
    try {
      const result = await axios.get("auth/login", {
        headers: {
          "x-access-token": token,
        },
      });
      if (result.status === 200) {
        //console.log(result);
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
        <>
          <div className="HomePg">
            <Navbar
              role={role}
              email={email}
              Logout={Logout}
              ediorActive="active"
            />
          </div>

          <div className="profile-main">
            <div className="container editorsPg">
              {/* <h2>List of Editors</h2> */}
              <div className="row" style={{justifyContent: 'space-between'}}>
                <div className="col-md-3 editorPrev">
                  <div className="editor m-auto text-center">
                    <img
                      src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1711192847~exp=1711193447~hmac=112e72fe9188729eb693d2c43110642285641034596fa211f2e256e344695b5f"
                      alt="Editor 1"
                      width={220}
                    />
                    <h5>
                      <strong>Mr. Arun Kumar</strong>
                    </h5>
                    <h6 style={{color: '#6d23e4', fontSize: 18, fontWeight: 600}}>
                      <i className="bi bi-mortarboard p-1"></i>AI & DS
                    </h6>
                  </div>
                </div>

                <div className="col-md-3 editorPrev">
                  <div className="editor m-auto text-center">
                    <img
                      src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1711192847~exp=1711193447~hmac=112e72fe9188729eb693d2c43110642285641034596fa211f2e256e344695b5f"
                      alt="Editor 1"
                      width={220}
                    />
                    <h5>
                      <strong>Mr. Raghavendran</strong>
                    </h5>
                    <h6 style={{color: '#6d23e4', fontSize: 18, fontWeight: 600}}>
                      <i className="bi bi-mortarboard p-1"></i>CSE
                    </h6>
                  </div>
                </div>

                <div className="col-md-3 editorPrev">
                  <div className="editor m-auto text-center">
                    <img
                      src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?w=740&t=st=1711192847~exp=1711193447~hmac=112e72fe9188729eb693d2c43110642285641034596fa211f2e256e344695b5f"
                      alt="Editor 1"
                      width={220}
                    />
                    <h5>
                      <strong>Mr. Suriya Kumar</strong>
                    </h5>
                    <h6 style={{color: '#6d23e4', fontSize: 18, fontWeight: 600}}>
                      <i className="bi bi-mortarboard p-1"></i>IT
                    </h6>
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

export default Editors;
