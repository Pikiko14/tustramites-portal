import React from 'react'
import FormResume from './form/FormResume'

const Ordersummary = ({ category, procedureNotarial }) => {
  return (
    <>
      <h3 className="title-indicaciones">{category && category.name} /</h3>
      <div className="line-morado"> </div>
      <h2 className="title-indicaciones">{procedureNotarial.notarialAct.name}</h2>
      <div className="diplayflex">
        <div className="content-circule">
          <div className="circule-notaria">
            <span className="circule-number">{'3.1'}</span>
          </div>
        </div>
        <h2 className="titleIngresarInfo">Resumen</h2>
      </div>
      <p className="display-linebreak">{'Revisa cada uno de los detalles y valores asociados.'}</p>
      <br />
      <FormResume
        orderProcedure={procedureNotarial.order_summary_procedure}
        orderNotary={procedureNotarial.order_summary_notary}
      />
    </>
  )
}

export default Ordersummary
