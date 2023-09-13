"use client";

import dynamic from 'next/dynamic';
import MyUpload from '@/app/_components/MyUpload';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, Form, Image, Input, Modal, Popconfirm, Space, Table } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react'

const MyEditor = dynamic(()=>{return import("@/app/_components/Editor")}, {ssr: false})

function ArticalPage() {
    const [open, setOpen] = useState(false);
    const [list, setList] = useState<any[]>([]);
    const [currentId, setCurrentId] = useState("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [html, setHtml] = useState<string>("<p>hello</p>");
    const [myForm] = useForm();
    const [query, setQuery] = useState({
        start: 0,
        size: 5,
        title: "",
    });
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const fetchData = async (): Promise<any[]> => {
            let resp = await fetch(`/api/admin/articles?start=${query.start}&size=${query.size}&title=${query.title}`);
            let datas = await resp.json()
            return datas;
        };
        fetchData().then((res: any) => {
            setList(res.data);
            setTotal(res.total);
            setHtml(res.data.content);
        });
    }, [query])
    useEffect(() => {
        if (!open) {
            setCurrentId("");
            setImageUrl("");
            setHtml("")
        }
    }, [open])
    return (
        <Card title="Articles" extra={<Button type='primary' icon={<PlusOutlined />} onClick={() => setOpen(!open)} />}>
            <Form layout='inline' onFinish={(v) => {
                setQuery({
                    ...query,
                    title: v.title,
                })
            }}>
                <Form.Item label="title" name="title">
                    <Input placeholder='input title' />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' icon={<SearchOutlined />} />
                </Form.Item>
                <Form.Item></Form.Item>
            </Form>
            <Table
                dataSource={list}
                rowKey="id"
                pagination={{
                    total,
                    onChange(page, pageSize) {
                        setQuery({
                            start: page - 1,
                            size: pageSize,
                            title: query.title
                        })
                    },
                    onShowSizeChange(current, size) {
                        setQuery({
                            ...query,
                            start: query.start,
                            size: current,
                        })
                    },
                    pageSize: 5,
                    pageSizeOptions: [5, 10, 20, 50],
                    showSizeChanger: true,
                }}
                columns={[
                    {
                        title: "idx",
                        width: 80,
                        render: (v, r, i) => i + 1,
                    },
                    {
                        title: "title",
                        dataIndex: "title",
                    },
                    {
                        title: "avatar",
                        render: (v, r) => {
                            return <Image src={r.image} style={{ height: 64, width: 64 }} alt={r.title}></Image>
                        },
                    },
                    {
                        title: "desc",
                        dataIndex: "desc",
                    },
                    {
                        title: "ops",
                        render(v, r) {
                            return <Space>
                                <Button icon={<EditOutlined />} size='small' type='primary' onClick={() => {
                                    setOpen(true);
                                    setImageUrl(r.image),
                                    setHtml(r.content);
                                    setCurrentId(r.id);
                                    myForm.setFieldsValue(r);
                                }}></Button>
                                <Popconfirm
                                    title="Delete It?"
                                    onConfirm={async () => {
                                        let resp = await fetch("/api/admin/articles/" + r.id, { method: "DELETE" });
                                        setQuery({
                                            ...query,
                                            start: 0,
                                            size: 5,
                                        });
                                    }}>
                                    <Button icon={<DeleteOutlined />} size='small' type='primary' danger></Button>
                                </Popconfirm>
                            </Space>
                        }
                    },
                ]}></Table>
            <Modal title="edit" destroyOnClose={true} maskClosable={false} open={open} onOk={() => {
                myForm.submit();
            }} onCancel={() => setOpen(false)} width={"75vw"}>
                <Form
                    preserve={false}
                    layout='vertical'
                    form={myForm}
                    onFinish={async (v) => {
                        console.log(v);
                        let resp;
                        if (currentId) {
                            resp = await fetch("/api/admin/articles/" + currentId, {
                                method: "PUT",
                                body: JSON.stringify({ ...v, image: imageUrl, content: html }),
                            });
                        } else {
                            resp = await fetch("/api/admin/articles", {
                                method: "POST",
                                body: JSON.stringify({ ...v, image: imageUrl, content: html }),
                            });
                        }
                        console.log(`${JSON.stringify(resp)}`);
                        setQuery({
                            ...query,
                            start: 0,
                            size: 5,
                        });
                        setOpen(false);
                    }}>
                    <Form.Item label="title" name="title" rules={[
                        {
                            required: true,
                            message: "empty not allowed."
                        },
                    ]}>
                        <Input placeholder='input' />
                    </Form.Item>
                    <Form.Item label="desc" name="desc">
                        <Input.TextArea placeholder='input desc' />
                    </Form.Item>
                    <Form.Item label="avatar">
                        <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
                    </Form.Item>
                    <Form.Item label="content">
                        <MyEditor html={html} setHtml={setHtml}></MyEditor>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    )
}

export default ArticalPage