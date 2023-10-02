import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

function ModalUpdateProfile() {
    const [show, setShow] = useState(false);
    const [photo, setPhoto] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setProfiles({
                ...profiles,
                photo_profile: selectedFile,
            });

            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else if (!selectedFile && profiles.photo_profile !== null) {
            setProfiles({
                ...profiles,
                photo_profile: profiles.photo_profile,
            });
        }
    };

    const handleChange = (e) => {
        setProfiles((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdateBio = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nama", profiles.nama);
        formData.append('photo_profile', profiles.photo_profile);

        axios
            .put(`https://cms-blogplatform-backend.vercel.app/users/${idUser}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((res) => {
                console.log(res);
                Swal.fire({
                    icon: 'Success',
                    title: 'Profile updated',
                    text: 'Profile has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(function () {
                }, 1000);
                window.location.reload()
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Update Profile Error',
                });
            });
    };


    return (
        <>
            <button onClick={handleShow} className="btn btn-link d-flex align-items-center" style={{ fontSize: '17px', fontWeight: "500", color: "#BABABA" }}>
                <i style={{ fontSize: '25px', color: "#BABABA" }} className="bi bi-nut"></i>
                <p style={{ margin: 0 }} className='ml-2'>Profile setting</p>
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>My profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdateBio}>
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            {profiles.photo_profile ? (
                                <img className='m-2' src={photo || profiles.photo_profile} style={{ width: "80px", height: "80px", borderRadius: "50px", objectFit: 'cover' }} alt="" />
                            ) : (
                                <i
                                    id='side-photo'
                                    className="bi bi-person-circle"
                                    style={{ fontSize: "65px", color: "#BABABA", }}
                                />
                            )}
                            <div className="input-group d-flex justify-content-center">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" style={{ backgroundColor: 'transparent', border: "none" }}>
                                        <i className="bi bi-pencil" style={{ color: '#BABABA' }}></i>
                                    </span>
                                </div>
                                <input
                                    id='ip'
                                    style={{ border: 'none', fontSize: "17px", color: "#BABABA", fontWeight: "400", width: "120px" }}
                                    type="text"
                                    name='nama'
                                    onChange={handleChange}
                                    value={profiles.nama}
                                />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <label htmlFor="photo_profile"><i className="bi bi-camera" style={{ color: '#BABABA', fontSize: "30px" }}></i></label>
                            <input
                                style={{ display: "none" }}
                                id='photo_profile'
                                type="file"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className='d-flex justify-content-center mt-1'>
                            <button className='btn btn-warning text-white' style={{ fontSize: "15px", fontWeight: "500" }} >Update Profile</button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateProfile;