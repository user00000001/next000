'use client';

import React from 'react'
import {
    Card,
    Form,
    Input,
    Button,
} from "antd";
import { useRouter } from "next/navigation"

function Login() {
    const nav = useRouter();
    return (
        <div className='pt-20'>
            <Card title="log in">
                <Form labelCol={{ span: 3 }} className='w-4/5 mx-auto' onFinish={async (e) =>{ 
                    console.log(e);
                    let res = await fetch("/api/admin/login", {
                        method: "POST",
                        body: JSON.stringify(e),
                    });
                    console.log(res);
                    nav.push("/admin/dashboard");
                    }}>
                    <Form.Item label="username" name="username">
                        <Input placeholder='input your name' />
                    </Form.Item>
                    <Form.Item label="password" name="password">
                        <Input.Password placeholder='input your password' />
                    </Form.Item>
                    <Form.Item>
                        <Button block htmlType='submit' type='primary'>Log In</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login