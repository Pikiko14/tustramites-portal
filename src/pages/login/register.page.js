import React, { useContext, useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Radio } from 'antd'
import { useHistory } from 'react-router-dom'
import HttpClient from '../../helpers/network/HttpClient'
import Alert from '../../helpers/alert/Alert'

// CONTEXT
import AuthContext from '../../context/AuthContext'

import './scss/register.page.scss'

// COOKIE
import Cookies from 'universal-cookie'
import { InputNumber } from 'antd'
import { ArrowLeftWithoutLine, FacebookIcon, GoogleIcon } from '../../components/icons/Icons'
const cookies = new Cookies()

const Register = (props) => {
  const [form] = Form.useForm()
  const history = useHistory()
  const { updateUser } = useContext(AuthContext)
  const [fieldEnterprise, setFieldEnterprise] = useState(false)

  const validatePassword = () => {
    let password = form.getFieldValue('password')
    let password_repeat = form.getFieldValue('password_repeat')
    if (password !== password_repeat) {
      return 1
    }

    let regexPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$%^&*()\-_=+{}[\]:;<>|./?])[A-Za-z\d@!$%^&*()\-_=+{}[\]:;<>|./?]{8,}$/
    if (!regexPattern.test(password)) {
      return 2
    }

    return 0
  }

  const register = async (value) => {
    let answer = validatePassword()
    if (answer === 0) {
      const formData = new FormData()
      formData.append(
        'user',
        JSON.stringify({
          first_name: form.getFieldValue('first_name'),
          last_name: form.getFieldValue('last_name'),
          email: form.getFieldValue('email'),
          password: form.getFieldValue('password'),
          role: 'CLIENTE',
          url_image: '',
          enterprise: form.getFieldValue('enterprise'),
          phone: form.getFieldValue('phone')
        })
      )

      HttpClient.post('/api/user', formData)
        .then((res) => {
          //cookies.set('token', res.data.token)
          //updateUser(res.data.user)
          Alert.show({
            type: 'error',
            title: '',
            message: 'Tu cuenta fue creada con éxito.Te invitamos a iniciar sesión.',
            btnOk: 'Aceptar',
            fnOk: () => {
              window.location.href = '/login'
            },
            btnCancel: 'Cancelar'
          })
        })
        .catch((res) => {
          Alert.show({
            type: 'error',
            title: '¡Ups!',
            message: 'Este correo ya se encuentra registrado.Te invitamos a iniciar sesión.',
            btnOk: 'Aceptar',
            fnOk: () => {},
            btnCancel: 'Cancelar'
          })
        })
    } else {
      let message = ''
      if (answer == 1) message = 'Tus contraseñas no coinciden, vuelve a intentar'
      else
        message =
          'Tu contraseña parece no ser del todo segura. Para crear una contraseña segura, te recomendamos incluir números, símbolos y letras mayúsculas y minúsculas'

      Alert.show({
        type: 'error',
        title: 'Error ',
        message: message,
        btnOk: 'Aceptar',
        fnOk: () => {},
        btnCancel: 'Cancelar'
      })
    }
  }

  const handleRegister = (value) => {
    register(value)
  }

  const onchangeRadio = () => {
    if (form.getFieldValue('enterprise_check') == 1) {
      setFieldEnterprise(true)
    } else {
      setFieldEnterprise(false)
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    if(queryParams.get('token')){
      cookies.set('token', queryParams.get('token'))
      window.location.href = '/'
    }
  }, [])

  return (
    <div
      className="register"
      style={{ backgroundImage: 'url(/assets/images/background-main.png)' }}
      // style={{ backgroundColor: '#9F4AF6' }}
    >
      <div className="register-image">
        <div className={`containerLogo ${window.screen.height <= 685 && window.screen.width <= 545 ? 'hidden' : ''}`}>
          <img src="/assets/icon/logo-color.svg" />
        </div>
        <img src="/assets/images/sitting-human.svg" />
      </div>
      <div className="register-content">
        <div className="register-back" onClick={() => history.push('/login')}>
          <ArrowLeftWithoutLine />
        </div>

        <div className="register-sub-content">
          <div className={`register-panel ${window.screen.height < 900 ? 'small' : ''}`}>
            <Form layout="vertical" form={form} onFinish={handleRegister}>
              <div className="containerImage">
                <img
                  className={`image ${window.screen.width <= 545 ? 'show' : 'hidden'}`}
                  src="/assets/icon/logo-color.svg"
                />
              </div>

              <h3 className="title">Crea tu cuenta</h3>

              <div className="form-control row">
                <Form.Item
                  // label="Nombre(s)"
                  name="first_name"
                  id="first_name"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingresa tu nombre'
                    },
                    {
                      min: 3,
                      message: 'Tu nombre debe tener mínimo 3 caracteres'
                    }
                  ]}
                >
                  <Input placeholder="Nombres" />
                </Form.Item>
                <Form.Item
                  // label="Apellidos"
                  name="last_name"
                  id="last_name"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingresa tu apellido'
                    },
                    {
                      min: 3,
                      message: 'Tu apellido debe tener mínimo 3 caracteres'
                    }
                  ]}
                >
                  <Input placeholder="Apellidos" />
                </Form.Item>
              </div>

              <div className="form-control">
                <Form.Item
                  name="email"
                  id="email"
                  // label="Email:"
                  hasFeedback
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
                >
                  <Input placeholder="Correo electrónico" />
                </Form.Item>
              </div>

              <div className="recomendation">
                ✓ Para crear una contraseña segura, te recomendamos incluir números, símbolos y
                letras mayúsculas y minúsculas.
              </div>

              <div className="form-control">
                <Form.Item
                  name="password"
                  id="password"
                  // label="Contraseña:"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingresa tu contraseña'
                    },
                    {
                      min: 8,
                      message: 'Tu contraseña debe tener mínimo 8 caracteres'
                    },
                    {
                      max: 15,
                      message: 'Tu contraseña debe tener maximo 15 caracteres'
                    }
                  ]}
                >
                  <Input.Password placeholder="Contraseña" />
                </Form.Item>
              </div>

              <div className="form-control">
                <Form.Item
                  name="password_repeat"
                  id="password_repeat"
                  // label="Repita Contraseña:"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingresa tu contraseña'
                    },
                    {
                      min: 8,
                      message: 'Tu contraseña debe tener mínimo 8 caracteres'
                    },
                    {
                      max: 15,
                      message: 'Tu contraseña debe tener maximo 15 caracteres'
                    }
                  ]}
                >
                  <Input.Password placeholder="Confirma tu contraseña" />
                </Form.Item>
              </div>

              <div className="form-control">
                <Form.Item
                  name="phone"
                  id="phone"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingresa tu número móvil'
                    },
                    {
                      min: 7,
                      message: 'Tu número móvil debe tener mínimo 7 caracteres'
                    },
                    {
                      max: 15,
                      message: 'Tu número móvil debe tener máximo 15 caracteres'
                    }
                  ]}
                >
                  <Input type="number" controls={false} placeholder="Número móvil" />
                </Form.Item>
              </div>

              <div className="recomendation">
                ¿Necesitas crear esta cuenta para los trámites de tu empresa?
              </div>

              <div className="form-control">
                <div className="radio-butom">
                  <Form.Item name="enterprise_check" id="enterprise_check">
                    <Radio.Group onChange={onchangeRadio}>
                      <Radio value={1}>Si</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
              {fieldEnterprise && (
                <div className="form-control">
                  <Form.Item
                    name="enterprise"
                    id="enterprise"
                    // label="Repita Contraseña:"
                    hasFeedback
                  >
                    <Input placeholder="Nombre de tu empresa" />
                  </Form.Item>
                </div>
              )}

              {/*<div className="form-control">
                <Form.Item name="enterprise" id="enterprise">
                  <Input placeholder="Nombre de tu empresa" />
                </Form.Item>
                </div>*/}

              <Button htmlType="submit" className="form-action-login">
                Regístrate
              </Button>
            </Form>

            {/* <div className="separator"></div> */}

            <div className="content-btn">
              <div className="content-btn-list">
                <a className="btn-goo" href={process.env.REACT_APP_URL_API + '/api/auth/google'}>
                  {/* <img className="icon" src="/assets/icon/google.svg" alt="/assets/icon/google.svg" /> */}
                  <GoogleIcon />
                </a>
                <a className="btn-goo" href={process.env.REACT_APP_URL_API + '/api/auth/facebook'}>
                  {/* <img
                    className="icon"
                    src="/assets/icon/facebook.svg"
                    alt="/assets/icon/facebook.svg"
                  /> */}
                  <FacebookIcon />
                </a>
              </div>
              <span className="text">Regístrate con tu cuenta de Google y Facebook.</span>
            </div>

            {/* <div className="autor">
              <p>
                Power By{' '}
                <img src="/assets/images/tingenio.png" alt="/assets/images/tingenio.png"></img>
              </p>
              <p>&copy; Todos los derechos reservados.</p>
              <p>Colombia 2021</p>
            </div> */}
          </div>
          <br></br>
        </div>
      </div>
    </div>
  )
}

export default Register
