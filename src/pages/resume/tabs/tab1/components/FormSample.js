import React from 'react'
import { Row, Col, Form } from 'antd'
import FormItem from './FormItem'

const FormSample = ({ notarialact, actor, form, iterative, flag, actors }) => {
  let object = {}

  object[actor.actor._id] = actor.actor._id

  const loadInitialValues = (forms, actor) => {
    if (actors[actor.actor._id]) {
      var object = new Object()
      object[forms._id + '_' + actor.actor._id] = actors[actor.actor._id][forms._id]
      form.setFieldsValue(object)
    }
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
          <div className="" key={j}>
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
                <FormItem
                  formInput={notarialact.form[input]['input']}
                  actor={actor}
                  iterative={iterative}
                />
              </>
            ) : null}
          </div>
        ))}
      </Form>
    </>
  )
}

export default FormSample
