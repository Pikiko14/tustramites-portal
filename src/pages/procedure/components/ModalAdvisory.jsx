import React, { useEffect } from 'react'
import { CaretDownOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Modal, Select } from 'antd'

const { Option } = Select

import Alert from '../../../helpers/alert/Alert'

const ModalAdvisory = ({ openModalAdvisory, setOpenModalAdvisory, user }) => {

  const [form] = Form.useForm()

  const onFinish = async (values) => {
    
    values.schedule = 'Cualquier horario'
    values.message = 'Solicitud de contacto trámite empresarial.' + (values.enterprise !== '' ? 'Empresa: ' + values.enterprise : '')
    delete values.enterprise
    
    const response = await fetch(process.env.REACT_APP_URL_API + '/api/callme', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(values)
    })

    if (response.ok) {
      form.resetFields()

      Alert.show({
        type: 'success',
        title: 'Solicitud Exitosa',
        message: 'Se ha enviado tu solicitud de llamada. En un momento te contactaremos.',
        btnOk: 'Aceptar',
        fnOk: () => { setOpenModalAdvisory(false) },
        btnCancel: 'Cancelar',
        buttonX: true
      })
    } else {
      Alert.show({
        type: 'error',
        title: 'Error ',
        message: 'Error al enviar tu solicitud de llamada',
        btnOk: 'Aceptar',
        fnOk: () => { },
        btnCancel: 'Cancelar',
        buttonX: true
      })
    }
  }

  const loadValues = () => {
    let data = {
      name: `${user.first_name || ''} ${user.last_name || ''}`,
      email: user.email,
      phone: user.phone || '',
      enterprise: user.name_enterprise || ''
    }
    form.setFieldsValue(data)
  }

  useEffect(() => {
    loadValues()
  }, [])

  return (
    <Modal
      open={openModalAdvisory}
      className="modalAdvisory"
      footer={null}
      onCancel={() => setOpenModalAdvisory(false)}
      // closable={false}
      centered={true}
    >
      <div className="modalAdvisory-content">
        <h6>Solicitud de asesoría</h6>
        <span className="information">
          Por favor confírmanos tus datos y nos estaremos contactando contigo para agendar la
          asesoría lo más pronto posible.
        </span>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            // label="Nombre Completo"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa tu nombre'
              },
              {
                min: 3,
                message: 'Tu nombre debe tener mínimo 3 caracteres'
              },
              {
                max: 50,
                message: 'Tu nombre debe tener máximo 50 caracteres'
              }
            ]}
          >
            <Input type="text" placeholder="Nombre Completo" />
          </Form.Item>
          <div className="form-control">
            <Form.Item
              name="email"
              // label="Correo electrónico"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa tu correo electrónico'
                },
                {
                  type: 'email',
                  message: 'El email que ingresaste no es válido'
                }
              ]}
            >
              <Input type="email" placeholder="Correo electrónico" />
            </Form.Item>

            <Form.Item
              name="phone"
              // label="Celular"
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa tu número celular'
                },
                {
                  min: 8,
                  message: 'Tu número celular debe tener mínimo 8 dígitos'
                }
              ]}
            >
              <Input type="number" placeholder="Celular" />
            </Form.Item>
          </div>

          <Form.Item
            name="enterprise"
            // label="Nombre Completo"
            rules={[
              /*{
                required: true,
                message: 'Por favor ingresa tu nombre'
              },*/
              {
                min: 3,
                message: 'Tu nombre de empresa debe tener mínimo 3 caracteres'
              },
              {
                max: 30,
                message: 'Tu nombre de empresa debe tener máximo 30 caracteres'
              }
            ]}
          >
            <Input type="text" placeholder="Nombre de tu empresa" />
          </Form.Item>

          {/*<Form.Item
            name="schedule"
            // label="¿En qué horario deberíamos llamarte?"
            rules={[
              {
                required: true,
                message: 'Por favor seleciona una opción'
              }
            ]}
          >
            <Select
              placeholder="¿En qué horario deberíamos llamarte?"
              suffixIcon={<CaretDownOutlined />}
            >
              <Option value="Cualquier horario" className="optionCallMe">
                Cualquier horario
              </Option>
              <Option value="Mañana" className="optionCallMe">
                Mañana
              </Option>
              <Option value="Tarde" className="optionCallMe">
                Tarde
              </Option>
              <Option value="Noche" className="optionCallMe">
                Noche
              </Option>
            </Select>
          </Form.Item>*/}

          {/*<Form.Item
            name="message"
            // label="¿Cuéntanos brevemente tu inquietud?"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa tu mensaje o solicitud'
              },
              {
                min: 5,
                message: 'Tu mensaje o solicitud debe tener mínimo 5 caracteres'
              },
              {
                max: 300,
                message: 'Tu mensaje o solicitud debe tener máximo 300 caracteres'
              }
            ]}
          >
            <Input.TextArea
              autoSize={{ maxRows: 3, minRows: 3 }}
              rows={3}
              placeholder="Describe brevemente tu inquietud"
            />
          </Form.Item>*/}

          <div className="form-footer">
            {/*<Form.Item
              name="polity"
              //valuePropName="checked"
              // label=""
              className="containerCheck"
              /*rules={[
                  {
                    required: true,
                    message: 'Por favor acepta la política de privacidad'
                  }
                ]}
            >
              <Checkbox
              // onChange={onChange}
              />
              <span
                className="text"
                // onClick={() => openPYTD()}
              >
                Acepto los Términos y Condiciones
              </span>
            </Form.Item>*/}
            <div className="containerButtons">
              <Button htmlType="submit" className="btnSave">
                Enviar
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default ModalAdvisory
