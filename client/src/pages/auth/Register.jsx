import React, { useEffect, useState } from "react";

import Inputs from "../../components/auth/Inputs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "wc-toast";
import Cookies from "js-cookie";

function Register() {
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token){
      navigate('/');
      return;
    }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tLoader = toast.loading('Creating User...')
    try{
      const result = await axios.post('auth/register', {name,email,password});
      console.log(result);
      toast.dismiss(tLoader);
      toast.success('Registration successful...');
      setEmail("");
      setName("");
      setPassword("");
      navigate('/sign-in');
      
      // alert('Success');
    }catch(err){
      toast.dismiss(tLoader);
      // alert(err.response.data);
      toast.error(err.response.data);
      console.log(err);
    }
  }

  return (
    <div className="registerPg">
      <div className="mainLayout">
        <div className="d-flex justify-content-between">

          <div className="info col-5">
            <h1 className="mb-4"> Sign Up</h1>

            <form onSubmit={handleSubmit}>
            <Inputs value={name} label={'Name'} type={'text'} placeholder={'Full Name'} onChange={(e) => setName(e.target.value)} />
            <Inputs value={email} label={'Email'} type={'mail'} placeholder={'example@email.com'} onChange={(e) => setEmail(e.target.value)} />
            <Inputs value={password} label={'Password'} type={'password'} placeholder={'xxxxyyyyyzzz'} onChange={(e) => setPassword(e.target.value)}  />
            
            <button className="auth-btn my-4" type="submit">Sign Up</button>
            </form>

            <h6>Already have an account? <span className="primary-color"><Link className='ref' to='/sign-in'>Sign In</Link></span></h6>
          </div>

          <div className="img col-6">
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
