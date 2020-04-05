import React from 'react'
import { allAction } from '../redux/store'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, DatePicker, Col, Row, Form, Divider } from 'antd';
import './Card.css';



const PostFrom = () => {

    const { TextArea } = Input

    const postr = useSelector(state => state.postreduc);
    const psuPass = useSelector(state => state.psuPass);

    const form = useSelector(state => state.form);
    const Allaction = bindActionCreators(allAction, useDispatch())

    const addPost = async () => {
        console.log(postr.length);
        let cookie = localStorage.getItem('data')
        cookie = cookie.split('-')
        // await Allaction.change_name(psuPass.name + " " + psuPass.surname)
        await Allaction.addPost({ ...form, id: ((postr.length + 1) - 1), name: cookie[1] + " " + cookie[2], std: [] })
        // Allaction.addPost({ ...form, id: postr.length > 0 ? postr[postr.length - 1].id + 1 : 0 , name: cookie[1] + " " + cookie[2], std: [] })
        // console.log(postr.length);
        // console.log(postr.length > -1 ? ((postr.length + 1) - 1) : 0);

        Allaction.getPost()
    }

    return (
        <div className=''>
            <Divider orientation="left">สร้างกิจกรรม</Divider>

            <Row>
                <Col className="postcard" md={12}>

                    {/* <a href="https://www.freepik.com/free-photos-vectors/school">School vector created by rawpixel.com - www.freepik.com</a> */}
                </Col>
                {/* <Col md={16}></Col> */}
                <Col md={9}>

                    <div style={{ margin: 10 }}></div>
                    <div>

                        <Form>


                            <Form.Item
                                label="กิจกรรม"
                            >
                                <Input size="small" type="text" onChange={(e) => Allaction.change_activity(e.target.value)} placeholder="กิจกรรม" />
                            </Form.Item>
                            <Form.Item
                                label="สถานที่"
                            >
                                <Input size="small" type="text" onChange={(e) => Allaction.change_address(e.target.value)} placeholder="สถานที่" />
                            </Form.Item>
                            <Form.Item
                                label="วันที่"
                            >
                                <DatePicker size="small" onChange={(date, dateString) => {
                                    Allaction.change_date(dateString)
                                }}></DatePicker>
                            </Form.Item>
                            <Form.Item
                                label="ชั่วโมง"
                            >
                                <Input size="small" type="number" onChange={(e) => Allaction.change_hours(e.target.value)} placeholder="ชั่วโมง" />
                            </Form.Item>
                            <Form.Item
                                label="จำนวน"
                            >
                                <Input size="small" type="number" onChange={(e) => Allaction.change_people(e.target.value)} placeholder="จำนวน" />
                            </Form.Item>
                            {/* <Form.Item
                                label="คำอธิบาย"
                            >
                                <TextArea rows={4} onChange={(e) => Allaction.change_des(e.target.value)} />

                            </Form.Item> */}

                        </Form>
                        <Button onClick={addPost} >เพิ่มกิจกรรม</Button>

                    </div>
                </Col>
                <Col md={3}></Col>

            </Row>
        </div >
    )
}

export default PostFrom