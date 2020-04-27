import React, { useState, useEffect } from 'react'
import './Card.css';
import { Modal, Button, DatePicker, Drawer, Row, Col, Card, Input, Layout, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { allAction } from '../redux/store'
import { bindActionCreators } from 'redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Form from 'antd/lib/form/Form';
import Namelist from './Namelist';
import { useHistory } from 'react-router-dom';



const Cards = (props) => {

    const Allaction = bindActionCreators(allAction, useDispatch())
    const postre = useSelector(state => state.postreduc)
    const getPost = useSelector(state => state.getPost)

    let history = useHistory()

    const { confirm } = Modal;
    const [listStd, setListstd] = useState([])
    const [drawer, setDrawer] = useState(false)
    const [detail, setDetail] = useState({
        address: "",
        date: "",
        name: "",
        hours: 0,
        activity: "",
        people: 0,
        id: 0,
        des: '',
        std: []
    })



    const [state, setState] = useState(false)

    useEffect(() => { }, [getPost])

    const showDeleteConfirm = () => {
        confirm({
            title: 'คุณต้องการที่จะลบกิจกรรมนี้',
            icon: <ExclamationCircleOutlined />,
            // content: 'คุณต้องการที่จะลบโพส',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                deletePost()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const showConfirm = (cookie, tmp) => {
        confirm({
            title: 'คุณต้องการที่จะลงชื่อในกิจกรรมนี้',
            icon: <ExclamationCircleOutlined />,
            content: 'หมายเหตุ ไม่สามารถแก้ไขได้',
            onOk() {
                console.log('OK');
                regisAtt(cookie, tmp)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


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
            message.info('ลงแล้ว')
            // alert("ลงแล้ว")

        }
        if (tmp.people <= tmp.std.length) {
            console.log("เต็ม");
            message.info('เต็ม')
            // alert("เต็ม")
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



        if ((+cookie[0] == 5935512038)) {
            return (
                <>
                    {/* update */}
                    <div>
                        <Row>
                            <Col>
                            </Col>
                            <Col  >
                                <div >
                                    <Button onClick={async () => {
                                        setState(true)
                                        setDetail(tmp)

                                    }}>แก้ไขข้อมูล</Button>
                                    {/* show */}
                                    {/* <a href={() => history.push('/namelist')} target="_blank">Visit W3Schools.com!</a> */}
                                    <Button onClick={async () => {
                                        history.push('/namelist')
                                        Allaction.showstd(tmp)
                                        // setDrawer(true)
                                        // console.log(getPost);
                                        // info(getPost)
                                    }}> แสดงรายชื่อ</Button>
                                    {/* Delete */}
                                    <Button onClick={showDeleteConfirm} danger>ลบกิจกรรม</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </>
            )
        }
        else {
            return (
                // <div></div>
                <Button onClick={() => showConfirm(cookie, tmp)} >ลงชื่อ</Button>
            )
        }
    }


    console.log(drawer);


    return (
        <>
            <div  >
                <div className=' card' >
                    <Card title={props.activity} bordered={true} >

                        <Col >
                            <Row>
                                <p >กิจกรรม : {props.activity}</p>
                            </Row>
                            <Row>
                                <Col md={10}>
                                    <p >วันที่ : {props.date}</p>
                                    <p >สถานที่ : {props.address}</p>
                                </Col>
                                <Col md={10}>

                                    <p >จำนวน : {props.people} คน</p>
                                    <p >ชั่วโมง : {props.hours} ชม.</p>
                                </Col>
                                <Col md={4}>
                                    <p ><h2 style={{ color: "red" }}>เหลือ : {props.people - props.std.length}</h2></p>
                                </Col>
                            </Row>
                            <Row>
                                <p>คำอธิบาย : {props.des}</p>

                            </Row>
                            <Row>
                                <p >ผู้โพส : {props.name}</p>
                            </Row>
                        </Col>
                        <Col>
                            {btn(props.id)}
                        </Col>





                    </Card>

                    {/* 
                    <ol>{props.std.map(std => {
                        return <li>{std.id} {std.name} </li>
                    })}</ol> */}
                </div>
                {/* <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={() => { setDrawer(false) }}
                    visible={drawer}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer> */}
                <Modal
                    title="update"
                    visible={state}
                    onOk={update}
                    onCancel={() => {
                        setState(false)
                    }}
                >

                    <Form>

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
                        }} /><br />
                        <span>คำอธิบาย : </span><input value={detail.des} onChange={(e) => {
                            setDetail({ ...detail, des: e.target.value })
                        }} />
                    </Form>
                </Modal>
                <div className=''>




                </div>
            </div>
        </>
    )

}

export default Cards