import React from 'react'
import '../Dashboard/dashboard.css'
import group from '../../assets/image/Group5.png'
import SideBar from '../../components/sidebar/SideBar'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns';
import ModalDelete from '../../components/modal/ModalDelete'



const MyArticle = () => {
    const [data, setData] = useState([])
    const idUser = localStorage.getItem("id")


    useEffect(() => {
        axios
            .get(`https://cms-blogplatform-backend.vercel.app/article/user/${idUser}`)
            .then((res) => {
                setData(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [idUser])

    const renderArticlesOrMessage = () => {
        if (data === null) {
            return <p style={{margin:0, textAlign:"center", fontSize: "25px", fontWeight: "400"}}>No articles available</p>
        } else if (data.length === 0) {
            return <p style={{margin:0, textAlign:"center", fontSize: "25px", fontWeight: "400"}}>No articles available</p>
        } else {
            return (
                <>
                    {data.map((article) => (
                        <div className='box-articles container d-flex align-items-center row m-0 mb-3' style={{}}>
                            <div className='col-8'>
                                <p style={{ fontSize: "15px", fontWeight: "500", color: "#BABABA" }}>{article.title}</p>
                                <p style={{ fontSize: "15px", fontWeight: "500", margin: 0 }}>Create on {format(new Date(article.create_at), 'yyyy/MM/dd')}</p>
                                {article.update_at && (
                                    <p style={{ fontSize: "15px", fontWeight: "500", margin: 0 }}>Update on {format(new Date(article.update_at), 'yyyy/MM/dd')}</p>
                                )}
                            </div>
                            <div className='col-4 d-flex justify-content-center align-items-center'>
                                <div><p style={{ margin: "0", color: "#BABABA", fontSize: "15px", fontWeight: "500" }}>112</p></div>
                                <div><i style={{ fontSize: '25px', color: "#BABABA" }} className="bi bi-eye ml-2"></i></div>
                                <Link to={`/update/${article.article_id}`}><i style={{ fontSize: '22px', color: "#ffc107" }} className="bi bi-pencil-square ml-3"></i></Link>
                                <ModalDelete article_id={article.article_id} />
                            </div>
                        </div>
                    ))}
                </>
            );
        }
    };


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
                        {renderArticlesOrMessage()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyArticle