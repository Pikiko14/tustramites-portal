import React, { useEffect, useContext, useState } from 'react'
import { Form, Button } from 'antd'
import httpClient from '../../../helpers/network/HttpClient'

import { Context } from '../../../context/store'
import AuthContext from '../../../context/AuthContext'

import '../scss/call-me.scss'

const CallUs = () => {
  const { user } = useContext(AuthContext)
  const { dispatch } = useContext(Context)
  const [form] = Form.useForm()
  const [isMobile, setIsMobile] = useState(false)
  const [phone, setPhone] = useState('')

  const loadPhone = async () => {
    const response = await httpClient.get('/api/aditional/search/phone')
    if (response.status === 200) {
      setPhone(response.data)
    }
  }

  useEffect(() => {
    loadPhone()

    const userAgent = navigator.userAgent
    setIsMobile(/Mobi|Android/i.test(userAgent))
  }, [])

  return (
    <>
      <div className="call-me">
        <div
          className="call-me-header"
          style={{ backgroundImage: 'url(/assets/images/fondoperfil.jpeg)' }}
        >
          <h6>Llámanos</h6>
        </div>
        <div className="call-me-content">
          <div className="containerDescriptions">
            <p>Bienvenid@</p>
            <p>
              Nuestro horario de atención es de 8:00 a 17:00. A continuación te dejamos nuestro teléfono.
            </p>
          </div>

          <Form form={form} layout="vertical">

            <div className="form-footer">
              <Form.Item
                name="polity"
                className="containerCheck"
              >
                <span>
                  {phone}
                </span>
              </Form.Item>
              <div className="containerButtons">
                <Button
                  className="btnContinuar"
                  onClick={() =>
                    dispatch({
                      type: 'CALL_US',
                      payload: false
                    })
                  }
                >
                  Cerrar
                </Button>
                {isMobile ?
                  <Button className="btnSave" >
                    <a href={`tel:${phone}`}>
                      Llamar
                    </a>
                  </Button>
                  : null}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default CallUs
