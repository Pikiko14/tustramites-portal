import React, { useState } from 'react'
import { Row, Col, Form } from 'antd'
import FormItem from './FormItem'

const FormIterative = ({ actor, notarialact, iterative, actors, index }) => {
  const [form] = Form.useForm()

  const loadInitialValues = (forms, actor) => {
    var object = new Object()
    object[forms._id] = actors[actor.actor._id][index][forms._id]
    form.setFieldsValue(object)
  }

  return (
    <>
      <h2 className="titleIngresarInfo">{actor.actor.name}</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        autoComplete="off"
        form={form}
      >
        {Object.keys(notarialact.form).map((input, j) => (
          <div key={j}>
            {notarialact.form[input]['actors'][actor.actor.name].checked &&
            !notarialact.form[input]['input'].validation ? (
              <>
                <>
                  {loadInitialValues(notarialact.form[input]['input'], actor)}

                  <FormItem
                    formInput={notarialact.form[input]['input']}
                    actor={actor}
                    iterative={iterative}
                  />
                </>
              </>
            ) : null}
          </div>
        ))}

        {Object.keys(notarialact.form).map((input, j) => (
          <div className="" key={j}>
            {notarialact.form[input]['actors'][actor.actor.name].checked &&
            notarialact.form[input]['input'].validation ? (
              <>
                <Col span={24} className="centrar">
                  <>
                    {loadInitialValues(notarialact.form[input]['input'], actor)}

                    <FormItem
                      formInput={notarialact.form[input]['input']}
                      actor={actor}
                      iterative={iterative}
                    />
                  </>
                </Col>
              </>
            ) : null}
          </div>
        ))}
      </Form>
    </>
  )
}

export default FormIterative
