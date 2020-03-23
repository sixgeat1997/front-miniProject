import React, { useEffect } from 'react'
import { allAction } from '../redux/store'
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers/History';

const Navbar = () => {

    const AllAction = bindActionCreators(allAction, useDispatch())
    const psuPass = useSelector(state => state.psuPass)


    const psuLogout = () => {
        AllAction.plogout()

        if (psuPass.id == "") {
            localStorage.removeItem('data')
            history.push('/')
        }
    }

    console.log(history);
    

    useEffect(() => {
        if (localStorage.getItem("data") == null) {
            history.push('/')
        }
        else {
            history.push('/main')
        }
    }, [])

    return (
        <div>
            <button onClick={psuLogout} >logout</button>

        </div>
    )

}

export default Navbar