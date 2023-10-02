import axios from 'axios';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../CRUD/app.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Test = () => {
    const idUser = localStorage.getItem("id")
    const [content, setContent] = useState('');
    const [bannerPreview, setBannerPreview] = useState(null);
    const navigate = useNavigate();

    const modules = {
        toolbar: {
            container: [
                [{ header: '1' }, { header: '2' }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link'],
                ['image'],
                ['clean'],
            ],
        },
    };
    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'bullet',
        'link',
        'image',
    ];



    let [data, setData] = useState({
        user_id: "",
        title: "",
    })

    let [banner, setBanner] = useState(null)

    let handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
        console.log(data);
    }

    let handleUpload = (e) => {
        setBanner(e.target.files[0]);
        setBannerPreview(URL.createObjectURL(e.target.files[0]));
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("user_id", data.user_id);
        formData.append("title", data.title);
        formData.append("content", content);
        formData.append("banner", banner);
        axios.post(`https://cms-blogplatform-backend.vercel.app/article`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log(res);
                Swal.fire({
                    title: 'Create success',
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
                    navigate("/dashboard");
                }, 1000);
            })
            .catch((err) => {
                alert(err)
            })

    }
    return (
        <div className='box container'>
            <div className='full-background'>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                    <label style={{ fontSize: "17px", fontWeight: "500" }}>Title:</label>
                    <input
                        className='inp-title'
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label className='lbl-banner' style={{ fontSize: "17px", fontWeight: "500", cursor: "pointer" }} htmlFor='banner'>Select Banner</label>
                    <input
                        style={{ display: "none" }}
                        id='banner'
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                    />
                    {bannerPreview && (
                        <div className=' d-flex justify-content-center'>
                            <img
                                src={bannerPreview}
                                alt="Banner Preview"
                                style={{ maxWidth: '50%', maxHeight: '50%', marginTop: '10px', }}
                            />
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label style={{ fontSize: "17px", fontWeight: "500" }}>Content:</label>
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
                    />
                </div>
                <input
                    type="hidden"
                    name="user_id"
                    value={data.user_id = idUser}
                    onChange={handleChange}
                />
                <div className=' d-flex justify-content-center'>
                    <button className='btn btn-warning text-white mb-3 rounded' style={{ fontSize: "17px", fontWeight: "500", width: "250px", height: "50px" }} type="submit">Create Article</button>
                </div>
            </form>
        </div>
    )
}

export default Test