import { Link } from 'react-router-dom';
import ProfileLite from '../profile/ProfileLite';

function SideBar() {
    return (
        <div>
            <div className='mx-5 box' style={{ marginTop: "65px" }}>
                <ProfileLite />
                <Link to={"/dashboard"}>
                    <div className='container align-items-center'>
                        <div className='row m-0 d-flex align-items-center'>
                            <i style={{ fontSize: '25px', color: "#BABABA" }} className="bi bi-clipboard2-data "></i>
                            <p style={{ fontSize: '17px', fontWeight: "500", color: "#BABABA" }} className=' mt-3 ml-2' >Dashboard</p>
                        </div>
                    </div>
                </Link>
                <Link to={"/myarticle"} >
                    <div className='container align-items-center'>
                        <div className='row m-0 d-flex align-items-center'>
                            <i style={{ fontSize: '25px', color: "#BABABA" }} className="bi bi-folder2-open "></i>
                            <p style={{ fontSize: '17px', fontWeight: "500", color: "#BABABA" }} className=' mt-3 ml-2' >My <article></article></p>
                        </div>
                    </div>
                </Link>
            </div>
        </div >
    );
}

export default SideBar;