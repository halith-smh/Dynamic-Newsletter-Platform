import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/home/Navbar";
import { toast } from "wc-toast";

function TopReaders() {
  const nav = useNavigate();

  const token = Cookies.get("token");

  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [data, setData] = useState([]);

  const verifyToken = async (token) => {
    try {
      const result = await axios.get("top-readers", {
        headers: {
          "x-access-token": token,
        },
      });
      if (result.status === 200) {
        console.log(result);
        if (result.data.readers) {
          setData(result.data.readers);
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

  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return (
          <>
            <i className="bi bi-trophy-fill" style={{ color: "gold" }}></i>{" "}
            {`${index + 1}st`}
          </>
        );
      case 1:
        return (
          <>
            <i className="bi bi-trophy-fill" style={{ color: "silver" }}></i>{" "}
            {`${index + 1}st`}
          </>
        );
      case 2:
        return (
          <>
            <i className="bi bi-trophy-fill" style={{ color: "#cd7f32" }}></i>{" "}
            {`${index + 1}st`}
          </>
        );
      default:
        return `${index + 1}th`;
    }
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
              readersActive="active"
            />
          </div>

          <div className="profile-mains">
            <div className="container leaderboard-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="leaderboard-header text-center">
                    <h2>Leaderboard</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <table className="table border">
                    <thead>
                      <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>XP Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((reader, index) => (
                        <tr id={index} key={index}>
                          <td>{getRankIcon(index)}</td>
                          <td className="text-capitalize">{reader.name}</td>
                          <td>{`${reader.score} XP`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TopReaders;
