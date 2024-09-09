import React from 'react'
import { Row, Col, Form } from 'antd'
import FormItem from './FormItem'

const FormSample = ({ notarialact, actor, form, iterative, flag }) => {
  let object = {}

  object[actor.actor._id] = actor.actor._id

  const setValidationData = () => {
    flag = false
    return (
      <p className="notaJuridica">
        Si es una empresa, por favor diligencia los siguientes datos:
      </p>
    )
  }

  return (
    <>
      <Row>
        <Col span={24} className="centrar margeTituloActor">
          <h2 className="titleIngresarInfo actors">{actor.actor.name}</h2>
        </Col>
      </Row>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        autoComplete="off"
        form={form}
      >
        {Object.keys(notarialact.form).map((input, j) => (
          <Row className="" key={j}>
            {notarialact.form[input]['actors'][actor.actor.name].checked &&
            !notarialact.form[input]['input'].validation ? (
              <>
                <Col span={24} className="centrar">
                  <FormItem
                    formInput={notarialact.form[input]['input']}
                    actor={actor}
                    iterative={iterative}
                  />
                </Col>
              </>
            ) : null}
          </Row>
        ))}

        {Object.keys(notarialact.form).map((input, j) => (
          <Row className="" key={j}>
            {notarialact.form[input]['actors'][actor.actor.name].checked &&
            notarialact.form[input]['input'].validation ? (
              <>
                {flag && (
                  <Col span={24} className="centrar">
                    {setValidationData()}
                  </Col>
                )}
                <Col span={24} className="centrar">
                  <FormItem
                    formInput={notarialact.form[input]['input']}
                    actor={actor}
                    iterative={iterative}
                  />
                </Col>
              </>
            ) : null}
          </Row>
        ))}
      </Form>
    </>
  )
}

export default FormSample
