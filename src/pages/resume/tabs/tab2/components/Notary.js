import React, { useEffect } from 'react'
import { Row, Col, Form, Input } from 'antd'

const Notary = ({ notary }) => {

    const [form] = Form.useForm()

    useEffect(() => {
        if (notary) {
            var data = {
                province: notary.province,
                city: notary.city,
                sector: notary.sector,
                notary: notary.name
            }

            form.setFieldsValue(data)
        }
    }, [])

    return (
        <>
            <br />
            <Form
                name="basic"
                autoComplete="off"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
            >
                <Row>
                    <Col span={24}>
                        <Form.Item
                            className="spaceLabel"
                            label="Provincia"
                            name="province"
                        >
                            <Input className="input-dynamic"
                                type="text"
                                disabled={true} />
                        </Form.Item>

                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Form.Item
                            className="spaceLabel"
                            label="Ciudad: "
                            name="city"
                        >
                            <Input className="input-dynamic"
                                type="text"
                                disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Form.Item
                            className="spaceLabel"
                            label="Sector: "
                            name="sector"
                        >
                            <Input className="input-dynamic"
                                type="text"
                                disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Form.Item
                            className="spaceLabel"
                            label="Notaria: "
                            name="notary"
                        >
                            <Input className="input-dynamic"
                                type="text"
                                disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default Notary
