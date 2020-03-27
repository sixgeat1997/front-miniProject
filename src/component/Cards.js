import React, { useState, useEffect } from 'react'
import './Card.css';
import { Modal, Button, DatePicker, Row, Col, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { allAction } from '../redux/store'
import { bindActionCreators } from 'redux';




const Cards = (props) => {
    const form = useSelector(state => state.form)
    const Allaction = bindActionCreators(allAction, useDispatch())
    const psuPass = useSelector(state => state.psuPass)
    const postre = useSelector(state => state.postreduc)
    const getPost = useSelector(state => state.getPost)

    const [modal, contextHolder] = Modal.useModal();

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

    useEffect(() => { }, [getPost])



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

    const regisAtt = async (cookie, tmp) => {
        // Allaction.regisAtt({ ...psuPass, id: id }, form)
        // if (tmp.std == undefined) {
        //     tmp.std = []
        // }
        let tmpstd = tmp.std.find(std => {
            return std.id === +cookie[0]
        })
        if (tmpstd) {
            console.log("ลงแล้ว");
            alert("ลงแล้ว")

        }
        else if (tmp.people <= tmp.std.length) {
            console.log("เต็ม");
            alert("เต็ม")
        }
        else if (!tmpstd && tmp.people > tmp.std.length) {
            tmp.std.push({ id: +cookie[0], name: cookie[1] + " " + cookie[2] })
            console.log(tmp);
            await setDetail({ ...tmp })
            Allaction.updatePost(tmp)

        }

        console.log("detail", detail);
    }

    const info = (details) => {
        return Modal.info({
            title: 'This is a notification message',
            content: (
                <div>
                    {JSON.stringify(details)}
                </div>
            ),
            onOk() { },
        });
    }



    const btn = (id) => {

        let tmp = postre.find(item => item.id === id)

        let cookie = localStorage.getItem('data')
        cookie = cookie.split('-')



        if ((+cookie[0] == 5935512038) || (+cookie[0] == 5935512030)) {
            return (
                <>
                    {/* update */}
                    <div>

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
                            {/* <span>ผู้โพส : </span><input type="text" value={detail.name} onChange={(e) => {
                                setDetail({ ...detail, name: e.target.value })
                            }} /> <br /> */}
                            <span>ชั่วโมง : </span><input type="number" value={detail.hours} onChange={(e) => {
                                setDetail({ ...detail, hours: e.target.value })
                            }} /> <br />
                            <span>จำนวน : </span><input type="number" value={detail.people} onChange={(e) => {
                                setDetail({ ...detail, people: e.target.value })
                            }} /> <br />
                        </Modal>
                       

                    </div>
                    <Button onClick={async () => {
                            setState(true)
                            setDetail(tmp)

                        }}>update</Button>


                    {/* Delete */}
                    <Button onClick={deletePost}>Delete</Button>

                    {/* show */}
                    <Button onClick={async () => {
                        Allaction.showstd(id)
                        info(getPost)
                    }}> Show</Button>


                    <Button onClick={() => {
                        regisAtt(cookie, tmp)
                        // console.log(detail);
                    }} >Regis</Button>
                </>
            )
        }
        else {
            return (
                // <div></div>
                <div onClick={() => {

                    regisAtt(cookie, tmp)
                    // console.log(detail);


                }} >Regis</div>
            )
        }
    }




    return (
        <>
            <div  >
                <div className='' >
                    <Card title={props.activity} bordered={false} style={{ width: "70vh" }}>
                        {/* 

                        <Row>
                            <p >กิจกรรม : {props.activity}</p>
                        </Row> */}
                        <Row>
                            <Col md={12}>
                                <p >วันที่ : {props.date}</p>
                                <p >สถานที่ : {props.address}</p>
                            </Col>
                            <Col md={12}>

                                <p >จำนวน : {props.people} คน</p>
                                <p >ชั่วโมง : {props.hours} ชม.</p>
                            </Col>
                        </Row>


                        <Row>
                            <p >ผู้โพส : {props.name}</p>
                        </Row>
                    </Card>
                </div>
                <ol>{props.std.map(std => {
                    return <li>{std.id} {std.name} </li>
                })}</ol>


                <div className=''>

                    {btn(props.id)}

                </div>
            </div>
        </>
    )

}

export default Cards