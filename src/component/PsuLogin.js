import React, { useState, useEffect } from 'react'
import { allAction } from '../redux/store'
import { bindActionCreators } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers/History';


const PsuLogin = (props) => {

    const dispatch = useDispatch()

    const AllAction = bindActionCreators(allAction, dispatch)
    const psuPass = useSelector(state => state.psuPass)

    const [psu, setPsu] = useState({
        username: "",
        password: ""
    })


    const sentPsu = () => {
        AllAction.plogin(psu)
    }


    useEffect(() => {
        if (psuPass.id) {
            history.push('/main')
            let cookie = psuPass.id+"-"+psuPass.name+"-"+psuPass.surname
            localStorage.setItem('data', cookie)
        }
        if (localStorage.getItem('data') != null) {
            history.push('/main')
        }
        else {
            history.push('/')
        }
    }, [psuPass.id])

    // useEffect(() => {
    //     if (localStorage.getItem('data') != null) {
    //         history.push('/main')
    //     }
    //     else {
    //         history.push('/')
    //     }
    // }, [])

    return console.log(psuPass.id) || (
        <div  >
            <div  >
                <h1>PSU PASSPORT</h1>
                <input type="text" onChange={(e) => setPsu({ ...psu, username: e.target.value })} /> <br />
                <input type="password" onChange={(e) => setPsu({ ...psu, password: e.target.value })} /><br />
                <button onClick={() => sentPsu()} >Click</button>
                
            </div>
        </div>
    )


}

const mapStateToProps = state => ({ psuPass: state.psuPass })

export default connect(mapStateToProps)(PsuLogin);