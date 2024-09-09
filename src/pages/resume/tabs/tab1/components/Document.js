import React, { useEffect, useState, useContext } from 'react'
import { Row, Col, Form, Input, Button } from 'antd'
import { CloudDownloadOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const Document = ({ procedurenotarial }) => {
  const [form] = Form.useForm()
  const { TextArea } = Input

  useEffect(() => {
    if (procedurenotarial.observation_document) {
      var data = { observation: procedurenotarial.observation_document }
      form.setFieldsValue(data)
    }
  }, [])

  return (
    <>
      <div className="diplayflex">
        <div className="content-circule">
          <div className="circule-notaria">
            <span className="circule-number">
              {procedurenotarial.notarialAct.actors.length > 0 ? '2' : '1'}
            </span>
          </div>
        </div>
        <h2 className="titleIngresarInfo">Documentos</h2>
      </div>
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
        <div className="containerDownload">
          <p className="colorGray">Descargar documentos</p>
          <a
            href={
              process.env.REACT_APP_URL_API + '/api/storage/download?id=' + procedurenotarial._id
            }
            target="_blank"
            rel="noreferrer"
          >
            <Button className="buttonDownload">
              <CloudDownloadOutlined className='cloud' />
              Descargar
            </Button>
          </a>
        </div>
        <Form.Item className="spaceLabel" label="Observación" name="observation" id="observation">
          <TextArea
            className="textArea"
            rows={4}
            disabled={true}
            autoSize={{ maxRows: 4, minRows: 4 }}
          />
        </Form.Item>
      </Form>
    </>
  )
}

export default Document
