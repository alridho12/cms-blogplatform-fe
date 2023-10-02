import React from 'react'
import '../Auth/auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const Register = () => {
    const navigate = useNavigate();

    const [register, setRegister] = useState({
        email: "",
        nama: "",
        password: ""
    });

    const handleChange = (e) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value,
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const registerData = {
            email: register.email,
            nama: register.nama,
            password: register.password
        };

        axios.post("https://cms-blogplatform-backend.vercel.app/users/register", registerData)
            .then((res) => {
                Swal.fire({
                    title: 'Sign up success',
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
                setTimeout(function () {
                    navigate("/login");
                }, 1000);

            })
            .catch((err) => {
                console.log(err.response);
                alert("Sign up failed");
            });
    }

    return (
        <div className="background-image d-flex justify-content-center">
            <div className='container row m-0 '>
                <div className='col-6 d-flex justify-content-end align-items-center'>
                    <p id='title'>Sharelock Holmes.</p>
                </div>
                <div className='col-6 d-flex justify-content-start align-items-center'>
                    <form onSubmit={handleRegister} className='d-flex justify-content-center flex-column'>
                        <input required name='email' value={register.email} onChange={handleChange} type="email" className='inpemail mb-3 p-2' placeholder="Email" />
                        <input required name='nama' value={register.nama} onChange={handleChange} type="text" className='inpusername mb-3 p-2' placeholder="Username" />
                        <input required name='password' value={register.password} onChange={handleChange} type="password" className='inppassword mb-3 p-2' placeholder="Password" />
                        <div className='d-flex justify-content-center'><button type='submit' className='btn btn-warning text-light login'>Sign up</button></div>
                        <hr style={{ border: "1px white solid", width: "255px" }} />
                        <div className='row m-0 d-flex justify-content-center align-items-center'>
                            <Link to={"/login"}>
                                <p className='text-white m-0'>Log in</p>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register