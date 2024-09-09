import React, { useState, useEffect, useContext } from 'react'
import { Modal } from 'antd'
import AuthContext from '../../../context/AuthContext'
import httpClient from '../../../helpers/network/HttpClient'
import moment from 'moment'
import 'moment/locale/es'

import { Form, Input, Button, Select } from 'antd'
import './scss/NotificationDialog.scss'
import { CloseOutlined } from '@ant-design/icons'
const { Option } = Select

const NotificationDialog = ({ notification, data, setData, callback }) => {
  const [form] = Form.useForm()
  const { user } = useContext(AuthContext)
  const [value, setValue] = useState(undefined)
  const [valueNotarial, setValueNotarial] = useState(undefined)
  const [users, setUsers] = useState([])
  const [userSelected, setUserSelected] = useState({})
  const [procedureNotarials, setProcedureNotarials] = useState([])
  const [procedurNotarialSelected, setProcedureNotarialSelected] = useState({})

  const handleOk = () => {
    let link = userSelected.role === 'ASESOR LEGAL' ? process.env.REACT_APP_URL_CLIENT + '/procedure' : ''
    if (procedurNotarialSelected) {
      link = process.env.REACT_APP_URL_CLIENT
      if (procedurNotarialSelected.state === '2')
        link = link + '/notarialactsteptwo?id=' + procedurNotarialSelected.notarialAct._id + '&p=' + procedurNotarialSelected._id
      else if (procedurNotarialSelected.state === '3')
        link = link + '/notarialactstepthree?id=' + procedurNotarialSelected.notarialAct._id + '&p=' + procedurNotarialSelected._id
      else if (procedurNotarialSelected.state === '4')
        link = link + '/notarialactstepfour?id=' + procedurNotarialSelected.notarialAct._id + '&p=' + procedurNotarialSelected._id
      else if (procedurNotarialSelected.state === '6' || procedurNotarialSelected.state === '7') link = link + '/ordersummary?p=' + procedurNotarialSelected._id
      else if (procedurNotarialSelected.state === '8' || procedurNotarialSelected.state === '9') link = link + '/documentresult?p=' + procedurNotarialSelected._id
      else if (procedurNotarialSelected.state === '11' || procedurNotarialSelected.state === '13') link = link + '/date?p=' + procedurNotarialSelected._id
      else link = ''
    }

    if (notification) {
      httpClient.put('/api/notification-new/update/' + notification._id, {
        title: form.getFieldValue('title'),
        message: form.getFieldValue('message'),
        created_at: notification.created_at,
        view: notification.view,
        _from: user.id,
        _to: form.getFieldValue('_to'),
        text: form.getFieldValue('text') || '',
        link: form.getFieldValue('text') ? link : ''
      })
        .then((res) => {
          setData(null)
          callback()
        })

    } else {

      httpClient.post('/api/notification-new', {
        title: form.getFieldValue('title'),
        message: form.getFieldValue('message'),
        created_at: new Date(),
        view: false,
        _from: user.id,
        _to: form.getFieldValue('_to'),
        text: form.getFieldValue('text') || '',
        link: form.getFieldValue('text') ? link : ''
      })
        .then((res) => {
          setData(null)
          callback()
        })

    }

  }

  const handleCancel = () => {
    setData(null)
  }

  const handleChange = (value) => {
    setValue(value)
    let userSearch = users.find(item => item._id === value)
    if (userSearch) {
      setUserSelected(userSearch)
      setValueNotarial(undefined)
      setProcedureNotarialSelected({})
      setProcedureNotarials([])
      loadProcedureNotarials(value)
    }
  }

  const handleChangeNotarial = (value) => {
    setValueNotarial(value)
    let procedurenotarialSearch = procedureNotarials.find(item => item._id === value)
    if (procedurenotarialSearch) {
      setProcedureNotarialSelected(procedurenotarialSearch)
    }
  }

  const loadProcedureNotarials = async (value) => {
    const response = await httpClient.get('/api/procedurenotarial/' + value)
    if (response.status == 200) {
      setProcedureNotarials(response.data)
    }
  }

  const getUsers = async () => {
    const responseUsers = await httpClient.get('/api/user')
    if (responseUsers.status == 200) {
      setUsers(responseUsers.data.filter(item => item.role === 'CLIENTE'))
    }
  }

  useEffect(() => {
    getUsers()
    form.resetFields()
    if (notification) {
      let data = {
        title: notification.title,
        message: notification.message,
        _to: notification._to,
        text: notification.text,
        link: notification.link
      }
      form.setFieldsValue(data)
      setValue(notification._to)
      let userSearch = users.find(item => item._id === notification._to)
      if (userSearch) {
        setUserSelected(userSearch)
        loadProcedureNotarials(notification._to)
      }

      if (notification.link && notification.link !== '') {
        const idRegex = /id=([^&]+)/
        const pRegex = /p=([^&]+)/
        const idMatch = notification.link.match(idRegex)
        const pMatch = notification.link.match(pRegex)

        let procedurenotarialSearch = procedureNotarials.find(item => item._id === pMatch)
        if (procedurenotarialSearch) {
          setProcedureNotarialSelected(procedurenotarialSearch)
        }

      }
    }

  }, [notification, data])


  return (
    <Modal
      open={data}
      onOk={handleOk}
      onCancel={handleCancel}
      forceRender
      maskClosable={false}
      closeIcon={
        <span className="containerButtonX" onClick={handleCancel}>
          <CloseOutlined />
        </span>}
      footer={[
        <Button className='btnContinuar' key="submit" type="primary" onClick={handleOk}>
          Aceptar
        </Button>
      ]}
    >
      <h3>Información de la notificación</h3>
      <Form layout="vertical" form={form}>
        <div className="form-control">

          <Form.Item
            label="Titulo"
            name="title"
            id="title"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor ingrese el titulo!'
              },
              {
                min: 3,
                message: 'El titulo debe tener al menos 3 caracteres!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mensaje"
            name="message"
            id="message"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor ingrese el mensaje!'
              },
              {
                min: 3,
                message: 'El mensaje debe tener al menos 3 caracteres!'
              }
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            name="_to"
            id="_to"
            label="Asignado a:"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select
              showSearch
              value={value}
              defaultValue={value}
              placeholder="Selecciones un usuario"
              //                        style={{ width: 200 }}
              defaultActiveFirstOption={false}
              showArrow={false}
              //onSearch={handleSearch}
              onChange={handleChange}
              filterOption={(input, option) => {
                return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              }
            >
              {users.map(user => (
                <Option key={user._id} value={user._id}>
                  {user.first_name + ' ' + user.last_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {procedureNotarials.length > 0 &&
            <Form.Item
              name="procedure"
              id="procedure"
              label="Acto notarial"
            >

              <Select
                showSearch
                value={valueNotarial}
                defaultValue={valueNotarial}
                placeholder="Selecciones un acto notarial"
                defaultActiveFirstOption={false}
                showArrow={false}
                onChange={handleChangeNotarial}
                filterOption={(input, option) => {
                  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                }
              >
                {procedureNotarials.map(procedure => (
                  <Option key={procedure._id} value={procedure._id}>
                    {moment(procedure.date).locale('es').format('LL') + ' - ' + procedure.notarialAct.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          }

          <Form.Item
            label="Texto del botón"
            name="text"
            id="text"
            hasFeedback
            rules={[
              {
                min: 3,
                message: 'El texto debe tener al menos 3 caracteres!'
              },
              {
                max: 25,
                message: 'El texto debe tener máximo 25 caracteres!'
              }
            ]}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>

    </Modal>
  )
}

export default NotificationDialog
