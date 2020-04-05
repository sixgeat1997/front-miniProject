import React, { useEffect, useState } from 'react'
import { allAction } from '../redux/store'
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Button } from 'antd';
import './Card.css';
import { useHistory } from 'react-router-dom';

const Navbar = () => {

    let history = useHistory()

    const AllAction = bindActionCreators(allAction, useDispatch())
    const psuPass = useSelector(state => state.psuPass)

    const [std, setStd] = useState('')



    const psuLogout = () => {
        AllAction.plogout()

        if (psuPass.id == "") {
            localStorage.removeItem('data')
            history.push('/')

        }
    }

    console.log(history);

    useEffect(() => {
        let cookie = localStorage.getItem("data")

        if (cookie == null) {
            history.push('/')
        }
        else {
            cookie = cookie.split("-")
            setStd(cookie[0] + " : " + cookie[1] + " " + cookie[2])
            history.push('/main')
        }
    }, [])

    return (
        // <div>
        //     <p>{std.name} {std.surname}</p>
        //     <button onClick={psuLogout} >logout</button>
        <div className='navbar '>

            <PageHeader
                className="site-page-header"
                title="Student-loan"
                subTitle="กยศ./กรอ./ทุนการศึกษา"
                extra={[
                    <div key="2">{std} <Button key="1" type="primary" onClick={psuLogout}>
                        Logout
                </Button></div>,

                ]}
            />
        </div>
        // </div>
    )

}

export default Navbar