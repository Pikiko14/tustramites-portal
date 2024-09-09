import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'

// COMPONENTS
import Layout from '../../components/layout/Layout'

import {
  LogoTTVAloneIcon
} from '../../components/icons/Icons'
import './scss/home.page.scss'

const HomePage = (props) => {
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])

  return (
    <>
      <Layout loader={loader}>
        <div className="contentHome">

          <Row className="containerIndication">
            <Col xs={24} sm={24} md={8} lg={8} xl={8} className="containerIndication-titles">
              <h1 className="title-indicaciones">¡Ahorra tiempo, empieza ahora!</h1>
            </Col>
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
              <ul className="list-indicaciones">
                <li>
                  <h5>En 4 pasos o menos solicita tu trámite </h5>
                </li>
                <li>
                  <h5>Puedes solicitar varios trámites en el mismo proceso </h5>
                </li>
                <li>
                  <h5>Recuerda que en cualquier momento puedes guardar y continuar más adelante</h5>
                </li>
                <li>
                  <h5>
                    {'Si tienes alguna duda consúltanos en la ayuda'}
                    {' para poderte ayudar al instante'}
                  </h5>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
      </Layout>
      
    </>
  )
}

export default HomePage

