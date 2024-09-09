import React, { useEffect } from 'react'
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
                            required: formInput.required, message: 'No olvides ingresar este dato'
                        }, {
                            min: formInput.minCant,
                            message: 'Dato no válido, por favor ingrésalo de nuevo'

                        }, {
                            max: formInput.maxCant,
                            message: 'Dato no válido, por favor ingrésalo de nuevo'

                        }

                    ]}
                    hasFeedback
                >
                    <Input className="input-dynamic"
                        type="text"
                    //placeholder={formInput.name} 
                    />
                </Form.Item >

            )
            }

            {
                formInput.type === 'number' && (
                    <Form.Item
                        className="spaceLabel"
                        label={formInput.name + ':'}
                        name={!iterative ? formInput._id + '_' + actor.actor._id : formInput._id}
                        rules={[
                            formInput.required ? {
                                required: formInput.required, message: 'No olvides ingresar este dato'
                            } : null,
                            {
                                min: formInput.minCant,
                                message: 'Dato no válido, por favor ingrésalo de nuevo'

                            }, {
                                max: formInput.maxCant,
                                message: 'Dato no válido, por favor ingrésalo de nuevo'

                            }]}
                        hasFeedback
                    >
                        <Input className="input-dynamic"
                            type="number"
                        //placeholder={formInput.name} 
                        />
                    </Form.Item>
                )
            }

            {
                formInput.type === 'email' && (


                    <Form.Item
                        className="spaceLabel"
                        label={formInput.name + ':'}
                        name={!iterative ? formInput._id + '_' + actor.actor._id : formInput._id}
                        hasFeedback
                        rules={[
                            formInput.required ? {
                                required: formInput.required,
                                message: 'No olvides ingresar este dato'
                            } : null, {
                                type: 'email',
                                message: 'Este correo electrónico no es válido'
                            }
                        ]}

                    >
                        <Input className="input-dynamic"
                            type="email"
                        //placeholder={formInput.name} 
                        />
                    </Form.Item>

                )
            }

            {
                formInput.type === 'date' && (


                    <Form.Item
                        className="spaceLabel"
                        label={formInput.name + ':'}
                        name={!iterative ? formInput._id + '_' + actor.actor._id : formInput._id}
                        hasFeedback
                        rules={
                            [
                                formInput.required ? {
                                    required: formInput.required,
                                    message: 'No olvides ingresar este dato'
                                } : null
                            ]
                        }
                    >
                        <Input className="input-dynamic"
                            type="date"
                        //placeholder={formInput.name} 
                        />
                    </Form.Item>

                )
            }

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
