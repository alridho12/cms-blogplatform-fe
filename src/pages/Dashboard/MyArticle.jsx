import React from 'react'
import '../Dashboard/dashboard.css'
import group from '../../assets/image/Group5.png'
import SideBar from '../../components/sidebar/SideBar'

const MyArticle = () => {
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
                <div className=' col-9'>
                
                </div>
            </div>
        </div>
    )
}

export default MyArticle