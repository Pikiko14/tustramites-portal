import React, { useContext, useEffect, useState } from 'react'
// CONTEXT
import AuthContext from '../../context/AuthContext'

import { CloseOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row } from 'antd'
import queryString from 'query-string'
import { PlusCustomIcon } from '../../components/icons/Icons'
import Alert from '../../helpers/alert/Alert'
import HttpClient from '../../helpers/network/HttpClient'
import './scss/notarialact-step-two.page.scss'

// COMPONENTS
import { LogoTTVAloneIcon } from '../../components/icons/Icons'
import NewProcedure from '../../components/layout/components/NewProcedure'
import Layout from '../../components/layout/Layout'
import FormDocs from './components/FormDocs'

const NotarialActStepTwoPage = (props) => {
  const [notarialact, setNotarialact] = useState()
  const [procedureNotarial, setProcedureNotarial] = useState()
  const [step, setstep] = useState(2)
  const [groups, setgroups] = useState([])
  const [loader, setLoader] = useState(false)
  const { TextArea } = Input
  const [fileList, setFileList] = useState([])
  const { user } = useContext(AuthContext)
  const [form] = Form.useForm()
  const [grupos, setGrupos] = useState([])
  const [grouped, setGrouped] = useState(false)
  const [idGrouped, setIdGrouped] = useState(null)
  const [category, setCategory] = useState()
  const [documents, setDocuments] = useState()

  const onMostrarPanel = (group, close) => {
    var groupsShow = []
    for (let i = 0; i < grupos.length; i++) {
      var gAux = grupos[i].nombre
      var ob = {}
      ob.nombre = gAux

      if (group.nombre == grupos[i].nombre) {
        if (!close)
          ob.mostrar = 1
        else
          ob.mostrar = 0
      } else if (group.nombre != grupos[i].nombre && grupos[i].mostrar == 1) {
        if (!close)
          ob.mostrar = 1
        else
          ob.mostrar = 0
      } else {
        if (!close)
          ob.mostrar = 1
        else
          ob.mostrar = 0
      }

      groupsShow.push(ob)
    }
    setGrupos(groupsShow)
  }

  const loadData = async () => {
    let { p } = queryString.parse(props.location.search)

    if (p) {
      const response2 = await HttpClient.get('/api/procedurenotarial/one/' + p)

      if (response2.status == 200) {
        setProcedureNotarial(response2.data)
        setNotarialact(response2.data.notarialAct)
        loadCategory(response2.data.notarialAct.category)
        if (response2.data.notarialAct.form) {
          setstep(2)
        } else {
          setstep(1)
        }
        setDocuments(response2.data.notarialAct.documents)
        loadGroups(response2.data.notarialAct.documents)
      }
    } else {
      let { id } = queryString.parse(props.location.search)
      const response = await HttpClient.get('/api/notarialact/' + id)

      if (response.status == 200) {
        setNotarialact(response.data)
        setCategory(response.data.category)
        if (response.data.form) {
          setstep(2)
        } else {
          setstep(1)
        }
        loadGroups(response.data.documents)
      }
    }

    if (localStorage.getItem('group_id')) {
      setGrouped(true)
      setIdGrouped(localStorage.getItem('group_id'))
    }
  }

  const loadGroups = (data) => {
    let groups = []
    let groupsShow = []

    for (let i = 0; i < data.length; i++) {
      groups.indexOf(data[i].group) === -1 && groups.push(data[i].group)
    }

    setgroups(groups)
    for (let i = 0; i < groups.length; i++) {
      var gAux = groups[i]
      var ob = {}
      ob.nombre = gAux
      ob.mostrar = 0
      groupsShow.indexOf(groups[i]) === -1 && groupsShow.push(ob)
    }

    setGrupos(groupsShow)
  }

  const onFinish = (values) => {
    //if (!values.cbYes && !values.cbNot) {
    alertShow(3)
    //} else {
    //if (form.getFieldValue('cbYes')) generateIdGroup(3)
    //else
    //saveProcedureNotarial(3)
    //}
  }

  const onFinishFailed = (errorInfo) => {
    Alert.show({
      type: 'error',
      title: '¡Faltan archivos!',
      message: `Algunos documentos son muy importantes para que podamos realizar tu trámite, por favor adjúntalos y si te hace falta alguno, puedes oprimir el botón de Guardar y subirlo cuando lo tengas.\nO si deseas, comunícate con nosotros a través de la ayuda y podremos asesorarte.`,
      btnOk: 'Aceptar',
      fnOk: () => { },
      btnCancel: 'Cancelar',
      buttonX: true
    })
  }

  const generateIdGroup = (flag) => {
    if (grouped) {
      localStorage.removeItem('group_id')
      localStorage.setItem('group_id', idGrouped)
    } else {
      let id = 'A' + Date.now().toString()
      localStorage.setItem('group_id', id)
    }
    saveProcedureNotarial(flag)
  }

  const alertShow = (flag) => {
    Alert.show({
      type: 'warning',
      title: 'Nuevo trámite',
      message: '¿' + user.first_name + ', quieres solicitar otro trámite en este mismo pedido?',
      btnOk: 'Si',
      buttonX: true,
      fnOk: () => {
        generateIdGroup(2)
      },
      btnCancel: 'No',
      fnCancel: () => {
        localStorage.removeItem('group_id')
        saveProcedureNotarial(flag)
      }
    })
  }

  const saveProcedureNotarial = (flag) => {
    const formData = new FormData()
    fileList.forEach((item) => {
      formData.append('file', item.file.originFileObj)
    })

    if (procedureNotarial) {
      formData.append(
        'notarial',
        JSON.stringify({
          notarialAct: notarialact._id,
          actors: procedureNotarial.actors ? procedureNotarial.actors : undefined,
          user: procedureNotarial.user._id,
          documents: { documents: fileList },
          group_id: localStorage.getItem('group_id'),
          observation_document: form.getFieldValue('observation'),
          //state: flag === 2 ? '2' : '3'
          state: '3'
        })
      )

      HttpClient.put('/api/procedurenotarial/' + procedureNotarial._id, formData).then((res) => {
        /*if (form.getFieldValue('cbNot')) {
          localStorage.removeItem('group_id')
        }*/

        if (flag === 2) {
          props.history.push('/notarialactstepthree?id=' + notarialact._id + '&p=' + procedureNotarial._id)
        } else if (flag === 3) {
          props.history.push('/procedure')
        } else {
          /*if (form.getFieldValue('cbYes')) {
            props.history.push('/')
          } else {*/
          if (notarialact.notary)
            props.history.push(
              '/notarialactstepthree?id=' + notarialact._id + '&p=' + procedureNotarial._id
            )
          else
            props.history.push(
              '/notarialactstepfour?id=' + notarialact._id + '&p=' + procedureNotarial._id
            )
          //}
          form.resetFields()
          setFileList([])
        }
      })
    } else {
      formData.append(
        'notarial',
        JSON.stringify({
          notarialAct: notarialact._id,
          user: user.id,
          documents: { documents: fileList },
          group_id: localStorage.getItem('group_id'),
          observation_document: form.getFieldValue('observation'),
          //state: flag === 2 ? '2' : '3'
          state: '3'
        })
      )

      HttpClient.post('/api/procedurenotarial', formData).then((res) => {
        /*if (form.getFieldValue('cbNot')) {
          localStorage.removeItem('group_id')
        }*/

        if (flag === 2) {
          props.history.push('/notarialactstepthree?id=' + notarialact._id + '&p=' + res.data.id)
        } else {
          /*if (form.getFieldValue('cbYes')) {
            props.history.push('/')
          } else {*/
          if (notarialact.notary)
            props.history.push('/notarialactstepthree?id=' + notarialact._id + '&p=' + res.data.id)
          else
            props.history.push('/notarialactstepfour?id=' + notarialact._id + '&p=' + res.data.id)
          //}
          form.resetFields()
          setFileList([])
        }
      })
    }
  }

  const finishProcess = () => {
    if (fileList.length > 0) {
      /*if (
        ((!form.getFieldValue('cbYes') || form.getFieldValue('cbYes') === undefined) &&
          !form.getFieldValue('cbNot')) ||
        form.getFieldValue('cbNot') === undefined
      ) {*/
      //alertShow(2)
      Alert.show({
        type: 'success',
        title: '¡Tú trámite ha sido guardado!',
        message: `Para completar tu solicitud, podrás ir a la opción del menú Mis trámites, seleccionar el botón Ver de este trámite y así podrás continuar justo en donde lo dejaste.\nRecuerda que tienes 10 días para completarlo. Después de este tiempo, tu trámite será eliminado.\n\nSi tienes alguna duda, activa la ayuda y podrás chatear con nosotros o si deseas podemos llamarte. `,
        btnOk: 'Aceptar',
        fnOk: () => {
          saveProcedureNotarial(2)
        },
        btnCancel: 'Cancelar',
        buttonX: true
      })
      /*} else {
        if (form.getFieldValue('cbYes')) generateIdGroup(2)
        else {
          saveProcedureNotarial(2)
        }
      }*/
    } else {
      Alert.show({
        type: 'error',
        title: '¡Faltan archivos!',
        message: `Algunos documentos son muy importantes para que podamos realizar tu trámite, por favor adjúntalos y si te hace falta alguno, puedes oprimir el botón de Guardar y subirlo cuando lo tengas.\nO si deseas, comunícate con nosotros a través de la ayuda y podremos asesorarte.`,
        btnOk: 'Aceptar',
        fnOk: () => { },
        btnCancel: 'Cancelar',
        buttonX: true
      })
    }
  }

  /*const onChangeCheck = (checkSelected) => {
    if (checkSelected === 1) {
      if (!form.getFieldValue('cbYes')) {
        var data = { cbNot: false }
        form.setFieldsValue(data)
      }
    } else {
      if (!form.getFieldValue('cbNot')) {
        data = { cbYes: false }
        form.setFieldsValue(data)
        if (!grouped) localStorage.removeItem('group_id')
      }
    }
  }*/

  const loadCategory = (id) => {
    HttpClient.get('/api/category/' + id).then((res) => {
      setCategory(res.data)
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    console.log('se disparó')
  }

  const finishProcess2 = () => {
    if (fileList.length > 0) {
      /*if (
        ((!form.getFieldValue('cbYes') || form.getFieldValue('cbYes') === undefined) &&
          !form.getFieldValue('cbNot')) ||
        form.getFieldValue('cbNot') === undefined
      ) {*/
      //alertShow(2)
      Alert.show({
        type: 'success',
        title: '¡Tú trámite ha sido guardado!',
        message: `Para completar tu solicitud, podrás ir a la opción del menú Mis trámites, seleccionar el botón Ver de este trámite y así podrás continuar justo en donde lo dejaste.\nRecuerda que tienes 10 días para completarlo. Después de este tiempo, tu trámite será eliminado.\n\nSi tienes alguna duda, activa la ayuda y podrás chatear con nosotros o si deseas podemos llamarte. `,
        btnOk: 'Aceptar',
        fnOk: () => {
          saveProcedureNotarial(3)
        },
        btnCancel: 'Cancelar',
        buttonX: true
      })
      /*} else {
        if (form.getFieldValue('cbYes')) generateIdGroup(2)
        else {
          saveProcedureNotarial(2)
        }
      }*/
    } else {
      Alert.show({
        type: 'error',
        title: '¡Faltan archivos!',
        message: `Algunos documentos son muy importantes para que podamos realizar tu trámite, por favor adjúntalos y si te hace falta alguno, puedes oprimir el botón de Guardar y subirlo cuando lo tengas.\nO si deseas, comunícate con nosotros a través de la ayuda y podremos asesorarte.`,
        btnOk: 'Aceptar',
        fnOk: () => { },
        btnCancel: 'Cancelar',
        buttonX: true
      })
    }
  }

  const alertShow3 = () => {
    Alert.show({
      type: 'warning',
      title: '',
      message: `Toda la información que has ingresado quedará guardada para que puedas continuar después. Si necesitas ayuda no dudes en contactarnos.\n\n¿Segur@ que deseas guardar y crear un nuevo tramite?`,
      btnOk: 'Confirmar',
      fnOk: () => {
        alertShow4()
      },
      buttonX: true,
      fnCancel: () => { }
    })
  }

  const alertShow4 = () => {
    Alert.show({
      type: 'success',
      title: '¡Tú trámite ha sido guardado!',
      message: `Para completar tu solicitud, podrás ir a la opción del menú Mis trámites, seleccionar el botón Ver de este trámite y así podrás continuar justo en donde lo dejaste.\nRecuerda que tienes 10 días para completarlo. Después de este tiempo, tu trámite será eliminado.\n\nSi tienes alguna duda, activa la ayuda y podrás chatear con nosotros o si deseas podemos llamarte.`,
      btnOk: 'Aceptar',
      fnOk: () => {
        props.history.push('/procedure')
      },
      buttonX: true,
      fnCancel: () => { }
    })
  }

  useEffect(() => {
    loadData()
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 3000)
  }, [])

  return (
    <Layout
      loader={loader}
      visible={false}
      hasHeaderProfile={true}
      classNameMain="notarialStepTwo"
    >
      <NewProcedure />
      {notarialact ? (
        <>
          <Row className="containerProcedure-info">
            <Col span={23} className="categories">
              <h3 className="title-indicaciones">{category && category.name} /</h3>
              <div className="line-morado"> </div>
              <h2 className="title-indicaciones">{notarialact.name}</h2>
              <div className="diplayflex">
                <div className="content-circule">
                  <div className="circule-notaria">
                    <span className="circule-number">{step}</span>
                  </div>
                </div>
                <h2 className="titleIngresarInfo">Adjunta los documentos</h2>
              </div>
            </Col>
          </Row>
          <br />

          <Form
            name="basic"
            layout="vertical"
            className='form'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onSubmitCapture={onSubmit}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Row className="containerDocs">
              <Col span={20}>
                {groups.map((group, k) =>
                  k == 0 ? (
                    <FormDocs
                      key={k}
                      notarialact={notarialact}
                      group={group}
                      fileList={fileList}
                      setFileList={setFileList}
                      maximum={10}
                    />
                  ) : null
                )}
              </Col>
            </Row>
            {grupos.map((grupoMostrar, q) =>
              q > 0 ? (
                <>
                  {grupoMostrar.mostrar === 1 ? (
                    <Row className="containerDocs">
                      <span className='containerDocs-delete'>
                        <Button
                          // type="primary"
                          // shape="circle"
                          onClick={() => onMostrarPanel(grupoMostrar, true)}
                          icon={<CloseOutlined />}
                        />
                      </span>
                      <FormDocs
                        notarialact={notarialact}
                        group={grupoMostrar.nombre}
                        fileList={fileList}
                        setFileList={setFileList}
                      />
                    </Row>
                  ) : (
                    <Row>
                      <Button
                        type="primary"
                        size="large"
                        icon={<PlusCustomIcon />}
                        className="button-tramite marginBotton"
                        onClick={() => onMostrarPanel(grupoMostrar, false)}
                      >
                        {grupoMostrar.nombre}
                      </Button>
                    </Row>
                  )}
                </>
              ) : null
            )}
            <Row className="noteFirst">
              <Col span={24} className="centrar margeTituloActor">
                <h3 className="titleIngresarInfo">
                  NOTA:
                  <span className="titleIngresarInfo-rest">
                    Recuerda que debes presentar los documentos originales o copias certificadas
                    ante el Notario en el momento de la firma.
                  </span>
                </h3>
              </Col>
            </Row>
            {/*<Row>
              <p className="colorGray">
                (*) Recuerda que debes presentar los documentos originales o copias certificadas
                ante el Notario en el momento de la firma.
              </p>
                      </Row>*/}
            {notarialact.note_2 && (
              <Row className="noteFirst">
                <Col span={24} className="centrar margeTituloActor">
                  <h3 className="titleIngresarInfo">{notarialact.note_2}</h3>
                </Col>
              </Row>
            )}
            {/*<Row>
              <p className="colorGray">
                (*) Si no cuentas con este documento, en tus Trámites VIP podemos tramitarlo. Por
                favor indícalo en las observaciones.
              </p>
            </Row>*/}
            <Row>
              <Form.Item
                label="Observación"
                name="observation"
                id="observation"
                className="containerObservation"
                hasFeedback
              /*rules={[
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
              {/*<div className="displayFlex margenSolicitar">
                <p className="colorGray">¿ Desea solicitar otro tramite ? &nbsp; </p>
                <Form.Item
                  name="cbYes"
                  valuePropName="checked"
                  id="cbYes"
                  className="checkbox-aceptar"
                  onClick={() => onChangeCheck(1)}
                >
                  <Checkbox>Si</Checkbox>
                </Form.Item>
                <Form.Item
                  name="cbNot"
                  valuePropName="checked"
                  id="cbNot"
                  className="checkbox-aceptar"
                  onClick={() => onChangeCheck(2)}
                >
                  <Checkbox>No</Checkbox>
                </Form.Item>
              </div>*/}
              <div className="containerButtonFinished">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="button"
                    className="btnSave"
                    icon={<SaveOutlined />}
                    onClick={() => finishProcess()}
                  >
                    Guardar y salir
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    className="btnSave"
                    icon={<SaveOutlined />}
                    onClick={() => finishProcess2()}
                  >
                    Guardar y crear uno nuevo
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="btnContinuar">
                    Continuar
                  </Button>
                </Form.Item>
              </div>
            </Row>
          </Form>
        </>
      ) : null}
    </Layout>
  )
}

export default NotarialActStepTwoPage
