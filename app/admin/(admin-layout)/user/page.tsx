"use client";

import PageContainer from '@/app/_components/PageContainer'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Table } from 'antd'
import React from 'react'

function UserPage() {
    return (
        <Card title="user page" extra={<Button icon={<PlusOutlined/>}/>}>
            <Form layout='inline'>
                <Form.Item label="name">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button />
                </Form.Item>
            </Form>
            <Table></Table>
        </Card>
    )
}

export default UserPage