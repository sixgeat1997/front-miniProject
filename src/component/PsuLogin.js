import React, { useState, useEffect } from 'react'
import { allAction } from '../redux/store'
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers/History';


const PsuLogin = () => {
 

    const AllAction = bindActionCreators(allAction, useDispatch())
    const psuPass = useSelector(state => state.psuPass)

    const [psu, setPsu] = useState({
        username: "",
        password: ""
    })



    const sentPsu = async () => {

        AllAction.plogin(psu)
        console.log(psuPass.id);

        if (psuPass.id) {
            history.push('/main')
            localStorage.setItem('data', psuPass.id)
        }




    }

    console.log(psu);

    useEffect(() => {
        if (localStorage.getItem('data') != null) {
            history.push('/main')
        }
        else {
            history.push('/')
        }
    }, [])

    return (
        <div  >
            <div  >
                <h1>PSU PASSPORT</h1>
                <input type="text" onChange={(e) => setPsu({ ...psu, username: e.target.value })} /> <br />
                <input type="password" onChange={(e) => setPsu({ ...psu, password: e.target.value })} /><br />
                <button onClick={sentPsu}>Click</button>
            </div>
        </div>
    )


}

export default PsuLogin;