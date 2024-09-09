import React from 'react'

import { Modal, Button, Form, Input } from 'antd'

const RememberDialog = ({ setData, data }) => {
  const [form] = Form.useForm()

  const handleOk = () => {
    setData(null)
  }

  const handleCancel = () => {
    setData(null)
  }

  return (
    <Modal
      open={data}
      onOk={handleOk}
      onCancel={handleCancel}
      forceRender
      maskClosable={false}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Aceptar
        </Button>
      ]}
    >
      <Form name="basic" autoComplete="off" form={form} layout="vertical">
        <Form.Item
          label={'Correo electrónico'}
          name="email"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Ingresa el correo electrónico!'
            },
            {
              type: 'email',
              message: 'El valor ingresado no es un email valido!'
            }
          ]}
        >
          <Input className="input-dynamic" type="email" placeholder="Correo electrónico" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default RememberDialog
