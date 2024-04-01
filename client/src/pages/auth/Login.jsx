import React, { useEffect, useState } from "react";
import Inputs from "../../components/auth/Inputs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "wc-toast";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      nav("/");
      return;
    }
  }, []);

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tLoader = toast.loading("Authenticating");

    try {
      const result = await axios.post("/auth/login", { email, password });
      if (result) {
        console.log(result);
        console.log(result.data);
        toast.dismiss(tLoader);
        toast.success("Login Successful");
        // nav("/");
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(tLoader);
      toast.error(error.response.data);
      console.error(error.response.data);
    }
  };

  return (
    <div className="registerPg">
      <div className="mainLayout">
        <div className="d-flex justify-content-between">
          <div className="info col-5">
            <h1 className="mb-4"> Sign In</h1>
            <form onSubmit={handleSubmit}>
              <Inputs
                value={email}
                label={"Email"}
                type={"mail"}
                placeholder={"example@email.com"}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Inputs
                value={password}
                label={"Password"}
                type={"password"}
                placeholder={"xxxxyyyyyzzz"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="auth-btn my-4" type="submit">
                Sign In
              </button>
            </form>
            <h6>
              Don't have an account?{" "}
              <span className="primary-color">
                <Link className="ref" to="/sign-up">
                  Sign Up
                </Link>
              </span>
            </h6>
          </div>

          <div className="img col-6 loginWidth"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
