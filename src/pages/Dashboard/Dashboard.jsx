import React from 'react'
import '../Dashboard/dashboard.css'
import group from '../../assets/image/Group5.png'
import SideBar from '../../components/sidebar/SideBar'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns';


const Dashboard = () => {
    const [data, setData] = useState([])

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
                        {data.map((article) => (
                            <div className='box-article container d-flex align-items-center row m-0 py-3 mb-3' style={{}}>
                                <div className='ml-n4 col-3 flex-column d-flex align-items-center justify-content-center'>
                                    {article.photo_profile ? (
                                        <img src={article.photo_profile} style={{ width: "55px", height: "55px", borderRadius: "50px" }} alt="" />
                                    ) : (
                                        <i
                                            id='side-photo'
                                            className="bi bi-person-circle"
                                            style={{ fontSize: "35px", color: "#BABABA", }}
                                        />
                                    )}                                    <p className='mt-3' style={{ fontSize: "15px", fontWeight: "500", color: "#BABABA", margin: 0 }}>{article.author_name}</p>
                                </div>
                                <div className='col-8'>
                                    <p style={{ fontSize: "15px", fontWeight: "500", color: "#BABABA" }}>{article.title}</p>
                                    <p style={{ fontSize: "15px", fontWeight: "500", margin: 0 }}>Create on {format(new Date(article.create_at), 'yyyy/MM/dd')}</p>
                                    {article.update_at && (
                                        <p style={{ fontSize: "15px", fontWeight: "500" }}>Update on {format(new Date(article.update_at), 'yyyy/MM/dd')}</p>
                                    )}
                                </div>
                                <div className='col-1 d-flex align-items-center'>
                                    <div><p style={{ margin: "0", color: "#BABABA", fontSize: "15px", fontWeight: "500" }}>112</p></div>
                                    <div><i style={{ fontSize: '25px', color: "#BABABA" }} className="bi bi-eye ml-2"></i></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard