import React, { useEffect } from 'react'
import { Row, Col, Form, Input, Button, Upload } from 'antd'
import { ScheduleOutlined } from '@ant-design/icons'

//COMPONENTS
import Alert from '../../../../helpers/alert/Alert'
import HttpClient from '../../../../helpers/network/HttpClient'

import './scss/tab10.scss'

const DateCanceled = ({ procedurenotarial, category, setProcedurenotarial }) => {
  const [form] = Form.useForm()

  const onFinish = () => {
    procedurenotarial.scheduled = false

    HttpClient.put('/api/procedurenotarial/' + procedurenotarial._id, procedurenotarial)
      .then((res) => {
        Alert.show({
          type: 'success',
          title: 'Exito',
          message: `Información almacenada correctamente`,
          btnOk: 'Aceptar',
          fnOk: () => {
            var aux = { ...procedurenotarial }
            setProcedurenotarial(aux)
          },
          btnCancel: 'Cancelar'
        })
      })
      .catch((err) => {
        Alert.show({
          type: 'error',
          title: '¡Ups!',
          message: err,
          btnOk: 'Aceptar',
          fnOk: () => {},
          btnCancel: 'Cancelar'
        })
      })
  }

  useEffect(() => {
    console.log(procedurenotarial)
    if (procedurenotarial.date_appointment) {
      var data = {
        date: procedurenotarial.date_appointment.split(' ')[0],
        hour: procedurenotarial.date_appointment.split(' ')[1],
        notary: procedurenotarial.notary.name
      }
      form.setFieldsValue(data)
    }
  }, [])

  return (
    <>
      <h3 className="title-indicaciones">{category && category.name} /</h3>
      <div className="line-morado"> </div>
      <h2 className="title-indicaciones">{procedurenotarial.notarialAct.name}</h2>
      <div className="diplayflex">
        <div className="content-circule">
          <div className="circule-notaria">
            <span className="circule-number">0</span>
          </div>
        </div>
        <h2 className="titleIngresarInfo">Cancelar de cita</h2>
      </div>
      <br />
      <p className="display-linebreak">
        Tu cliente ha cancelado su cita. Por favor gestiona inmediatamente la cancelación en
        Notaria.
      </p>
      <br />
      <Form
        name="basic"
        autoComplete="off"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
      >
        <Form.Item className="spaceLabel" label="Fecha de la cita: " name="date">
          <Input className="input-dynamic" type="text" disabled={true} />
        </Form.Item>

        <Form.Item className="spaceLabel" label="Hora de la cita: " name="hour">
          <Input className="input-dynamic" type="text" disabled={true} />
        </Form.Item>

        <Form.Item className="spaceLabel" label="Notaria: " name="notary">
          <Input className="input-dynamic" type="text" disabled={true} />
        </Form.Item>
        <br />
        <br />
        <p className="display-linebreak">
          Una vez cancelada la cita en Notaria por favor presiona el botón Cita cancelada
        </p>
        <br />
        <Button
          className="btnContinuar"
          type="primary"
          icon={<ScheduleOutlined />}
          htmlType="submit"
        >
          Cita cancelada
        </Button>
      </Form>
    </>
  )
}

export default DateCanceled
