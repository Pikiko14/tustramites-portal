import React, { useContext, useEffect, useState } from 'react'
// CONTEXT
import AuthContext from '../../context/AuthContext'

import { Button, Col, Form, Row } from 'antd'
import queryString from 'query-string'
import Alert from '../../helpers/alert/Alert'
import HttpClient from '../../helpers/network/HttpClient'

// COMPONENTS
import { SaveOutlined } from '@ant-design/icons'
import NewProcedure from '../../components/layout/components/NewProcedure'
import Layout from '../../components/layout/Layout'
import FormIterarive from './components/FormIterative'
import FormSample from './components/FormSample'

import './scss/notarialact.page.scss'

const NotarialAct = (props) => {
  const [notarialact, setNotarialact] = useState()
  const [loader, setLoader] = useState(false)
  const [actorsIterative, setActorsIterative] = useState()
  const [form] = Form.useForm()
  const { user } = useContext(AuthContext)

  const loadNotarialAct = async () => {
    let { id } = queryString.parse(props.location.search)
    const response = await HttpClient.get('/api/notarialact/' + id)

    if (response.status === 200) {
      setNotarialact(response.data)
    }
  }

  const onFinish = (flag) => {
    const formData = form.getFieldsValue()
    let data = {}
    let actor
    Object.keys(formData).forEach((item, i) => {
      const array = item.split('_')
      if (actor) {
        if (actor !== array[1]) {
          actor = array[1]
          data[actor] = {}
        }
      } else {
        actor = array[1]
        data[actor] = {}
      }
      data[actor][array[0]] = formData[item]
    })
    var actors = { ...data, ...actorsIterative }
    if (validate(actors)) {
      HttpClient.post('/api/procedurenotarial', {
        notarialAct: notarialact._id,
        actors: actors,
        user: user._id,
        state: '2'
      }).then((res) => {
        if (flag) {
          props.history.push('/notarialactsteptwo?id=' + notarialact._id + '&p=' + res.data.id)
          form.resetFields()
          actors = {}
        } else {
          alertShow()
        }
      })
    } else {
      Alert.show({
        type: 'error',
        title: '¡Lo sentimos!',
        message: `No puedes continuar hasta que hayas diligenciado todos los datos que son obligatorios.\nSi no cuentas con ellos y necesitas tiempo para reunirlos, puedes darle clic al botón Guardar y cuando tengas los datos podrás ir a Mis trámites y continuar en donde lo dejaste.`,
        btnOk: 'Aceptar',
        fnOk: () => { },
        buttonX: true,
        fnCancel: () => { }
      })
    }
  }

  const validate = (object) => {
    var type = 0
    var idsSingle = []
    var idsIterative = []
    var result = false
    let count_fields_required = 0

    notarialact.actors.forEach((item, i) => {
      if (!item.iterative) {
        type = 1
        idsSingle.push(item.actor._id)
      }
    })

    notarialact.actors.forEach((item, i) => {
      /*if (item.iterative && (type == 1 || type == 2)) {
        console.log('entro2')
        type = 3
        idsSingle.push(item.actor._id)
        idsIterative.push(item.actor._id)
      } else if (item.iterative && type == 0) {
        console.log('entro3')
        type = 2
        idsIterative.push(item.actor._id)
      }*/
      if (item.iterative) {
        idsIterative.push(item.actor._id)
      }
    })

    //SOLO ACTORES SIMPLES
    /*if (type == 1) {

      idsSingle.forEach((item, i) => {
        if (object[item]) {
          Object.keys(object[item]).forEach((input) => {
            let characters_min = notarialact.form[input].input.minCant || 0
            let characters_max = notarialact.form[input].input.maxCant || 0
            if ((object[item][input] == undefined || object[item][input] == '') &&
              notarialact.form[input].input.required) {
              count_fields_required += 1
            }

          })
        }
      })
      result = count_fields_required == 0
    } else if (type == 2) {
      //SOLO ACTORES ITERATIVOS
      idsIterative.forEach((item, i) => {
        /*if (object[item]) {
          result = true
        }
        if (object[item]) {
          Object.keys(object[item]).forEach((input) => {
            if ((object[item][input] == undefined || object[item][input] == '') && notarialact.form[input].input.required)
              count_fields_required += 1
          })
        }
      })
      result = count_fields_required == 0
    } else if (type == 3) {*/
    //AMBOS ACTORES
    //let flag = false
    //let flag2 = false
    idsSingle.forEach((item, i) => {
      /*if (object[item]) {
        flag = true
      }*/
      console.log(object)
      if (object[item]) {

        Object.keys(object[item]).forEach((input) => {
          if ((object[item][input] == undefined || object[item][input] == '') &&
            notarialact.form[input].input.required) {
            count_fields_required += 1
          }

        })
      }
    })

    console.log('fiels', count_fields_required)

    idsIterative.forEach((item, i) => {
      /*if (object[item]) {
        flag2 = true
      }*/
      if (object[item]) {
        object[item].forEach((data) => {
          Object.keys(data).forEach((input) => {
            if ((data[input] == undefined || data[input] == '') &&
              notarialact.form[input].input.required) {
              count_fields_required += 1
            }
          })
        })
      }
    })

    //if (flag && flag2) result = true
    result = count_fields_required == 0
    //}

    let aux_result = 0
    idsSingle.forEach((item, i) => {

      if (object[item]) {
        Object.keys(object[item]).forEach((input) => {
          let characters_min = notarialact.form[input].input.minCant || 0
          let characters_max = notarialact.form[input].input.maxCant || 0
          if ((object[item][input] == undefined || object[item][input] == '') && !notarialact.form[input].input.required) {
            aux_result = aux_result + 0
          } else if ((object[item][input] == undefined || object[item][input] == '') && notarialact.form[input].input.required) {
            if (characters_min > 0) {
              aux_result += 1
            }
          } else if (object[item][input].length >= characters_min && object[item][input].length <= characters_max) {
            aux_result = aux_result + 0
          } else {
            aux_result += 1
          }
        })
      }
    })

    idsIterative.forEach((item, i) => {
      if (object[item]) {
        object[item].forEach((data) => {
          Object.keys(data).forEach((input) => {
            let characters_min = notarialact.form[input].input.minCant || 0
            let characters_max = notarialact.form[input].input.maxCant || 0
            if ((data[input] == undefined || data[input] == '') && !notarialact.form[input].input.required) {
              aux_result = aux_result + 0
            } else if ((data[input] == undefined || data[input] == '') && notarialact.form[input].input.required) {
              if (characters_min > 0)
                aux_result += 1
            } else if (data[input].length >= characters_min && data[input].length <= characters_max) {
              aux_result = aux_result + 0
            } else {
              aux_result += 1
            }
          })

        })
      }
    })

    console.log(aux_result)
    return result && (aux_result == 0)
  }

  const alertShow2 = () => {
    Alert.show({
      type: 'success',
      title: '¡Tú trámite ha sido guardado!',
      message: `Para completar tu solicitud, podrás ir a la opción del menú Mis trámites, seleccionar el botón Ver de este trámite y así podrás continuar justo en donde lo dejaste.\nRecuerda que tienes 10 días para completarlo. Después de este tiempo, tu trámite será eliminado.\n\nSi tienes alguna duda, activa la ayuda y podrás chatear con nosotros o si deseas podemos llamarte.`,
      btnOk: 'Aceptar',
      fnOk: () => {
        props.history.push('/procedurenotarial')
      },
      buttonX: true,
      fnCancel: () => { }
    })
  }

  const alertShow = () => {
    Alert.show({
      type: 'warning',
      title: '',
      message: `Toda la información que has ingresado quedará guardada para que puedas continuar después. Si necesitas ayuda no dudes en contactarnos.\n\n¿Segur@ que deseas guardar y salir?`,
      btnOk: 'Confirmar',
      fnOk: () => {
        alertShow2()
      },
      buttonX: true,
      fnCancel: () => { }
    })
  }

  useEffect(() => {
    loadNotarialAct()
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 3000)
  }, [])

  return (
    <Layout loader={loader} hasHeaderProfile={true} visible={true} classNameMain="notarialAct">
      <NewProcedure />
      {notarialact ? (
        <>
          <Row className="containerProcedure-info">
            {/* <Col span={1}></Col> */}
            <Col span={23} className="categories">
              <h3 className="title-indicaciones">{notarialact.category.name} /</h3>
              <div className="line-morado" />
              <h2 className="title-indicaciones">{notarialact.name}</h2>
              <div className="diplayflex">
                <div className="content-circule">
                  <span className="circule-number">1</span>
                </div>
                <h2 className="titleIngresarInfo">Ingresa la información</h2>
              </div>
            </Col>
          </Row>
          <br />
          <Row className="containerDescription">
            <Col span={1}></Col>
            <Col span={22}>
              <p className="containerDescription-description">{notarialact.description}</p>
              {notarialact.note && (
                <p className="containerDescription-description">{notarialact.note}</p>
              )}
            </Col>
          </Row>
          <Row className="containerForm">
            <Col span={24}>
              {notarialact.actors.map((actor, i) => (
                <>
                  {!actor.iterative ? (
                    <FormSample
                      key={i}
                      notarialact={notarialact}
                      actor={actor}
                      form={form}
                      iterative={false}
                      flag={true}
                    />
                  ) : (
                    <FormIterarive
                      key={i}
                      notarialact={notarialact}
                      actor={actor}
                      setActorsIterative={setActorsIterative}
                      actorsIterative={actorsIterative}
                      iterative={true}
                      flag={true}
                    />
                  )}
                </>
              ))}
              <Row className="containerButtonFinished">
                {/* <Col sm={0} md={8}></Col> */}

                {/* <Col sm={0} md={8}></Col> */}
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btnSave"
                  icon={<SaveOutlined />}
                  onClick={() => onFinish(false)}
                >
                  Guardar y salir
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btnContinuar"
                  onClick={() => onFinish(true)}
                >
                  Continuar
                </Button>
              </Row>
              {/* <Col span={10}></Col> */}
            </Col>
          </Row>
        </>
      ) : null}
    </Layout>
  )
}

export default NotarialAct
