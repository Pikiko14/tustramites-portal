import React, { useState, useEffect } from 'react'
import { InputNumber, Modal, Form, Input, Button, Select } from 'antd'

// RESOURCE
import json_location from '../../../json/states-cities.json'
import './scss/NotaryDialog.scss'


const NotaryDialog = ({ notary, data, setData, callback }) => {
  const [form] = Form.useForm()
  const [cities, setCities] = useState([])
  const { TextArea } = Input

  const handleOk = () => {
    setData(null)
    callback()
  }

  const handleChangeProvince = (value) => {
    const state = json_location.find((x) => x.state == value)
    setCities(state.cities)
  }

  const setDays = (item) => {
    let days = ''
    if (item.days == 'lunes-martes-miercoles-jueves-viernes-sabado') {
      days = 'Lun - Sab'
    } else if (item.days == 'lunes-martes-miercoles-jueves-viernes-') {
      days = 'Lun - Vie'
    } else if (item.days == 'lunes-martes-miercoles-jueves-') {
      days = 'Lun - Jue'
    } else if (item.days == 'lunes-martes-miercoles-') {
      days = 'Lun - Mie'
    } else if (item.days == 'lunes-martes-') {
      days = 'Lun - Mar'
    } else if (item.days == 'lunes') {
      days = 'Lun'
    } else if (item.days == 'lunes-miercoles-viernes-') {
      days = 'Lun - Mie- Vie'
    } else if (item.days == 'martes-jueves-sabado-') {
      days = 'Mar - Jue- Sab'
    } else if (item.days == 'martes-jueves-') {
      days = 'Mar - Jue'
    }
    return days
  }

  useEffect(() => {
    form.resetFields()
    if (notary) {
      let schedule = ''
      notary.schedule.schedules.forEach((item) => {
        schedule += setDays(item) + ' ' + item.startHour + ' - ' + item.endHour + '\n'
      })

      let data = {
        name: notary.name,
        contact: notary.contact,
        address: notary.address,
        email: notary.email,
        phone: notary.phone,
        province: notary.province,
        city: notary.city,
        sector: notary.sector,
        schedule: schedule
      }
      form.setFieldsValue(data)
    }
  }, [notary, data])

  return (
    <Modal
      open={data}
      onOk={handleOk}
      onCancel={handleOk}
      forceRender
      maskClosable={false}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          Aceptar
        </Button>
      ]}
    >
      <h3>Información de la Notaría</h3>
      <Form layout="vertical" form={form}>
        <div className="form-control">
          <Form.Item
            label="Nombre"
            name="name"
            id="name"
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            label="Contacto"
            name="contact"
            id="contact"
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            label="Dirección"
            name="address"
            id="address"
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            label="Correo"
            name="email"
            id="email"
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            label="Teléfono"
            name="phone"
            id="phone"
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            name="province"
            id="province"
            label="Provincia"
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            name="city"
            id="city"
            label="Ciudad"
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            name="sector"
            id="sector"
            label="Sector"
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            label="Horario"
            name="schedule"
            id="schedule"
          >
            <Input disabled={true} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default NotaryDialog
