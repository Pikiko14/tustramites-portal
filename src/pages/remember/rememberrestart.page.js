import React from 'react'
import { Form, Input, Button } from 'antd'
import HttpClient from '../../helpers/network/HttpClient'
import Alert from '../../helpers/alert/Alert'
import queryString from 'query-string'
import axios from 'axios'
import { LogoTTV } from '../../components/icons/Icons'
import './scss/rememberrestart.page.scss'

const Remember = (props) => {
  const [form] = Form.useForm()

  const validatePassword = () => {
    let password = form.getFieldValue('password')
    let password_repeat = form.getFieldValue('password2')
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

  const handleRemember = async (values) => {
    let answer = validatePassword()
    if (answer === 0) {
      let { id } = queryString.parse(props.location.search)
      const headers = {
        Authorization: 'Bearer ' + id
      }
      //console.log(headers)
      await axios
        .post(
          process.env.REACT_APP_URL_API + '/api/remember/restart',
          {
            password: values.password
          },
          { headers }
        )
        .then((response) => showAlert(response))
        .catch((error) => {
          console.error('There was an error!', error)
        })
    } else {
      let message = ''
      if (answer == 1) message = 'Tus nuevas contraseñas no coinciden, vuelve a intentar'
      else
        message =
          'Tu nueva contraseña parece no ser del todo segura. Para crear una contraseña segura, te recomendamos incluir números, símbolos y letras mayúsculas y minúsculas'

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

  const showAlert = (response) => {
    if (response.status == 200) {
      Alert.show({
        type: 'success',
        title: '¡Exito!',
        message: 'Tu contraseña se ha guardado, ya puedes ingresar de nuevo a nuestra plataforma.',
        btnOk: 'Aceptar',
        fnOk: () => redirect(),
        btnCancel: 'Cancelar'
      })
    } else {
      Alert.show({
        type: 'error',
        title: '¡Error!',
        message:
          'No se ha podido guardar tu nueva contraseña, por favor realiza de nuevo el proceso.',
        btnOk: 'Aceptar',
        fnOk: () => redirect(),
        btnCancel: 'Cancelar'
      })
    }
  }

  const redirect = () => {
    window.location.href = '/login'
  }

  return (
    <div
      className="restart"
      style={{ backgroundImage: 'url(/assets/images/background-login.svg)' }}
    >
      <div className="restart-content">
        <div className="login-sub-content">
          <div className="login-header">
            <h3 className="title">Reestablecer contraseña</h3>
            <LogoTTV />
          </div>
          <div className="login-panel">
            <Form layout="vertical" form={form} onFinish={handleRemember}>
              <p className="subtitle">Ingresa tu nueva contraseña</p>
              <div className="form-control">
                <Form.Item
                  name="password"
                  id="password"
                  label="Nueva contraseña:"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Por favor ingresa tu nueva contraseña'
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
                  <Input.Password Input type="password" placeholder="Nueva contraseña" />
                </Form.Item>
              </div>

              <div className="form-control">
                <Form.Item
                  name="password2"
                  id="password2"
                  label="Repite tu contraseña:"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Por favor repite tu nueva contraseña'
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
                  <Input.Password type="password" placeholder="Repite tu contraseña" />
                </Form.Item>
              </div>

              <div className="containerButton">
                <Button htmlType="submit" className="form-action-login">
                  Guardar
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Remember
