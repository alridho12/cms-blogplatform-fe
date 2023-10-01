import React from 'react'
import '../Auth/auth.css'
import elips from '../../assets/image/ellipse.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      email: login.email,
      password: login.password
    };

    axios.post("https://cms-blogplatform-backend.vercel.app/users/login", loginData)
      .then((res) => {
        Swal.fire({
          title: 'Login success',
          showConfirmButton: false,
          icon: 'success',
          target: '#custom-target',
          timer: 2500,
          timerProgressBar: true,
          customClass: {
            container: 'position-absolute',
          },
          toast: true,
          position: 'bottom-right',
        });
        localStorage.setItem("token", res.data.data.token)
        localStorage.setItem("id", res.data.data.user_id)
        setTimeout(function () {
          navigate("/dashboard");
        }, 1000);

      })
      .catch((err) => {
        console.log(err.response);
        alert("login failed");
      });

  }

  return (
    <div className="background-image d-flex justify-content-center">
      <div className='container row m-0 '>
        <div className='col-6 d-flex justify-content-end align-items-center'>
          <p id='title'>Sharelock Holmes.</p>
        </div>
        <div className='col-6 d-flex justify-content-start align-items-center'>
          <form onSubmit={handleLogin} className='d-flex justify-content-center flex-column'>
            <input name='email' value={login.email} onChange={handleChange} type="email" className='inpemail mb-3 p-2' placeholder="Email" />
            <input name='password' value={login.password} onChange={handleChange} type="password" className='inppassword mb-3 p-2' placeholder="Password" />
            <div className='d-flex justify-content-center'><button type="submit" className='btn btn-warning text-light login'>Log in</button></div>
            <hr style={{ border: "1px white solid", width: "255px" }} />
            <div className='row m-0 d-flex justify-content-between align-items-center'>
              <Link to={"/register"}><p className='text-white m-0'>Sign up</p></Link>
              <img className='mt-1' src={elips} alt="" style={{ width: "7px", height: "7px" }} />
              <p className='text-white m-0'>Forget password ?</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )

}

export default Login