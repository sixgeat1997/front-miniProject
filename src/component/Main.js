import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Postcard from './PostCard'

const Main = (props) => {

    return (
        <div >
            <Navbar />
      
            <div style={{ display: "flex", justifyContent: "center" }}>

                <Postcard />
            </div>
        </div>
    )
}

export default Main