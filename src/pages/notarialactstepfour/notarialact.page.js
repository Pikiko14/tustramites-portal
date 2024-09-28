import React, { useContext, useEffect, useState } from 'react'
// CONTEXT
import AuthContext from '../../context/AuthContext'

import { Button, Input, Row, Col, Form, Select, InputNumber } from 'antd'
import HttpClient from '../../helpers/network/HttpClient'
import queryString from 'query-string'

// COMPONENTS
import Layout from '../../components/layout/Layout'
//import SaveDialog from './components/SaveDialog'
import Alert from '../../helpers/alert/Alert'

import './scss/notarialact-step-four.page.scss'

// RESOURCE
import json_location from '../../json/states-cities.json'
import NewProcedure from '../../components/layout/components/NewProcedure'
import { CaretDownOutlined } from '@ant-design/icons'

const NotarialActStepThreePage = (props) => {
  const { user } = useContext(AuthContext)
  const [loader, setLoader] = useState(false)
  const [notarialact, setNotarialact] = useState()
  const [procedureNotarial, setProcedureNotarial] = useState()
  //const [openDialog, setOpenDialog] = useState(false)
  const [cities, setCities] = useState([])
  const [step, setstep] = useState(4)
  const [form] = Form.useForm()
  const [category, setCategory] = useState()

  const loadNotarialAct = async () => {
    let { p } = queryString.parse(props.location.search)

    const response2 = await HttpClient.get('/api/procedurenotarial/one/' + p)

    if (response2.status == 200) {
      setProcedureNotarial(response2.data)
      setNotarialact(response2.data.notarialAct)
      loadCategory(response2.data.notarialAct.category)
      if (response2.data.notarialAct.form) {
        if (response2.data.notarialAct.notary) setstep(4)
        else setstep(3)
      } else {
        if (response2.data.notarialAct.notary) setstep(3)
        else setstep(2)
      }
    }
  }

  const loadCategory = (id) => {
    HttpClient.get('/api/category/' + id).then((res) => {
      setCategory(res.data)
    })
  }

  const handleChangeProvince = async (value) => {
    const state = json_location.find((x) => x.state === value)
    setCities(state.cities)
  }

  /*const handleSave = () => {
    setOpenDialog(true)
  }*/

  const onFinish = (values) => {
    HttpClient.put('/api/procedurenotarial/' + procedureNotarial._id, {
      notarialAct: notarialact._id,
      actors: procedureNotarial.actors ? procedureNotarial.actors : undefined,
      user: procedureNotarial.user._id,
      documents: procedureNotarial.documents,
      state: '5',
      notary: procedureNotarial.notary ? procedureNotarial.notary._id : undefined,
      payment_data: values
    }).then((res) => {
      form.resetFields()
      //handleSave()
      const messageNoPay = "Ahora vamos a confirmar el valor cobrado por la Notaría de acuerdo a toda la información que nos has suministrado, ya que este valor puede variar dependiendo de la cantidad de solicitantes, del número de páginas del documento final, etc.\n\nApenas nos respondan te estaremos enviando un mensaje a tu correo para que puedas continuar con el pago.";
      const messagePay = "Ya puedes continuar con el siguiente paso que es pagar tu tramite.";
      
      Alert.show({
        type: 'error',
        title: user ? '¡Genial ' + user.first_name + '!' : '¡Genial!',
        message: res.data.go_pay ? messagePay : messageNoPay,
        btnOk: 'Aceptar',
        fnOk: () => {
          if (res.data.go_pay) {
            props.history.push('ordersummary?p=' + procedureNotarial._id)
          } else {
            props.history.push('/procedurenotarial')
          }
        },
        btnCancel: 'Cancelar' //,
        //buttonX: true
      })
    })
  }

  const onFinishFailed = () => {
    Alert.show({
      type: 'error',
      title: '¡Lo sentimos!',
      message: `No puedes continuar hasta que hayas diligenciado todos los datos que son obligatorios.`,
      btnOk: 'Aceptar',
      fnOk: () => { },
      btnCancel: 'Cancelar',
      buttonX: true
    })
  }

  const validateIdentification = (value) => {
    if (form.getFieldValue('typeDocument') === 'Pasaporte') {
      return true
    } else {
      var answer = false
      if (form.getFieldValue('typeDocument') !== 'RUC') {
        if (value.length < 2) {
          answer = true
        }

        if (!answer && value.length === 2 && parseInt(value) <= 24) {
          answer = true
        }

        if (!answer && value.length === 3 && parseInt(value.charAt(2)) < 6) {
          answer = true
        }

        if (!answer && value.length === 10) {
          var result = 0
          for (var i = 0; i < value.length - 1; i++) {
            if (i === 0 || i % 2 === 0) {
              let resultAux = parseInt(value[i]) * 2
              if (resultAux > 10) resultAux = resultAux - 9
              result += resultAux
            } else {
              let resultAux = parseInt(value[i]) * 1
              result += resultAux
            }
          }
          var ten = result - (result % 10) + 10
          if (ten - result === parseInt(value[9])) answer = true
        }
      } else {
        if (value.length < 2) {
          answer = true
        }

        if (!answer && value.length === 2 && parseInt(value) <= 24) {
          answer = true
        }

        if (!answer && value.length === 3 && (value.charAt(2) === '6' || value.charAt(2) === '9')) {
          answer = true
        }

        if (!answer && value.length === 10) {
          let result = 0
          for (let i = 0; i < value.length - 1; i++) {
            if (i === 0 || i % 2 === 0) {
              let resultAux = parseInt(value[i]) * 2
              if (resultAux > 10) resultAux = resultAux - 9
              result += resultAux
            } else {
              let resultAux = parseInt(value[i]) * 1
              result += resultAux
            }
          }
          ten = result - (result % 10) + 10
          if (ten - result === parseInt(value[9])) answer = true
        }

        if (value && value.length === 13) {
          if (
            value.substring(10, 13) === '000' ||
            value.substring(10, 13) === '001' ||
            value.substring(10, 13) === '002' ||
            value.substring(10, 13) === '003'
          ) {
            if (value.charAt(2) === '6' || value.charAt(2) === '9') {
              answer = true
            } else {
              answer = false
            }
          }
        }
      }

      return answer
    }
  }

  /*function verificarCedula(cedula) {
    if (typeof(cedula) == 'string' && cedula.length == 10 && /^\d+$/.test(cedula)) {
      var digitos = cedula.split('').map(Number);
      var codigo_provincia = digitos[0] * 10 + digitos[1];
  
      //if (codigo_provincia >= 1 && (codigo_provincia <= 24 || codigo_provincia == 30) && digitos[2] < 6) {
  
      if (codigo_provincia >= 1 && (codigo_provincia <= 24 || codigo_provincia == 30)) {
        var digito_verificador = digitos.pop();
  
        var digito_calculado = digitos.reduce(
          function (valorPrevio, valorActual, indice) {
            return valorPrevio - (valorActual * (2 - indice % 2)) % 9 - (valorActual == 9) * 9;
          }, 1000) % 10;
        return digito_calculado === digito_verificador;
  }
    }
    return false;
  }*/

  /*const callback = () => {
    props.history.push('/')
  }*/

  const loadDefault=()=>{
    let data = {
      typeUser: 'Nombre',
      typeDocument: 'Tipo de Documento',
    }
    form.setFieldsValue(data)
  }

  useEffect(() => {
    loadNotarialAct()
    loadDefault()
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 3000)
  }, [])

  return (
    <>
      {/*<SaveDialog openDialog={openDialog} setOpenDialog={setOpenDialog} callback={callback} />*/}
      <Layout
        loader={loader}
        visible={true}
        hasHeaderProfile={true}
        classNameMain="notarialStepFour"
      >
        <NewProcedure />
        {notarialact ? (
          <>
            <Row className="containerProcedure-info">
              <Col span={23} className="categories">
                <h3 className="title-indicaciones">{category && category.name} /</h3>
                <div className="line-morado" />
                <h2 className="title-indicaciones">{notarialact.name}</h2>
                <div className="diplayflex">
                  <div className="content-circule">
                    <div className="circule-notaria">
                      <span className="circule-number">4</span>
                    </div>
                  </div>
                  <h2 className="titleIngresarInfo">Realiza tu Pago</h2>
                </div>
              </Col>
            </Row>
            <br />
            <Row className="containerBilling">
              <Col span={2} />
              <Col span={16}>
                <h2 className="titleIngresarInfo">Datos de facturación</h2>
                <p className="containerBilling-client">
                  {user
                    ? '¡' +
                    user.first_name +
                    ' falta poco para terminar! Por favor ingresa los datos de facturación.'
                    : '¡ falta poco para terminar! Por favor ingresa los datos de facturación.'}
                </p>
              </Col>
            </Row>
            <Form
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
            >
              <Row>
                <Row className="formFour-items">
                  <Form.Item
                    className="selectDynamic placeholderBold"
                    name="typeUser"
                    id="typeUser"
                    // label="Tipo Persona"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor selecciona un tipo de persona'
                      }
                    ]}
                    hasFeedback
                  >
                    <Select
                      // className="select"
                      placeholder="Nombre:"
                      allowClear
                      suffixIcon={<CaretDownOutlined />}
                      defaultValue="Nombre"
                    >
                      <option className="optionStepFour" value="Nombre">
                        Nombre completo
                      </option>
                      <option className="optionStepFour" value="Razón social">
                        Razón social
                      </option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="name"
                    id="name"
                    // label=" "
                    key={2}
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingresa tu nombre'
                      },{
                        min:3,
                        message:'Tu nombre debe tener mínimo 3 caracteres'
                      }
                    ]}
                    hasFeedback
                  >
                    <Input className="input-dynamic width95" />
                  </Form.Item>
                </Row>
              </Row>

              <Row>
                <Row className="formFour-items">
                  <Form.Item
                    name="typeDocument"
                    id="typeDocument"
                    className="selectDynamic placeholderBold"
                    // label="Tipo Documento"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor selecciona tu tipo de documento'
                      }
                    ]}
                    hasFeedback
                  >
                    <Select
                      // className="select"
                      placeholder="Tipo de documento"
                      allowClear
                      suffixIcon={<CaretDownOutlined />}
                      defaultValue='CC'
                    >
                      <option className="optionStepFour" value="CC">
                        Cédula de ciudadanía
                      </option>
                      <option className="optionStepFour" value="RUC">
                        RUC
                      </option>
                      <option className="optionStepFour" value="Pasaporte">
                        Pasaporte
                      </option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="document"
                    id="document"
                    // label=" "
                    key={2}
                    className="placeholderNormal"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingresa tu documento'
                      } /*,
                      {
                        
                        max: form.getFieldValue('typeDocument') === 'CC' ? 10 : 13, message: 'Dígitos maximos superada'
                      },
                      {
                        min: form.getFieldValue('typeDocument') === 'CC' ? 10 : 13, message: 'Dígitos minimos no ingresados aún'
                      }/*,
                         {
                             validator(_, value) {
                                 if (validateIdentification(value)) {
                                     return Promise.resolve()
                                 }
                                 return Promise.reject('Número invalido. Verifícalo y vuelve a intentarlo')
                             }
                         }*/
                    ]}
                    hasFeedback
                  >
                    <Input
                      type="number"
                      placeholder="Número de documento"
                      className="input-dynamic width95"
                    />
                  </Form.Item>
                </Row>
              </Row>

              <Row>
                <Row className="formFour-items three">
                  {/*<Form.Item
                    name="country"
                    id="country"
                    // label="Pais"
                    className="selectDynamic placeholderBold"
                    rules={[
                      {
                        required: true,
                        message: 'Este campo es requerido!'
                      }
                    ]}
                    hasFeedback
                  >
                    <Select
                      // className="select"
                      placeholder="País"
                      allowClear
                      suffixIcon={<CaretDownOutlined />}
                    >
                      <option value="Ecuador">Ecuador</option>
                    </Select>
                  </Form.Item>*/}
                  <Form.Item
                    name="email"
                    id="email"
                    // label="Direccion"
                    className="placeholderNormal"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingresa tu email'
                      },
                      {
                        type: 'email',
                        message: 'El email que ingresaste no es válido'
                      }
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Correo electrónico" className="input-dynamic width95" />
                  </Form.Item>
                  <Form.Item
                    name="province"
                    id="province"
                    // label="Provincia"
                    className="selectDynamic placeholderBold"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor selecciona una provincia'
                      }
                    ]}
                    hasFeedback
                  >
                    <Select
                      // className="select"
                      placeholder="Provincia"
                      onChange={handleChangeProvince}
                      allowClear
                      suffixIcon={<CaretDownOutlined />}
                    >
                      {json_location.map((province, i) => (
                        <option className='optionStepFour' key={i} value={province.state}>
                          {province.state}
                        </option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="city"
                    id="city"
                    // label="Ciudad"
                    className="selectDynamic placeholderBold"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor selecciona tu ciudad'
                      }
                    ]}
                    hasFeedback
                  >
                    <Select
                      // className="select"
                      placeholder="Ciudad"
                      allowClear
                      suffixIcon={<CaretDownOutlined />}
                    >
                      {cities.map((city, i) => (
                        <option className='optionStepFour' key={i} value={city}>
                          {city}
                        </option>
                      ))}
                    </Select>
                  </Form.Item>
                </Row>
              </Row>

              <Row>
                <Row className="formFour-items">
                  <Form.Item
                    name="address"
                    id="address"
                    // label="Direccion"
                    className="placeholderNormal"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingresa tu dirección completa'
                      },
                      {
                        min: 5,
                        message: 'Tu dirección debe tener mínimo 5 caracteres'
                      }
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Dirección completa" className="input-dynamic width95" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    id="phone"
                    // label="Celular"
                    className="placeholderNormal"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor ingresa tu número celular'
                      },
                      {
                        min: 7,
                        message: 'Tu celular debe tener mínimo 7 caracteres'
                      },
                      {
                        max: 11,
                        message: 'Tu celular debe tener maximo 11 caracteres'
                      }
                    ]}
                    hasFeedback
                  >
                    <Input type="number" placeholder="Celular" className="input-dynamic" />
                  </Form.Item>
                </Row>
              </Row>

              <Row className="containerButtonFinished">
                <Col span={22}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="btnContinuar">
                    Guardar
                  </Button>
                </Form.Item>
                </Col>
              </Row>
            </Form>
          </>
        ) : null}
      </Layout>
    </>
  )
}

export default NotarialActStepThreePage
