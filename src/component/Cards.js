import React, { useState, useEffect } from 'react'
import './Card.css';
import { Modal, Button, DatePicker, Row, Col, Card, Input, Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { allAction } from '../redux/store'
import { bindActionCreators } from 'redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Form from 'antd/lib/form/Form';



const Cards = (props) => {
    const form = useSelector(state => state.form)
    const Allaction = bindActionCreators(allAction, useDispatch())
    const psuPass = useSelector(state => state.psuPass)
    const postre = useSelector(state => state.postreduc)
    const getPost = useSelector(state => state.getPost)

    const { confirm } = Modal;
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

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleOutlined />,
            content: 'คุณต้องการที่จะลบโพส',
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
            title: '',
            icon: <ExclamationCircleOutlined />,
            content: 'คุณต้องการที่จะลงชื่อในกิจกรรมนี้',
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
            alert("ลงแล้ว")

        }
        if (tmp.people <= tmp.std.length) {
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
                        <Row>
                            <Col md={8}>
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
                                        }} />
                                    </Form>
                                </Modal>
                            </Col>
                            <Col>
                                <div >

                                    <Button onClick={async () => {
                                        setState(true)
                                        setDetail(tmp)

                                    }}>update</Button>

                                    {/* show */}
                                    <Button onClick={async () => {
                                        Allaction.showstd(id)
                                        info(getPost)
                                    }}> Show</Button>

                                    {/* Delete */}
                                    <Button onClick={showDeleteConfirm} danger>Delete</Button>




                                    
                                    {/* <Button onClick={() => {
                                        regisAtt(cookie, tmp)
                                        // console.log(detail);
                                    }} >Regis</Button> */}
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
                <Button onClick={() => showConfirm(cookie, tmp)} >Regis</Button>
            )
        }
    }




    return (
        <>
            <div  >
                <div className='bearcard card' >
                    <Card title={props.activity} bordered={true} >

                        <Col >
                            <Row>
                                <p >กิจกรรม : {props.activity}</p>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <p >วันที่ : {props.date}</p>
                                    <p >สถานที่ : {props.address}</p>
                                </Col>
                                <Col md={12}>

                                    <p >จำนวน : {props.people} คน</p>
                                    <p >ชั่วโมง : {props.hours} ชม.</p>
                                </Col>
                                {/* <Col md={4}>

                                </Col> */}
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


                <div className=''>




                </div>
            </div>
        </>
    )

}

export default Cards