import React from 'react'
import { Row, Col } from 'antd'

//COMPONENTS
import Notary from './components/Notary'
import PaymentData from './components/PaymentData'

import './scss/tab2.scss'

const Tab2 = ({ procedureNotarial, category }) => {
  return (
    <>
      <h3 className="title-indicaciones">{category && category.name} /</h3>
      <div className="line-morado"> </div>
      <h2 className="title-indicaciones">{procedureNotarial.notarialAct.name}</h2>

      <br />
      {procedureNotarial.notary && (
        <>
          <div className="diplayflex">
            <div className="content-circule">
              <div className="circule-notaria">
                <span className="circule-number">{procedureNotarial.notarialAct.form ? '3' : '2'}</span>
              </div>
            </div>
            <h2 className="titleIngresarInfo">Notaria</h2>
          </div>
          <Notary notary={procedureNotarial.notary} />
        </>
      )}

      <div className="diplayflex">
        <div className="content-circule">
          <div className="circule-notaria">
            <span className="circule-number">{procedureNotarial.notarialAct.form ? '4' : '3'}</span>
          </div>
        </div>
        <h2 className="titleIngresarInfo">Datos de Facturación</h2>
      </div>
      <PaymentData paymentData={procedureNotarial.payment_data} />
      <br />
    </>
  )
}

export default Tab2
