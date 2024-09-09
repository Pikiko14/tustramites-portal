import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Flex, Form, Row } from 'antd'
import React, { useState } from 'react'
import ModalActor from '../components/ModalActor'
import FormItem from './FormItem'

const FormIterative = ({
  actor,
  notarialact,
  setActorsIterative,
  actorsIterative,
  iterative,
  flag
}) => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const [loader, setLoader] = useState(null)

  const onFinish = () => {
    let values = form.getFieldsValue()

    let actors = { ...actorsIterative }
    let list = actors[actor.actor._id] || []
    list.push(values)
    actors[actor.actor._id] = list
    setActorsIterative(actors)
    form.resetFields()
  }

  const onModal = () => {
    setOpen(true)
  }
  const callbackEdit = (item) => {
    loadInitialValues(item)
    setLoader(item)
  }

  const callbackLength = () => {
    if (actorsIterative.length == 0) {
      setActorsIterative(null)
    }
  }

  const setValidationData = () => {
    flag = false
    return (
      <p className="notaJuridica">
        Si es una empresa, por favor diligencia los siguientes datos:
      </p>
    )
  }

  const loadInitialValues = (item) => {
    var object = new Object()

    Object.keys(notarialact.form).forEach((input, j) => {
      if (notarialact.form[input]['actors'][actor.actor.name].checked) {
        object[notarialact.form[input]['input']._id] = item[notarialact.form[input]['input']._id]
      }
    })

    form.setFieldsValue(object)
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
        onFinish={onFinish}
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
        <Flex gap="middle" align="center" vertical>

          <ModalActor
            open={open}
            actor={actor}
            setOpen={setOpen}
            data={actorsIterative}
            setData={setActorsIterative}
            form={notarialact.form}
            callback={callbackEdit}
            onFinish={onFinish}
            callbackLength={callbackLength}
          />

        </Flex>


        <Row>
          <Col span={6} className="centrar">
            <div className="containerButtons">
              <Button type="primary" icon={<PlusOutlined />} htmlType="submit">
                {loader ? 'Guardar' + ' ' + actor.actor.name : 'Agregar' + ' ' + actor.actor.name}
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default FormIterative
