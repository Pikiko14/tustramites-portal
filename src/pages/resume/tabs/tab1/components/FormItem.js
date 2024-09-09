import React from 'react'
import { Input, Form } from 'antd'

const FormItem = ({ formInput, actor, iterative }) => {
  return (
    <>
      {(formInput.type === 'text' || formInput.type === 'string') && (
        <Form.Item
          className="spaceLabel"
          label={formInput.name + ':'}
          name={!iterative ? formInput._id + '_' + actor.actor._id : formInput._id}
          rules={[
            {
              required: formInput.required,
              message: 'Este campo es requerido!'
            },
            {
              min: formInput.minCant,
              message: 'Este campo debe tener al menos ' + formInput.minCant + ' caracteres!'
            },
            {
              max: formInput.maxCant,
              message: 'Este campo debe tener como maximo ' + formInput.maxCant + ' caracteres!'
            }
          ]}
        >
          <Input
            className="input-dynamic"
            type="text"
            placeholder={formInput.name}
            disabled={true}
          />
        </Form.Item>
      )}

      {formInput.type === 'number' && (
        <Form.Item
          className="spaceLabel"
          label={formInput.name + ':'}
          name={!iterative ? formInput._id + '_' + actor.actor._id : formInput._id}
          rules={[{ required: formInput.required, message: 'Este campo es requerido!' }]}
        >
          <Input
            className="input-dynamic"
            type="number"
            placeholder={formInput.name}
            disabled={true}
          />
        </Form.Item>
      )}

      {formInput.type === 'email' && (
        <Form.Item
          className="spaceLabel"
          label={formInput.name + ':'}
          name={!iterative ? formInput._id + '_' + actor.actor._id : formInput._id}
          rules={[
            {
              required: formInput.required,
              message: 'Este campo es requerido!'
            },
            {
              type: 'email',
              message: 'El valor ingresado no es un email valido!'
            }
          ]}
        >
          <Input
            className="input-dynamic"
            type="email"
            placeholder={formInput.name}
            disabled={true}
          />
        </Form.Item>
      )}

      {formInput.type === 'date' && (
        <Form.Item
          className="spaceLabel"
          label={formInput.name + ':'}
          name={!iterative ? formInput._id + '_' + actor.actor._id : formInput._id}
          rules={[
            {
              required: formInput.required,
              message: 'Este campo es requerido!'
            }
          ]}
        >
          <Input
            className="input-dynamic"
            type="date"
            placeholder={formInput.name}
            disabled={true}
          />
        </Form.Item>
      )}

      {/*{formInput.type == 'list' && (

                <Form.Item
                    className="selectDynamic"
                    label={formInput.name}
                    name={formInput._id + "_" + actor.actor._id}
                    rules={[{ required: formInput.required, message: 'Este campo es requerido!' }]}
                >
                    <Select className="select">
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
            )}*/}
    </>
  )
}

export default FormItem
