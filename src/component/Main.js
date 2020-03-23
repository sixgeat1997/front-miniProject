import React,{useEffect} from 'react'

const Main = (props) => {

    useEffect(()=>{
        if(localStorage.getItem("data") == null){
            props.history.push('/')
        }
    },[])

    const psuLogout = () => {
        localStorage.clear()
    }


    return (
        <div>
            <button onClick={psuLogout} >logout</button>
        </div>
    )
}

export default Main