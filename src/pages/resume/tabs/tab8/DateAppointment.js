import React, { useEffect } from 'react'
import { Row, Col, Form, Input, Button, Upload } from 'antd'
import { ScheduleOutlined } from '@ant-design/icons'

//COMPONENTS
import Alert from '../../../../helpers/alert/Alert'
import HttpClient from '../../../../helpers/network/HttpClient'

import './scss/tab9.scss'

const DateAppointment = ({ procedurenotarial, category, setProcedurenotarial }) => {
  const [form] = Form.useForm()

  const onFinish = () => {
    procedurenotarial.scheduled = true

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
            <span className="circule-number">5</span>
          </div>
        </div>
        <h2 className="titleIngresarInfo">
          {procedurenotarial.state === '12' ? 'Solicitud de cita' : 'Modificar cita'}
        </h2>
      </div>
      <br />
      <p className="display-linebreak">
        {procedurenotarial.state === '12'
          ? 'Tu cliente ha solicitado su cita a Notaria, A continuación encontrarás los datos de la cita:'
          : 'Tu cliente ha modificado su cita. Por favor gestiona el cambio con la Notaria.'}
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
          {procedurenotarial.state === '12'
            ? 'Una vez coordinada y confirmada la cita con la Notaria por favor presiona el botón Cita agendada.'
            : 'Una vez modificada la cita en Notaria por favor presiona el botón Cita modificada'}
        </p>
        <br />
        <Button type="primary" icon={<ScheduleOutlined />} htmlType="submit">
          {procedurenotarial.state === '12' ? 'Cita agendada' : 'Cita modificada'}
        </Button>
      </Form>
    </>
  )
}

export default DateAppointment
