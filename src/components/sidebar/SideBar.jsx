import { Link, useNavigate } from 'react-router-dom';
import ProfileLite from '../profile/ProfileLite';
import Swal from 'sweetalert2';
import ModalUpdateProfile from '../modal/ModalUpdateProfile';

function SideBar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear()
        Swal.fire({
            title: 'Log out success',
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
        navigate("/login");
    }
    return (
        <div>
            <div className='mx-5 box' style={{ marginTop: "65px" }}>
                <ProfileLite />
                <Link to={"/dashboard"}>
                    <div className='container align-items-center mb-2'>
                        <div className='row m-0 d-flex align-items-center'>
                            <i style={{ fontSize: '25px', color: "#BABABA" }} className="bi bi-clipboard2-data "></i>
                            <p style={{ fontSize: '17px', fontWeight: "500", color: "#BABABA", margin: "0" }} className=' ml-2' >Dashboard</p>
                        </div>
                    </div>
                </Link>
                <Link to={"/myarticle"} >
                    <div className='container align-items-center mb-1'>
                        <div className='row m-0 d-flex align-items-center'>
                            <i style={{ fontSize: '25px', color: "#BABABA" }} className="bi bi-folder2-open "></i>
                            <p style={{ fontSize: '17px', fontWeight: "500", color: "#BABABA", margin: "0" }} className=' ml-2' >My article</p>
                        </div>
                    </div>
                </Link>
                <ModalUpdateProfile />
                <div id='lgt'>
                    <button onClick={handleLogout} className="btn btn-link d-flex align-items-center" style={{ fontSize: '17px', fontWeight: "500", color: "#BABABA" }}>
                        <i style={{ fontSize: '25px', color: "#BABABA" }} className="bi bi-box-arrow-in-left"></i>
                        <p style={{ margin: 0 }} className='ml-2'>Log out</p>
                    </button>
                </div>
            </div>
        </div >
    );
}

export default SideBar;