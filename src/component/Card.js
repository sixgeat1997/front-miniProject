import React, { useState } from 'react'
import './Card.css';
import { Modal, Button, DatePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { allAction } from '../redux/store'
import { bindActionCreators } from 'redux';



const Card = (props) => {

    const form = useSelector(state => state.form)
    const Allaction = bindActionCreators(allAction, useDispatch())
    const psuPass = useSelector(state => state.psuPass)
    const postre = useSelector(state => state.postreduc)

    const [detail, setDetail] = useState({
        address: "",
        date: "",
        name: "",
        hours: 0,
        activity: "",
        people: 0,
        id: 0,
        std: []
    })
    
    const [state, setState] = useState(false)

    const update = () => {
        Allaction.getPost()
        let cookie = localStorage.getItem('data')
        cookie = cookie.split('-')
        setState(false)
        Allaction.updatePost({ ...detail, name: cookie[1] + " " + cookie[2] })
    }

    const deletePost = () => {
        Allaction.deletePost({ id: props.id })
    }

    const regisAtt = (id) => {
        Allaction.regisAtt({ ...psuPass, id: id }, form)
    }



    const btn = (id) => {
        console.log("=>>>>>>>>>>>>>>>>>>>>>>>>>>>>", id);
        let tmp = postre.find(item => item.id === id)

        let cookie = localStorage.getItem('data')
        cookie = cookie.split('-')

        if ((+cookie[0] == 5935512038) || (+cookie[0] == 5935512030)) {
            return (
                <>
                    {/* update */}
                    <div>
                        <div onClick={async () => {
                            setState(true)
                            setDetail(tmp)
                         
                        }}>update</div>

                        <Modal
                            title="update"
                            visible={state}
                            onOk={update}
                            onCancel={() => {
                                setState(false)
                            }}
                        >

                            <span>กิจกรรม : </span><input type="text" value={detail.activity} onChange={(e) => {
                                setDetail({ ...detail, activity: e.target.value })
                            }} /> <br />
                            <span>สถานที่ : </span><input type="text" value={detail.address} onChange={(e) => {
                                setDetail({ ...detail, address: e.target.value })
                            }} /> <br />
                            <span>วันที่ : </span><input type="text" value={detail.date} onChange={(e) => {
                                setDetail({ ...detail, date: e.target.value })
                            }} /> <br />
                            <span>ผู้โพส : </span><input type="text" value={detail.name} onChange={(e) => {
                                setDetail({ ...detail, name: e.target.value })
                            }} /> <br />
                            <span>ชั่วโมง : </span><input type="number" value={detail.hours} onChange={(e) => {
                                setDetail({ ...detail, hours: e.target.value })
                            }} /> <br />
                            <span>จำนวน : </span><input type="number" value={detail.people} onChange={(e) => {
                                setDetail({ ...detail, people: e.target.value })
                            }} /> <br />
                        </Modal>
                    </div>

                    {/* Delete */}
                    <div onClick={deletePost}>Delete</div>

                    {/* show */}
                    <div>Show</div>
                </>
            )
        }
        else {
            return (
                <div onClick={() => regisAtt(props.id)} >Regis</div>
            )
        }
    }


    return (
        <div className='' >
            <div className='' style={{ backgroundColor: "#add8e6", width: "100vh" }}>
                <p >กิจกรรม : {props.activity}</p>
                <p >วันที่ : {props.date}</p>
                <p >สถานที่ : {props.address}</p>
                <p >จำนวน : {props.people} คน</p>
                <p >ชั่วโมง : {props.hours} ชม.</p>
                <p >ผู้โพส : {props.name}</p>
                <p>id : {props.id}</p>


            </div>
            <div className='bearcard-actions'>

                {btn(props.id)}

            </div>
        </div>

    )
}

export default Card