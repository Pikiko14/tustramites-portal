import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Form, Select, Radio } from 'antd'
import HttpClient from '../../helpers/network/HttpClient'
import queryString from 'query-string'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import Alert from '../../helpers/alert/Alert'
import NewProcedure from '../../components/layout/components/NewProcedure'

// RESOURCE
import json_location from '../../json/states-cities.json'
import { CaretDownOutlined, SaveOutlined } from '@ant-design/icons'

import './scss/notarialact-step-three.page.scss'

const NotarialActStepThreePage = (props) => {
  const [showLabelSelected, setShowLabelSelected] = useState()
  const [notarialact, setNotarialact] = useState()
  const [procedureNotarial, setProcedureNotarial] = useState()
  const [loader, setLoader] = useState(false)
  const [cities, setCities] = useState([])
  const [notaries, setNotaries] = useState([])
  const [provinceSelected, setProvinceSelected] = useState()
  const [citySelected, setCitySelected] = useState()
  const [form] = Form.useForm()
  const [step, setstep] = useState(3)
  const [notarySelected, setNotarySelected] = useState()
  const [category, setCategory] = useState()

  const loadData = async () => {
    let { p } = queryString.parse(props.location.search)

    const response2 = await HttpClient.get('/api/procedurenotarial/one/' + p)

    if (response2.status == 200) {
      setProcedureNotarial(response2.data)
      setNotarialact(response2.data.notarialAct)
      loadCategory(response2.data.notarialAct.category)
      if (response2.data.notarialAct.form) {
        setstep(3)
      } else {
        setstep(2)
      }
    }
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

  const handleChangeProvince = async (value) => {
    setNotaries([])
    const state = json_location.find((x) => x.state === value)
    setCities(state.cities)
    setProvinceSelected(value)
    setCitySelected()
    form.resetFields(['city'])
    form.resetFields(['sector'])

    const response = await HttpClient.get('/api/notary?province=' + value)
    var notariesAux = []
    if (response.status === 200) {
      response.data.forEach((element) => {
        let schedule = ''
        element.schedule.schedules.forEach((item) => {
          schedule += setDays(item) + ' ' + item.startHour + ' - ' + item.endHour + '\n'
        })

        element.schedule = schedule
        notariesAux.push(element)
        if (notariesAux.length > 0) {
          setShowLabelSelected(true)
        }
      })
      setNotaries(notariesAux)
    }
  }

  const handleChangeCity = async (value) => {
    setNotaries([])
    setCitySelected(value)
    form.resetFields(['sector'])
    const response = await HttpClient.get(
      '/api/notary?province=' + provinceSelected + '&&city=' + value
    )

    var notariesAux = []
    if (response.status === 200) {
      response.data.forEach((element) => {
        let schedule = ''
        element.schedule.schedules.forEach((item) => {
          schedule += setDays(item) + ' ' + item.startHour + ' - ' + item.endHour + '\n'
        })

        element.schedule = schedule
        notariesAux.push(element)
      })

      setNotaries(notariesAux)
    }
  }

  const handleChangeSector = async (value) => {
    setNotaries([])
    const response = await HttpClient.get(
      '/api/notary?province=' + provinceSelected + '&&city=' + citySelected + '&&sector=' + value
    )

    var notariesAux = []
    if (response.status === 200) {
      response.data.forEach((element) => {
        let schedule = ''
        element.schedule.schedules.forEach((item) => {
          schedule += setDays(item) + ' ' + item.startHour + ' - ' + item.endHour + '\n'
        })

        element.schedule = schedule
        notariesAux.push(element)
      })

      setNotaries(notariesAux)
    }
  }

  const onFinish = (values) => {
    if (notarySelected) {
      HttpClient.put('/api/procedurenotarial/' + procedureNotarial._id, {
        notarialAct: notarialact._id,
        actors: procedureNotarial.actors ? procedureNotarial.actors : undefined,
        user: procedureNotarial.user._id,
        documents: procedureNotarial.documents,
        state: '4',
        notary: notarySelected._id
      }).then((res) => {
        props.history.push(
          '/notarialactstepfour?id=' + notarialact._id + '&p=' + procedureNotarial._id
        )
        form.resetFields()
      })
    } else {
      Alert.show({
        type: 'error',
        title: '',
        message: `Para poder continuar, por favor selecciona la Notaría en donde deseas realizar tu trámite`,
        btnOk: 'Aceptar',
        fnOk: () => {
          console.log('ok')
        },
        btnCancel: 'Cancelar',
        buttonX: true
      })
    }
  }

  const saveOut = () => {
    if (notarySelected) {
      HttpClient.put('/api/procedurenotarial/' + procedureNotarial._id, {
        notarialAct: notarialact._id,
        actors: procedureNotarial.actors ? procedureNotarial.actors : undefined,
        user: procedureNotarial.user._id,
        documents: procedureNotarial.documents,
        state: '4',
        notary: notarySelected._id
      }).then((res) => {
        alertShow()
        form.resetFields()
      })
    } else {
      /*Alert.show({
        type: 'error',
        title: 'Seleccione una notaria',
        message: `Por favor selecciona la Notaria, para poder continuar.`,
        btnOk: 'Aceptar',
        fnOk: () => {
          console.log('ok')
        },
        btnCancel: 'Cancelar'
      })*/

      Alert.show({
        type: 'warning',
        title: '',
        message: `Toda la información que has ingresado hasta este punto quedará guardada para que puedas continuar después. Si necesitas ayuda no dudes en contactarnos.\n¿Segur@ que deseas guardar y salir?`,
        btnOk: 'Confirmar',
        fnOk: () => {
          alertShow()
        },
        btnCancel: 'Cancelar',
        buttonX: true
      })
    }
  }

  const alertShow = () => {
    Alert.show({
      type: 'warning',
      title: '¡Tú trámite ha sido guardado!',
      message: `Para completar tu solicitud, podrás ir a la opción del menú Mis trámites, seleccionar el botón Ver de este trámite y así podrás continuar justo en donde lo dejaste.\nRecuerda que tienes 10 días para completarlo. Después de este tiempo, tu trámite será eliminado.\n\nSi tienes alguna duda, activa la ayuda y podrás chatear con nosotros o si deseas podemos llamarte. 
      `,
      btnOk: 'Aceptar',
      fnOk: () => {
        props.history.push('/')
      },
      btnCancel: 'Cancelar',
      buttonX: true
    })
  }

  const alertShow2 = () => {
    Alert.show({
      type: 'success',
      title: '¡Tú trámite ha sido guardado!',
      message: `Si tienes alguna duda, activa la ayuda y podrás chatear con nosotros o si deseas podemos llamarte. 
                      Recuerda que tienes un mes para completar tu solicitud de trámite. Después de este tiempo, tu trámite será eliminado. 
                      Botón Aceptar.`,
      btnOk: 'Aceptar',
      fnOk: () => {
        props.history.push('/procedurenotarial')
      },
      btnCancel: 'Cancelar'
    })
  }

  const onChange = (notary) => {
    setNotarySelected(notary)
  }

  const setChecked = (id) => {
    if (notarySelected) {
      if (notarySelected._id === id) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  const onFinishFailed = (errorInfo) => {
    Alert.show({
      type: 'error',
      title: 'Diligencia adecuadamente el formulario',
      message: `Hay campos que son obligatorios y no han sido diligenciados.`,
      btnOk: 'Aceptar',
      fnOk: () => {
        console.log('ok')
      },
      btnCancel: 'Cancelar'
    })
  }

  const loadCategory = (id) => {
    HttpClient.get('/api/category/' + id).then((res) => {
      setCategory(res.data)
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
      visible={true}
      hasHeaderProfile={true}
      classNameMain="notarialStepThree"
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
                <h2 className="titleIngresarInfo">Selecciona la Notaria</h2><br />
              </div>
              <span className="selected-place">
                Elige el lugar donde quieres hacer tu tramite.
              </span>
            </Col>
          </Row>
          <br /><br /><br />
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Row>
              <div
                className="info-user"
                style={{ backgroundImage: 'url(/assets/images/fondonotaria.png)' }}
              >
                <Row>
                  <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <h2 className="titleNotariaCercana">Selecciona la Notaría más cercana</h2>
                  </Col>
                  <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                  <Row  gutter={[0, 32]}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="containerSelects">
                      <Form.Item name="country" id="country" className="selectNotariaCercana">
                        <Select
                          className="selectNotaria"
                          placeholder="País"
                          allowClear
                          suffixIcon={<CaretDownOutlined />}
                          defaultValue="Ecuador"
                        >
                          <option value="Ecuador" className="optionStepThree">
                            Ecuador
                          </option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="containerSelects">
                      <Form.Item className="selectNotariaCercana" name="province" id="province">
                        <Select
                          className="selectNotaria"
                          placeholder="Provincia"
                          onChange={handleChangeProvince}
                          allowClear
                          suffixIcon={<CaretDownOutlined />}
                        >
                          {json_location.map((province, i) => (
                            <option key={i} value={province.state} className="optionStepThree">
                              {province.state}
                            </option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="containerSelects">
                      <Form.Item className="selectNotariaCercana" name="city" id="city">
                        <Select
                          className="selectNotaria"
                          placeholder="Ciudad"
                          onChange={handleChangeCity}
                          allowClear
                          suffixIcon={<CaretDownOutlined />}
                        >
                          {cities.map((city, i) => (
                            <option key={i} value={city} className="optionStepThree">
                              {city}
                            </option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="containerSelects">
                      <Form.Item className="selectNotariaCercana" name="sector" id="sector">
                        <Select
                          className="selectNotaria"
                          placeholder="Sector"
                          onChange={handleChangeSector}
                          allowClear
                          suffixIcon={<CaretDownOutlined />}
                        >
                          <option key="NORTE" value="NORTE" className="optionStepThree">
                            Norte
                          </option>
                          <option key="CENTRO" value="CENTRO" className="optionStepThree">
                            Centro
                          </option>
                          <option key="SUR" value="SUR" className="optionStepThree">
                            Sur
                          </option>
                        </Select>
                      </Form.Item>
                    </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Row>

            <Row style={{ flexDirection: 'column' }}>
              <br />
              { showLabelSelected && <h2 className="title-indicaciones">Tus Notarías cercanas son: </h2> }
              <Row className="containerNotaries">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  {
                    (showLabelSelected && (
                      <>
                      <img src="/assets/images/map.png" alt="Map section" className="map-section" />
                      </>
                    ))
                  }
                </Col>
              </Row>
              <Row className="containerNotaries">
                {notaries.map((notary, i) => (
                  <>
                    {/* <Col xs={23} sm={23} md={11} lg={11} xl={11} key={i} className="bordeBottom"> */}
                    <Form.Item name="notary" id="notary" key={i}>
                      <div className="contentNotarias">
                        <h3 className="colorGray sinMargen fuenteBold displayFlex">
                          {notary.name}
                          <Form.Item className="radioBtn" name={notary._id} id={notary._id} key={i}>
                            <Radio
                              onChange={() => {
                                onChange(notary)
                              }}
                              checked={setChecked(notary._id)}
                            />
                          </Form.Item>
                        </h3>
                        <p className="colorGray">{notary.address}</p>
                        <p className="colorGray sinMargen">Horario de atención:</p>
                        <p className="colorGray sinMargen">{notary.schedule}</p>
                      </div>
                    </Form.Item>
                    {/* </Col> */}

                    {/* <Col
                        span={1}
                        key={i}
                        className={i % 2 == 0 ? 'borderRigth bordeBottom' : 'bordeBottom'}
                      ></Col> */}
                  </>
                ))}
              </Row>
            </Row>
            <div className="containerButtonFinished">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="button"
                  className="btnSave"
                  icon={<SaveOutlined />}
                  onClick={() => saveOut()}
                >
                  Guardar y salir
                </Button>

                <Button type="primary" htmlType="submit" className="btnContinuar">
                  Continuar
                </Button>
              </Form.Item>
            </div>
          </Form>
        </>
      ) : null}
    </Layout>
  )
}

export default NotarialActStepThreePage
