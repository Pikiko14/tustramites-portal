import React, { useEffect, useContext, useState } from 'react'
import { Form, Input, Checkbox, Select, notification, Button } from 'antd'

import { Context } from '../../../context/store'
import PTYDDialog from '../../../pages/home/components/PYTDDialog'
import HttpClient from '../../../helpers/network/HttpClient'
import Alert from '../../../helpers/alert/Alert'

import { CaretDownOutlined, CloseOutlined } from '@ant-design/icons'
import AuthContext from '../../../context/AuthContext'

import '../scss/call-me.scss'

const { Option } = Select

const CallMe = () => {
  const { user } = useContext(AuthContext)
  const [page, setPage] = useState()
  const [pages, setPages] = useState([])
  const [pytdDialog, setPytdDialog] = useState()
  const [checked, setChecked] = useState(false)

  const { dispatch } = useContext(Context)
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    if (checked) {
      const response = await fetch(process.env.REACT_APP_URL_API + '/api/callme', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(values)
      })

      if (response.ok) {
        form.resetFields()

        dispatch({
          type: 'CALL_ME',
          payload: false
        })

        Alert.show({
          type: 'success',
          title: 'Solicitud Exitosa',
          message: 'Se ha enviado tu solicitud de llamada.',
          btnOk: 'Aceptar',
          fnOk: () => { },
          btnCancel: 'Cancelar',
          buttonX: true
        })
      } else {
        Alert.show({
          type: 'error',
          title: '¡Ups!',
          message: 'Error al enviar tu solicitud de llamada',
          btnOk: 'Aceptar',
          fnOk: () => { },
          btnCancel: 'Cancelar',
          buttonX: true
        })
      }
    } else {
      Alert.show({
        type: 'error',
        title: '',
        message: 'Por favor acepta la política de privacidad',
        btnOk: 'Aceptar',
        fnOk: () => { },
        btnCancel: 'Cancelar',
        buttonX: true
      })
    }
  }

  const loadPages = async () => {
    const response = await HttpClient.get('/api/page')
    if (response.status === 200) {
      setPages(response.data)
    }
  }

  const openPYTD = () => {
    setPage(pages.find((x) => x.url === 'politica-privacidad'))
    setPytdDialog(pages.find((x) => x.url === 'politica-privacidad'))
  }

  const loadValues = () => {
    let data = {
      name: `${user.first_name || ''} ${user.last_name || ''}`,
      email: user.email,
      phone: '',
      schedule: 'Cualquier horario',
      message: ''
    }
    form.setFieldsValue(data)
  }

  const callback = (value) => {
    setChecked(value)
  }

  function onChange(e) {
    setChecked(e.target.checked)
  }

  useEffect(() => {
    loadPages()
    loadValues()
  }, [])

  return (
    <>
      <PTYDDialog page={page} data={pytdDialog} setData={setPytdDialog} callback={callback} />
      <div className="call-me">
        <div
          className="call-me-header"
          style={{ backgroundImage: 'url(/assets/images/fondoperfil.jpeg)' }}
        >
          <h6>Nosotros te llamamos</h6>
          {/* <CloseOutlined
            onClick={() =>
              dispatch({
                type: 'CALL_ME',
                payload: false
              })
            }
          /> */}
        </div>
        <div className="call-me-content">
          <div className="containerDescriptions">
            <p>Bienvenid@</p>
            <p>
              Nuestro horario de atención es de 8:00 a 17:00. Por favor déjanos tus datos y en el
              menor tiempo posible te estaremos contactando.
            </p>
          </div>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="name"
              // label="Nombre Completo"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa tu nombre'
                },
                {
                  min: 3,
                  message: 'Tu nombre debe tener mínimo 3 caracteres'
                },
                {
                  max: 50,
                  message: 'Tu nombre debe tener máximo 50 caracteres'
                }
              ]}
            >
              <Input type="text" placeholder="Nombre Completo" />
            </Form.Item>
            <div className="form-control">
              <Form.Item
                name="email"
                // label="Correo electrónico"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa tu correo electrónico'
                  },
                  {
                    type: 'email',
                    message: 'El email que ingresaste no es válido'
                  }
                ]}
              >
                <Input type="email" placeholder="Correo electrónico" />
              </Form.Item>

              <Form.Item
                name="phone"
                // label="Celular"
                rules={[
                  {
                    required: true,
                    message: 'Por favor ingresa tu número celular'
                  },
                  {
                    min: 8,
                    message: 'Tu número celular debe tener mínimo 8 dígitos'
                  }
                ]}
              >
                <Input type="number" placeholder="Celular" />
              </Form.Item>
            </div>

            <div className="containerDescriptions">
              <p>¿En qué horario prefieres que te llamemos?</p>
            </div>
            <Form.Item
              name="schedule"
              // label="¿En qué horario deberíamos llamarte?"
              rules={[
                {
                  required: true,
                  message: 'Por favor seleciona una opción'
                }
              ]}
            >
              <Select
                placeholder="¿En qué horario deberíamos llamarte?"
                suffixIcon={<CaretDownOutlined />}
              >
                <Option value="Cualquier horario" className="optionCallMe">
                  Cualquier horario
                </Option>
                <Option value="Mañana" className="optionCallMe">
                  Mañana
                </Option>
                <Option value="Tarde" className="optionCallMe">
                  Tarde
                </Option>
                <Option value="Noche" className="optionCallMe">
                  Noche
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="message"
              // label="¿Cuéntanos brevemente tu inquietud?"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa tu mensaje o solicitud'
                },
                {
                  min: 5,
                  message: 'Tu mensaje o solicitud debe tener mínimo 5 caracteres'
                },
                {
                  max: 300,
                  message: 'Tu mensaje o solicitud debe tener máximo 300 caracteres'
                }
              ]}
            >
              <Input.TextArea
                autoSize={{ maxRows: 3, minRows: 3 }}
                rows={3}
                placeholder="Describe brevemente tu inquietud"
              />
            </Form.Item>

            <div className="form-footer">
              <Form.Item
                name="polity"
                //valuePropName="checked"
                // label=""
                className="containerCheck"
              /*rules={[
              {
                required: true,
                message: 'Por favor acepta la política de privacidad'
              }
            ]}*/
              >
                <Checkbox onChange={onChange} checked={checked} />
                <span className="text" onClick={() => openPYTD()}>
                  He leído y acepto la política de privacidad
                </span>
              </Form.Item>
              <div className="containerButtons">
                <Button
                  className="btnContinuar"
                  onClick={() =>
                    dispatch({
                      type: 'CALL_ME',
                      payload: false
                    })
                  }
                >
                  Cancelar
                </Button>
                <Button htmlType="submit" className="btnSave">
                  Enviar
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default CallMe
