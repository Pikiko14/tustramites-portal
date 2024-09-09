import React, { useEffect, useState, useContext } from 'react'
// CONTEXT
import AuthContext from '../../context/AuthContext'

import { Button, Input, Row, Col, Form } from 'antd'
import Alert from '../../helpers/alert/Alert'
import HttpClient from '../../helpers/network/HttpClient'
import queryString from 'query-string'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import DocumentViewer from './components/DocumentViewer'
import NewProcedure from '../../components/layout/components/NewProcedure'
import './scss/documentresult-step-seven.page.scss'


const DocumentResult = (props) => {
  const [notarialact, setNotarialact] = useState()
  const [category, setCategory] = useState()
  const [message, setMessage] = useState()
  const [procedureNotarial, setProcedureNotarial] = useState()
  const [loader, setLoader] = useState(false)
  const { TextArea } = Input
  const { user } = useContext(AuthContext)
  const [form] = Form.useForm()

  const loadData = () => {
    let { p } = queryString.parse(props.location.search)
    if (p) {
      HttpClient.get('/api/procedurenotarial/one/' + p).then((res) => {
        setProcedureNotarial(res.data)
        setNotarialact(res.data.notarialAct)
        loadCategory(res.data.notarialAct.category)

        if (res.data.notarialAct.date) {
          let message =
            `Gracias por revisar y darnos la aprobación del documento.\n\n Ahora puedes proceder a agendar tu cita preferencial en Notaría.`
          setMessage(message)
        } else {
          let message =
            `Gracias por revisar y darnos la aprobación del documento.\n\n Muy pronto nos estaremos comunicando contigo.`
          setMessage(message)
        }
      })
    }
  }

  const loadCategory = (id) => {
    HttpClient.get('/api/category/' + id).then((res) => {
      setCategory(res.data)
    })
  }

  const onFinish = (values) => {
    procedureNotarial.observation_document_result = values.observation
    procedureNotarial.state = '10'

    HttpClient.put('/api/procedurenotarial/' + procedureNotarial._id, procedureNotarial)
      .then((res) => {
        Alert.show({
          type: 'warning',
          title: 'Correcciones enviadas',
          message:
            user.first_name +
            ` ` +
            user.last_name +
            ` gracias por revisar el documento y enviarnos las observaciones correspondientes.
                    Revisaremos el documento y rápidamente realizaremos los ajustes pertinentes. Te estaremos informando para que ingreses nuevamente y puedas aprobarlo.`,
          btnOk: 'Aceptar',
          fnOk: () => {
            props.history.push('/procedurenotarial')
          },
          btnCancel: 'Cancelar',
          buttonX: true
        })
      })
      .catch((err) => {
        Alert.show({
          type: 'error',
          title: 'Error inesperado',
          message: 'Ocurrio un error inesperado, vuelve a intentar',
          btnOk: 'Aceptar',
          fnOk: () => { },
          btnCancel: 'Cancelar',
          buttonX: true
        })
      })
  }

  const saveData = () => {
    if (form.getFieldValue('observation'))
      procedureNotarial.observation_document_result = form.getFieldValue('observation')
    procedureNotarial.state = '9'

    HttpClient.put('/api/procedurenotarial/' + procedureNotarial._id, procedureNotarial)
      .then((res) => {
        Alert.show({
          type: 'success',
          title: '¡Genial '+ user.first_name + ' ' + user.last_name + '!',
          message: message,
          btnOk: 'Solicita tu cita',
          fnOk: () => { props.history.push('/procedurenotarial')},
          btnCancel: 'Cancelar',
          buttonX: true
        })
      })
      .catch((err) => {
        Alert.show({
          type: 'error',
          title: 'Error inesperado',
          message: 'Ocurrio un error inesperado, vuelve a intentar',
          btnOk: 'Solicita tu cita',
          fnOk: () => { },
          btnCancel: 'Cancelar',
          buttonX: true
        })
      })
  }

  const onFinishFailed = () => {
    Alert.show({
      type: 'error',
      title: 'Diligencia adecuadamente el formulario',
      message: `Para enviar la corrección debes ingresar las observaciones detectadas en el documento.`,
      btnOk: 'Aceptar',
      fnOk: () => { },
      btnCancel: 'Cancelar',          
      buttonX: true
    })
  }

  useEffect(() => {
    loadData()
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])

  return (
    <>
      <Layout 
        loader={loader}   
        hasHeaderProfile={true}
        classNameMain="notarialStepSeven"
      >
      <NewProcedure />
      {notarialact ? (
                <>
        <Row className="containerProcedure-info">
          <Col span={23} className="categories">
            <h3 className="title-indicaciones">{category && category.name + ' /'}</h3>
            <div className="line-morado"> </div>
            <h2 className="title-indicaciones">{notarialact && notarialact.name}</h2>
            <div className="diplayflex">
              <div className="content-circule">
                <div className="circule-notaria">
                  <span className="circule-number"></span>
                </div>
              </div>
              <h2 className="titleIngresarInfo">Revisar el borrador</h2>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <p className="containerDescription-description">
              {user.first_name +
                ' ' +
                user.last_name +
                `, por favor lee cuidadosamente el borrador del documento final que hemos creado para tu trámite. Revisa que todos los datos estén correctos (nombres, números de identificación, ciudades, etc).\n\n
                        Si todo está perfecto, presiona el botón `}<b>Aprobar</b>{`. Pero si encuentras algún dato que deba ser corregido, por favor menciónalo en el campo de observaciones, acompañado del número de línea que se encuentra a la izquierda del documento y presiona el botón `}<b>Corregir</b>{`.`}
            </p>
          </Col>
        </Row>

        <br />
        <Row>
          <Col span={2}></Col>
          <Col span={16}>
            {procedureNotarial && (
              <DocumentViewer
                url={
                  process.env.REACT_APP_URL_API +
                  '/api/storage?url=' +
                  procedureNotarial.document_result +
                  '&type=0&access=1'
                }
              />
            )}
          </Col>
        </Row>
        <br />
        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row>
              <Form.Item
                label="Observación"
                name="observation"
                id="observation"
                className="containerObservation"
                hasFeedback
                 /*rules={[
                  {
                    required: true,
                    message: 'La descripción es requerida'
                  },
                  {
                    min: 5,
                    message: 'La descripción debe tener al menos 5 caracteres!'
                  }
                ]}*/
              >
                 <TextArea
                  className="textArea"
                  rows={4}
                  placeholder="Ingresa tu observación."
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  maxLength={1000}
                  showCount={true}
                />
              </Form.Item>
          </Row>
          <Row className="containerContinue">
              <div className="containerButtonFinished">
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="btnSave">
                    Corregir
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="button"
                    className="btnContinuar"
                    onClick={() => saveData()}
                  >
                    Aprobar
                  </Button>
                </Form.Item>
              </div>
          </Row>
        </Form>
        </>
        ) : null}
      </Layout>
    </>
  )
}

export default DocumentResult
