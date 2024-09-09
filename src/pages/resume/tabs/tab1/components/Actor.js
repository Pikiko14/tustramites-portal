import React, { useState } from 'react'
import { Row, Col, Form } from 'antd'
import FormSample from './FormSample'
import FormIterarive from './FormIterative'

const Actor = ({ category, procedurenotarial }) => {
  const [form] = Form.useForm()

  return (
    <>
      <h3 className="title-indicaciones">{category && category.name} /</h3>
      <div className="line-morado"> </div>
      <h2 className="title-indicaciones">{procedurenotarial.notarialAct.name}</h2>
      <div className="diplayflex">
        <div className="content-circule">
          <div className="circule-notaria">
            <span className="circule-number">1</span>
          </div>
        </div>
        <h2 className="titleIngresarInfo">Informacion</h2>
      </div>
      <br />

      {procedurenotarial?.notarialAct?.actors?.map((actor, i) => (
        <>
          {!actor.iterative ? (
            <FormSample
              key={i}
              notarialact={procedurenotarial.notarialAct}
              actor={actor}
              form={form}
              iterative={false}
              flag={true}
              actors={procedurenotarial.actors}
            />
          ) : (
            <>
              {procedurenotarial?.actors?.[actor.actor._id]?.map((answer, j) => (
                <FormIterarive
                  key={i}
                  notarialact={procedurenotarial.notarialAct}
                  actor={actor}
                  iterative={true}
                  actors={procedurenotarial.actors}
                  index={j}
                />
              ))}
            </>
          )}
        </>
      ))}
    </>
  )
}

export default Actor
