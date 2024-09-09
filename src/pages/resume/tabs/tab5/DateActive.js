import React, { useContext, useState } from 'react'
import { Row, Col, Form, Input, Upload, Button } from 'antd'
import { SaveOutlined, FilePdfOutlined } from '@ant-design/icons'
//COMPONENTS
import Alert from '../../../../helpers/alert/Alert'
import HttpClient from '../../../../helpers/network/HttpClient'
import './scss/tab5.scss'
import AuthContext from '../../../../context/AuthContext'

import './scss/tab8.scss'

const DateActive = ({ procedurenotarial, setProcedureNotarial, category }) => {
  const { user } = useContext(AuthContext)
  const onClickContinue = () => {
    Alert.show({
      type: 'warning',
      title: '',
      message:
        '¿' +
        (user ? user.first_name + ',' : '') +
        ' estás seguro que deseas activar la cita para este trámite?',
      btnOk: 'Aceptar',
      fnOk: () => {
        updateProcedureNotarial()
      },
      buttonX: true,
      btnCancel: 'Cancelar'
      //fnCancel: () => {}
    })
  }

  const updateProcedureNotarial = () => {
    procedurenotarial.state = '11'

    HttpClient.put('/api/procedurenotarial/' + procedurenotarial._id, procedurenotarial)
      .then((res) => {
        var aux = { ...procedurenotarial }
        setProcedureNotarial(aux)
        Alert.show({
          type: 'success',
          title: '',
          message: `Información almacenada correctamente`,
          btnOk: 'Aceptar',
          fnOk: () => {},
          btnCancel: 'Cancelar',
          buttonX: true
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
  return (
    <>
      <h3 className="title-indicaciones">{category && category.name} /</h3>
      <div className="line-morado"> </div>
      <h2 className="title-indicaciones">{procedurenotarial.notarialAct.name}</h2>
      <div className="diplayflex">
        <div className="content-circule">
          <div className="circule-notaria">
            <span className="circule-number">4</span>
          </div>
        </div>
        <h2 className="titleIngresarInfo">Activar cita para el trámite</h2>
      </div>
      <br />
      <br />

      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Button
          className="btnSave"
          type="primary"
          icon={<SaveOutlined />}
          htmlType="submit"
          onClick={() => onClickContinue()}
        >
          Activar Cita
        </Button>
      </Form>
    </>
  )
}

export default DateActive
