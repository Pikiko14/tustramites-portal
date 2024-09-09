import React, { useEffect } from 'react'
import { Row, Col, Form, Input } from 'antd'
import './scss/tab6.scss'

const ApprovedDocument = ({ procedurenotarial, category }) => {

    const [form] = Form.useForm()
    const { TextArea } = Input

    useEffect(() => {
        if (procedurenotarial.observation_document_result) {
            var data = { observation_document_result: procedurenotarial.observation_document_result }
            form.setFieldsValue(data)
        }

    }, [])

    return (
        <>

            <h3 className="title-indicaciones">{category && category.name} /</h3>
            <div className="line-morado" > </div>
            <h2 className="title-indicaciones">{procedurenotarial.notarialAct.name}</h2>
            <div className="diplayflex">
                <div className="content-circule" >
                    <div className="circule-notaria" >
                        <span className="circule-number"></span>
                    </div>
                </div>
                <h2 className="titleIngresarInfo">Borrador Aprobado</h2>
            </div>
            <br />
            <p className="display-linebreak">{'¡Felicitaciones! Tu cliente ha aprobado el borrador. Revisa a continuación si te ha dejado algún comentario y continua con el proceso.'}</p>
            <br />
            <Form
                name="basic"
                layout="vertical"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    className="spaceLabel"
                    label="Observación"
                    name="observation_document_result"
                    id="observation_document_result"
                >
                    <TextArea
                        className="textArea"
                        rows={4}
                        disabled={true}
                    />
                </Form.Item>
            </Form>
        </>
    )
}

export default ApprovedDocument
