import React, { useState, useEffect } from 'react'
import { allAction } from '../redux/store'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button,Input, DatePicker } from 'antd';

import './Card.css';


const PostFrom = () => {

    const postr = useSelector(state => state.postreduc);
    const form = useSelector(state => state.form);
    const Allaction = bindActionCreators(allAction, useDispatch())

    const addPost = () => {
        console.log(postr.length);

        Allaction.addPost({ ...form, id: postr.length > 0 ? postr[postr.length - 1].id + 1 : 0 })

    }

    const onChange = (date, dateString) =>{
        console.log(date, dateString);
    }

    return (
        <div className='bearcard-container'>
            <div style={{ margin: 10 }}></div>
            <div>
                <span>กิจกรรม : <Input type="text" onChange={(e) => Allaction.change_activity(e.target.value)} placeholder="กิจกรรม" /></span> <br />
                <span>สถานที่ : </span><input type="text" onChange={(e) => Allaction.change_address(e.target.value)} /> <br />
                {/* <span>วันที่ : </span><input type="text" onChange={(e) => Allaction.change_date(e.target.value)} /> <br /> */}
                <span>วันที่ : </span>   <DatePicker onChange={onChange} /> <br />
                <span>ผู้โพส : </span><input type="text" onChange={(e) => Allaction.change_name(e.target.value)} /> <br />
             

                <span>ชั่วโมง : </span><input type="number" onChange={(e) => Allaction.change_hours(e.target.value)} /> <br />
                <span>จำนวน : </span><input type="number" onChange={(e) => Allaction.change_people(e.target.value)} /> <br />
                <button onClick={addPost} >add</button>
            </div>
        </div>
    )
}

export default PostFrom