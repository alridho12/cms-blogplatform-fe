import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';



const ProfileLite = () => {
  const idUser = localStorage.getItem('id')
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    axios
      .get(`https://cms-blogplatform-backend.vercel.app/users/${idUser}`)
      .then((res) => {
        setProfiles(res.data.data[0])
      })
      .catch((err) => {
        console.log(err);
      })
  }, [idUser]);

  return (
    <div className=' d-flex flex-column align-items-center justify-content-center pb-4 pt-3'>
      <img className='m-2' src={profiles.photo_profile} style={{ width: "80px", height: "80px", borderRadius: "50px", objectFit: 'cover' }} alt="" />
      <p style={{ fontSize: "15px", fontWeight: "500", color: "#BABABA" }} >{profiles.nama}</p>
      <div>
        <Link to={"/create"}>
        <button className='btn btn-warning text-white rounded' style={{ fontSize: "17px", fontWeight: "500", width: '200px', height: "40px" }}>
          Create Article
        </button>
        </Link>
      </div>
    </div>
  )
}

export default ProfileLite