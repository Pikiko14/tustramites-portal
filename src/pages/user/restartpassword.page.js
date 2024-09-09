import React from 'react'
import { Form, Input, Button } from 'antd'
import HttpClient from '../../helpers/network/HttpClient'
import Alert from '../../helpers/alert/Alert'
import './scss/restartpassword.page.scss'
import { ArrowLeftWithoutLine, LogoTTV } from '../../components/icons/Icons'
import { useHistory } from 'react-router-dom'

// COOKIE
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const RestartPassword = (props) => {
  const [form] = Form.useForm()
  const history = useHistory()

  const validatePassword = () => {
    let password = form.getFieldValue('passwordNew')
    let password_repeat = form.getFieldValue('passwordNew2')
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

  const onFinish = async (values) => {
    let answer = validatePassword()
    if (answer === 0) {
      await HttpClient.post('/api/remember/restart/login', values)
        .then((res) => {
          console.log(res)
          Alert.show({
            type: 'success',
            title: '',
            message:
              'Tu contraseña fue actualizada con éxito. \nPor favor ingresa de nuevo, con tu nueva contraseña.',
            btnOk: 'Aceptar',
            fnOk: () => redirect(),
            btnCancel: 'Cancelar',
            buttonX: true
          })
        })
        .catch((err) => {
          Alert.show({
            type: 'error',
            title: '',
            message:
              'La contraseña actual que ingresaste no coincide con la que tenemos almacenada.\nPor favor valida tu información y vuelve a intentar.',
            btnOk: 'Aceptar',
            fnOk: () => {},
            btnCancel: 'Cancelar',
            buttonX: true
          })
        })
    } else {
      let message = ''
      if (answer == 1) message = 'Tus nuevas contraseñas no coinciden, vuelve a intentar'
      else
        message =
          'Tu nueva contraseña parece no ser del todo segura.\nPara crear una contraseña segura, te recomendamos incluir números, símbolos y letras mayúsculas y minúsculas'

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
  const redirect = () => {
    cookies.remove('token')
    window.location.href = '/login'
  }

  return (
    <div
      className="restart"
      style={{ backgroundImage: 'url(/assets/images/background-login.svg)' }}
    >
      <div className="restart-content">
        <div className="register-back" onClick={() => history.push('/')}>
          <ArrowLeftWithoutLine />
        </div>
        <div className="login-sub-content">
          <div className="login-header">
            <h3 className="title">Reestablecer contraseña</h3>
            {/* <LogoTTV /> */}
            <img className='image-icon' src='/assets/icon/logo-color.svg' />
          </div>
          <div className="login-panel">
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <p className="subtitle">Ingresa los datos solicitados</p>
              <div className="form-control">
                <Form.Item
                  name="password"
                  id="password"
                  label="Contraseña actual:"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingresa tu contraseña actual'
                    },
                    {
                      min: 8,
                      message: 'Tu contraseña debe tener mínimo 8 caracteres'
                    },
                    {
                      max: 15,
                      message: 'Tu contraseña debe tener máximo 15 caracteres'
                    }
                  ]}
                >
                  <Input.Password type="password" placeholder="Contraseña actual" />
                </Form.Item>

                <Form.Item
                  name="passwordNew"
                  id="passwordNew"
                  label="Nueva contraseña:"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingresa tu nueva contraseña'
                    },
                    {
                      min: 8,
                      message: 'Tu nueva contraseña debe tener mínimo 8 caracteres'
                    },
                    {
                      max: 15,
                      message: 'Tu contraseña debe tener máximo 15 caracteres'
                    }
                  ]}
                >
                  <Input.Password type="password" placeholder="Nueva contraseña" />
                </Form.Item>

                <Form.Item
                  name="passwordNew2"
                  id="passwordNew2"
                  label="Repite tu nueva contraseña:"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingresa tu nueva contraseña!'
                    },
                    {
                      min: 8,
                      message: 'Tu nueva contraseña debe tener mínimo 8 caracteres'
                    },
                    {
                      max: 15,
                      message: 'Tu contraseña debe tener máximo 15 caracteres'
                    }
                  ]}
                >
                  <Input.Password type="password" placeholder="Repite tu contraseña" />
                </Form.Item>
                <div className="containerButton">
                  <Button className="form-action-login" htmlType="submit">
                    Guardar
                  </Button>
                </div>
              </div>
            </Form>

            {/*<div className="autor">
                            <p>Power By <img src="/assets/images/tingenio.png" alt="/assets/images/tingenio.png"></img></p>
                            <p>&copy; Todos los derechos reservados.</p>
                            <p>Colombia 2021</p>
                        </div>*/}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestartPassword
