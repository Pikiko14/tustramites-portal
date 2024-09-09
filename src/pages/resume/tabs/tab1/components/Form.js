import React, { useState, useEffect } from 'react'
import { Button, Row, Col } from 'antd'
import HttpClient from '../../../../../helpers/network/HttpClient'
import Actor from './Actor'
import '../scss/tab1.scss'
import Document from './Document'

const FormData = ({ procedurenotarial, category, handleNext }) => {
  const [proceduresNotarialGroup, setProceduresNotarialGroup] = useState([])
  const [pag, setPag] = useState(0)

  const loadgroup = (id) => {
    HttpClient.get('/api/procedurenotarial/group/' + id).then((res) => {
      setProceduresNotarialGroup(res.data)
    })
  }

  const onContinue = () => {
    setPag(pag + 1)
  }

  const onBack = () => {
    setPag(pag - 1)
  }

  useEffect(() => {
    console.log(procedurenotarial)
    if (procedurenotarial.group_id) loadgroup(procedurenotarial.group_id)
  }, [])
  return (
    <>
      {(pag === 0
        ? procedurenotarial.notarialAct.actors.length > 0
        : proceduresNotarialGroup[pag - 1].notarialAct.actors.length > 0) && (
        <Actor
          category={category}
          procedurenotarial={pag === 0 ? procedurenotarial : proceduresNotarialGroup[pag - 1]}
        />
      )}
      <br />
      {procedurenotarial.group_id && (
        <>
          <section className='btnMenu'>
            {pag > 0 && (
              <Button type="primary" htmlType="submit" className="btnSave" onClick={() => onBack()}>
                Atrás
              </Button>
            )}
            {pag < proceduresNotarialGroup.length && (
              <Button
                type="primary"
                htmlType="submit"
                className="btnContinuar"
                onClick={() => onContinue()}
              >
                Continuar
              </Button>
            )}
          </section>
        </>
      )}
      <br />
      <Document
        procedurenotarial={pag === 0 ? procedurenotarial : proceduresNotarialGroup[pag - 1]}
      />
    </>
  )
}

export default FormData
