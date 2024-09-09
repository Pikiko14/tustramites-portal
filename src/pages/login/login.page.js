import { Button, Form, Input } from 'antd'
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Alert from '../../helpers/alert/Alert'
import HttpClient from '../../helpers/network/HttpClient'

// CONTEXT
import AuthContext from '../../context/AuthContext'

// COOKIE
import Cookies from 'universal-cookie'
const cookies = new Cookies()

import { FacebookIcon, GoogleIcon } from '../../components/icons/Icons'
import './scss/login.page.scss'

const Login = (props) => {
  const [ form ] = Form.useForm()
  const history = useHistory()
  const { updateUser } = useContext(AuthContext)

  const login = async (value) => {
    const response = await HttpClient.post('/api/user/login/landing', value)
      .then((res) => {
        cookies.set('token', res.data.token)
        updateUser(res.data.user)
        if (res.data.user.role !== 'CLIENTE') window.location.href = '/general'
        else 
        window.location.href = '/'
      })
      .catch((err) => {
        Alert.show({
          type: 'error',
          title: 'Error ',
          message:
            'Correo o contreseña incorrectos. Por favor verifica tus datos e intenta nuevamente.',
          btnOk: 'Aceptar',
          fnOk: () => { },
          btnCancel: 'Cancelar'
        })
      })
  }
  const handleLogin = (value) => {
    login(value)
  }

  useEffect(() => {
    localStorage.clear()
    const queryParams = new URLSearchParams(window.location.search)
    if(queryParams.get('token')){
      cookies.set('token', queryParams.get('token'))
      window.location.href = '/'
    }
  }, [])

  return (
    <div
      className="login"
      style={{ backgroundImage: 'url(/assets/images/background-login.svg)' }}
      // style={{ backgroundColor: '#9F4AF6' }}
    >
      <div className="login-content">
        <div className="login-back" />
        <div className="login-sub-content">
          <div className="login-header">
            <h3 className="title">Inicia Sesión</h3>
            <img className='image-icon' src='/assets/icon/logo-color.svg' />
          </div>
          <div className="login-panel">
            <Form layout="vertical" form={form} onFinish={handleLogin}>
              <div className="form-control">
                <Form.Item
                  name="email"
                  id="email"
                  // label="Usuario:"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingresa tu email'
                    }
                  ]}
                >
                  <Input placeholder="Correo electrónico" />
                </Form.Item>
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
                    }
                  ]}
                >
                  <Input.Password placeholder="Contraseña" />
                </Form.Item>
              </div>

              <p className="subtitle">
                ¿Olvidaste tu contraseña?
                <a onClick={() => history.push('/remember')} className="primary">
                  Haz click aquí
                </a>
              </p>
              <div className="containerButton">
                <Button htmlType="submit" className="form-action-login">
                  Inicia sesión
                </Button>
              </div>
            </Form>
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
              <span className="text">Inicia sesión con tu cuenta de Google y/o Facebook.</span>
            </div>

            <div className="notAccount">
              <p className="text">
                ¿Aún no tienes cuenta?
                <a href="/register" className="link">
                  Regístrate
                </a>
              </p>
            </div>

            {/* <div className="autor">
              <p>
                Power By
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

export default Login

/* 
<p className="subtitle">
                ¿Eres nuevo en tus trámites VIP?
                <a href="/register" className="primary">
                  Registrate
                </a>
              </p> */
