import React from 'react'
import '../Dashboard/dashboard.css'
import group from '../../assets/image/Group5.png'
import SideBar from '../../components/sidebar/SideBar'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
    const [data,setData] = useState([])
    
    useEffect(() => {
        axios
            .get("https://cms-blogplatform-backend.vercel.app/article")
            .then((res) => {
                setData(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    return (
        <div className=' container'>
            <div className='full-background'>
            </div>
            <div className='mt-3 mb-n5'>
                <p id='title' className='ml-5 mt-3'>Sharelock Holmes.</p>
            </div>
            <div id='group' className='container mt-n5'>
                <img id='folder' className='' src={group} alt="" />
            </div>
            <div className='row m-0'>
                <div className=' col-3'>
                    <SideBar />
                </div>
                <div className='p-5 col-9'>
                    <section className="container mt-5 ">
                        <div
                            className="input-group d-flex align-items-center"
                            style={{
                                padding: 5,
                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                                borderRadius: 5
                            }}
                        >
                            <input
                                type="text"
                                className="form-control"
                                style={{ height: 50, border: "transparent", borderRight: "1px solid" }}
                                placeholder="search for any..."
                                aria-label="Recipient's username with two button addons"
                                aria-describedby="button-addon4"
                            />
                            <div className="input-group-append" id="button-addon4">
                                <div className="input-group">
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-outline-secondary dropdown-toggle"
                                            style={{ border: "transparent", color: "#9EA0A5" }}
                                            type="button"
                                            data-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Category
                                        </button>
                                        <div className="dropdown-menu">
                                            <Link className="dropdown-item" to="#">
                                                Sort by name
                                            </Link>
                                            <Link className="dropdown-item" to="#">
                                                Sort by title
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-warning"
                                    type="button"
                                    style={{
                                        color: "white",
                                        borderRadius: 5,
                                        width: 110,
                                        fontWeight: 500
                                    }}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </section>
                    <div className='container mt-5' >
                        <div className='box-article container row m-0' style={{}}>
                            <p> hello</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard