import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Postcard from './PostCard'
import '../App.css'
const Main = (props) => {

    return (
        <div className="">
            <Navbar />
            {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
                <Postcard />
            {/* </div> */}
        </div>
    )
}

export default Main