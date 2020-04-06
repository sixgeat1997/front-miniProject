import React from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Namelist = () => {

    let history = useHistory()
    const getpost = useSelector(state => state.getPost)


    console.log(getpost);


    return (
        <div>
            <button onClick={()=>history.push('/main')} >ย้อนกลับ</button>
            <h1>รายชื่อนักศึกษา {getpost.activity} </h1>
            <ol>{getpost.std.map(std => {
                return <li>{std.id} {std.name} </li>
            })}</ol>
            {/* <Navbar /> */}
        </div>
    )
}

export default Namelist