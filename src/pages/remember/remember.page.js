import React from 'react'
import { Form, Input, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import HttpClient from '../../helpers/network/HttpClient'
import Alert from '../../helpers/alert/Alert'

import './scss/remember.page.scss'
import { ArrowLeftWithoutLine, LogoTTV } from '../../components/icons/Icons'

const Remember = () => {
  const [form] = Form.useForm()
  const history = useHistory()

  const handleRemember = async () => {
    HttpClient.post('/api/remember', { email: form.getFieldValue('email') })
      .then((res) => {
        Alert.show({
          type: 'success',
          title: '¡Información enviada! ',
          message:
            'Por favor ingresa a tu correo y sigue las indicaciones para que puedas crear tu nueva contraseña.',
          btnOk: 'Aceptar',
          fnOk: () => history.push('/login'),
          btnCancel: 'Cancelar'
        })
      })
      .catch((res) => {
        Alert.show({
          type: 'error',
          title: 'Error ',
          message: 'Este email no corresponde a una cuenta existente.',
          btnOk: 'Aceptar',
          fnOk: () => {},
          btnCancel: 'Cancelar'
        })
      })
  }

  return (
    <div
      className="remember"
      style={{ backgroundImage: 'url(/assets/images/background-login.svg)' }}
      // style={{ backgroundColor: '#9F4AF6' }}
    >
      <div className="remember-content">
        <div className="register-back" onClick={() => history.push('/login')}>
          <ArrowLeftWithoutLine />
        </div>
        <div className="login-back" />
        <div className="login-sub-content">
          <div className="login-header">
            <h3 className="title">Nueva contraseña</h3>
            {/* <LogoTTV /> */}
            <img className="image-icon" src="/assets/icon/logo-color.svg" />
          </div>
          <div className="login-panel">
            <Form layout="vertical" form={form}>
              <p className="subtitle">Ingresa tu correo electrónico y sigue las instrucciones:</p>
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
                  <Input type="email" placeholder="Correo electrónico" />
                </Form.Item>
                <Button className="form-action-send" onClick={handleRemember}>
                  Enviar
                </Button>
              </div>

              {/* <div className="separator">
                <span className="line" />
                <span className="text">O</span>
                <span className="line" />
              </div>

              <p className="subtitle">Ingresa tu número móvil e ingresa o el código:</p>

              <div className="form-control">
                <Form.Item
                  name="phone"
                  id="phone"
                  // label="Email:"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingresa tu número de celular!'
                    }
                  ]}
                >
                  <Input type="number" placeholder="+57 3005593515" />
                </Form.Item>
                <Button className="form-action-send">Enviar</Button>
              </div> */}

              {/* <div>
                <Button htmlType="submit" className="form-action-login">
                  Reestablecer
                </Button>
              </div> */}
              <div className="containerButton" onClick={() => history.push('/login')}>
                <Button className="form-action-login">Regresar</Button>
              </div>
            </Form>

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

export default Remember
