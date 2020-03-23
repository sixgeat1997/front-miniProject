import React, { useState, useEffect } from 'react'
import { allAction } from '../redux/store'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'


const PostFrom = () => {

    const postreduc = useSelector(state => state.postreduc);
    const form = useSelector(state => state.form);
    const Allaction = bindActionCreators(allAction, useDispatch())

    const [post, setPost] = useState({
        activity: '',
        address: '',
        date: '',
        name: '',
        hours: 0,
        people: 0
    })

    const addPost = () => {
        Allaction.addPost({ ...form, id: postreduc.lenght > 0 ? postreduc[postreduc.lenght - 1].id + 1 : 0 })
    }



    return (
        <div>
            <span>กิจกรรม : </span><input type="text" onChange={(e) => Allaction.change_activity(e.target.value)} /> <br />
            <span>สถานที่ : </span><input type="text" onChange={(e) => Allaction.change_address(e.target.value)} /> <br />
            <span>วันที่ : </span><input type="text" onChange={(e) => Allaction.change_date(e.target.value)} /> <br />
            <span>ผู้โพส : </span><input type="text" onChange={(e) => Allaction.change_name(e.target.value)} /> <br />
            <span>ชั่วโมง : </span><input type="number" onChange={(e) => Allaction.change_hours(e.target.value)} /> <br />
            <span>จำนวน : </span><input type="number" onChange={(e) => Allaction.change_people(e.target.value)} /> <br />
            <button onClick={addPost} >add</button>
        </div>
    )
}

export default PostFrom