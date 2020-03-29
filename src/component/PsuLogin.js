import React, { useState, useEffect } from 'react'
import { allAction } from '../redux/store'
import { bindActionCreators } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers/History';
import { Form, Input, Button, Checkbox, Alert, Modal, Card, message } from 'antd'
import "./Card.css"

const PsuLogin = (props) => {


    const dispatch = useDispatch()

    const AllAction = bindActionCreators(allAction, dispatch)
    const psuPass = useSelector(state => state.psuPass)

    const [psu, setPsu] = useState({
        username: "",
        password: ""
    })

    const layout = {
        // labelCol: { span: 19 },
        // wrapperCol: { span: 3 },
        // label : {span : 2}
    };

    const tailLayout = {
        // wrapperCol: { offset: 20, span: 4 },
    };

    const alerts = () => {
        if (psuPass.id) {
        }
        else {

        }
    }

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    const sentPsu = () => {
        AllAction.plogin(psu)

    }


    useEffect(() => {
        if (psuPass.id) {
            history.push('/main')
            let cookie = psuPass.id + "-" + psuPass.name + "-" + psuPass.surname
            localStorage.setItem('data', cookie)
            message.success('This is a success message');

        }
        if (localStorage.getItem('data') != null) {
            history.push('/main')
        }
        else {
            history.push('/')
            message.error('This is an error message');
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
        <div >
            <div className="">

            </div>
            <div className="login ">
                <div className="login2" >
                    <div style={{ marginBottom: 50 }}>
                        <h2>LOGIN</h2>
                        <h3> PSU PASSPORT</h3>
                    </div>

                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}

                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input onChange={(e) => setPsu({ ...psu, username: e.target.value })} />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password onChange={(e) => setPsu({ ...psu, password: e.target.value })} />
                        </Form.Item>


                        <Form.Item {...tailLayout}>
                            <Button shape="round" style={{ width: "100%", marginTop: "50px" }} onClick={() => {
                                sentPsu()
                                // alerts()
                            }} >
                                LOGIN
                            </Button>
                        </Form.Item>

                    </Form>
                </div>

            </div>
        </div>
    )


}

const mapStateToProps = state => ({ psuPass: state.psuPass })

export default connect(mapStateToProps)(PsuLogin);