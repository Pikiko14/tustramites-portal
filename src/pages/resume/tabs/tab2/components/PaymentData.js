import React, { useEffect } from 'react'
import { Row, Col, Form, Input, Select } from 'antd'

const PaymentData = ({ paymentData }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (paymentData) {
      var data = {
        typeUser: paymentData.typeUser,
        name: paymentData.name,
        typeDocument: paymentData.typeDocument,
        document: paymentData.document,
        email: paymentData.email,
        province: paymentData.province,
        city: paymentData.city,
        address: paymentData.address,
        phone: paymentData.phone
      }
      form.setFieldsValue(data)
    }
  }, [])
  return (
    <Form name="basic" layout="vertical" autoComplete="off" form={form} className="formThree">
      <Row className="gapRow">
        <Form.Item className="mini" name="typeUser" id="typeUser" label="Tipo Persona">
          <Input className="input-dynamic width95" type="text" disabled={true} />
        </Form.Item>
        <Form.Item name="name" id="name" label=" " key={2} className="large">
          <Input className="input-dynamic width95" type="text" disabled={true} />
        </Form.Item>
      </Row>

      <Row className="gapRow">
        <Form.Item name="typeDocument" id="typeDocument" className="mini" label="Tipo Documento">
          <Input className="input-dynamic width95" type="text" disabled={true} />
        </Form.Item>
        <Form.Item name="document" id="document" label=" " key={2} className="large">
          <Input className="input-dynamic width95" type="text" disabled={true} />
        </Form.Item>
      </Row>

      <Row className="gapRow">
        <Form.Item name="email" id="email" label="Email" className="medium">
          <Input className="input-dynamic width95" type="text" disabled={true} />
        </Form.Item>
        <Form.Item name="province" id="province" label="Provincia" className="medium">
          <Input className="input-dynamic width95" type="text" disabled={true} />
        </Form.Item>

        <Form.Item name="city" id="city" label="Ciudad" className="medium">
          <Input className="input-dynamic width95" type="text" disabled={true} />
        </Form.Item>
      </Row>

      <Row className="gapRow">
        <Form.Item
          name="address"
          id="address"
          label="Direccion"
          placeholder="Ingresa la dirección completa"
          className="mini"
        >
          <Input className="input-dynamic width95" type="text" disabled={true} />
        </Form.Item>
        <Form.Item
          className="large"
          name="phone"
          id="phone"
          label="Celular"
          placeholder="Ingresa tu número celular"
        >
          <Input className="input-dynamic width95" type="text" disabled={true} />
        </Form.Item>
      </Row>
    </Form>
  )
}

export default PaymentData
