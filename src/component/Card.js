import React, { useState } from 'react'
import './Card.css';
import { Modal, Button, DatePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { allAction } from '../redux/store'
import { bindActionCreators } from 'redux';

const Card = (props) => {

    const form = useSelector(state => state.form)
    const Allaction = bindActionCreators(allAction, useDispatch())
    const postre = useSelector(state => state.postreduc)



    const [state, setState] = useState(false)

    const update = () => {
        Allaction.updatePost({ ...form, id: props.id })
    }

    const deletePost = () => {
        Allaction.deletePost({ id: props.id })
    }

 
    

    const btn = () => {
        if (localStorage.getItem('data') == 5935512038 + '') {
            return (
                <>
                    <div>
                        <Button onClick={() => { setState(true) }}>update</Button>
                        <Modal
                            title="update"
                            visible={state}
                            onOk={update}
                            onCancel={() => {
                                setState(false)
                            }}
                        >
                            <span>กิจกรรม : </span><input type="text" onChange={(e) => Allaction.change_activity(e.target.value)} /> <br />
                            <span>สถานที่ : </span><input type="text" onChange={(e) => Allaction.change_address(e.target.value)} /> <br />
                            <span>วันที่ : </span><input type="text" onChange={(e) => Allaction.change_date(e.target.value)} /> <br />
                            <span>ผู้โพส : </span><input type="text" onChange={(e) => Allaction.change_name(e.target.value)} /> <br />
                            <span>ชั่วโมง : </span><input type="number" onChange={(e) => Allaction.change_hours(e.target.value)} /> <br />
                            <span>จำนวน : </span><input type="number" onChange={(e) => Allaction.change_people(e.target.value)} /> <br />
                        </Modal>
                    </div>

                    <div onClick={deletePost}>Delete</div>
                    <div>regis</div>
                </>
            )
        }
        else {
            return (
                <div>regis</div>
            )
        }
    }


    return (
        <div className='bearcard-container'>
            <div className='bearcard' style={{ backgroundImage: `url('${props.img}')` }}>
                <p >จำนวน : {props.people} คน</p>
                <p >ผู้โพส : {props.name}</p>
                <p >สถานที่ : {props.address}</p>
                <p >กิจกรรม : {props.activity}</p>
                <p >วันที่ : {props.date}</p>
                <p >ชั่วโมง : {props.hours} ชม.</p>

            </div>
            <div className='bearcard-actions'>

                {btn()}

            </div>
        </div>

    )
}

export default Card