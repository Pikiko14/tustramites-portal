import { CloseOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Radio, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useEffect, useState } from 'react'
import HttpClient from '../../../helpers/network/HttpClient'
import './scss/UserDialog.scss'

const UserDialog = ({ user, data, setData, callback }) => {
  const [form] = Form.useForm()
  const [files, setFiles] = useState([])
  const [fieldEnterprise, setFieldEnterprise] = useState(false)
  const [changeDone, setChangeDone] = useState(false)
  const [changeImage, setChangeImage] = useState(false)

  const onChange = (file) => {
    setChangeDone(true)
    setChangeImage(true)
    setFiles(file.fileList)
  }

  const changeTitlesPreview = (node) => {
    node[node.length - 1].childNodes[0].title = 'Ver'
    node[node.length - 1].childNodes[1].title = 'Eliminar'
  }

  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }

  const handleOk = async () => {
    let fields = await form.validateFields()
    if (fields.errorFields == undefined) {
      const formData = new FormData()
      if (user) {
        if (files.length > 0) formData.append('image', files[0].originFileObj)

        formData.append(
          'user',
          JSON.stringify({
            first_name: form.getFieldValue('first_name'),
            last_name: form.getFieldValue('last_name'),
            email: form.getFieldValue('email'),
            password: form.getFieldValue('password'),
            role: form.getFieldValue('role'),
            user: form.getFieldValue('phone') ? form.getFieldValue('phone') : '',
            enterprise: form.getFieldValue('name_enterprise') == '' ? false : true,
            name_enterprise: form.getFieldValue('name_enterprise'),
            phone: form.getFieldValue('phone') || undefined,
            url_image: user.url_image || '',
            change_image: changeImage
          })
        )

        HttpClient.put('/api/user/' + (user._id ? user._id : user.id), formData).then((res) => {
          setData(null)
          callback(changeDone)
        })
      }
    }
  }

  const handleCancel = () => {
    setData(null)
  }

  const onchangeRadio = () => {
    if (form.getFieldValue('enterprise') == 1) {
      setFieldEnterprise(true)
    } else {
      setFieldEnterprise(false)
      if (user) {
        user.name_enterprise = ''
        loadUser(user)
      }
    }
  }

  const loadUser = (user) => {
    let data = {
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      email: user.email,
      role: user.role,
      phone: user.phone,
      name_enterprise: user.name_enterprise
    }
    form.setFieldsValue(data)
    if (user.url_image) {
      let urlFile = process.env.REACT_APP_URL_API + '/api/storage?url=' + user.url_image
      setFiles([
        {
          uid: '-1',
          name: 'load.png',
          status: 'done',
          url: urlFile,
          thumbUrl: urlFile
        }
      ])
    }
  }

  useEffect(() => {
    form.resetFields()
    if (user) {
      loadUser(user)
    } else {
      setFiles([])
    }
  }, [user, data])

  useEffect(() => {
    const nodeIcons = document.getElementsByClassName('ant-upload-list-item-actions')
    if (nodeIcons.length > 0) {
      changeTitlesPreview(nodeIcons)
    }
  }, [user, data])

  return (
    <Modal
      open={data}
      onOk={handleOk}
      onCancel={handleCancel}
      forceRender
      centered
      className="modal-content-custom"
      width={'auto'}
      maskClosable={false}
      closeIcon={
        <span onClick={handleCancel}>
          <CloseOutlined />
        </span>
      }
      footer={[
        <Button className="btnContinuar" key="submit" type="primary" onClick={handleOk}>
          Guardar
        </Button>
      ]}
    >
      <div className="modal-user">
        <h3>Configura tu cuenta</h3>
        <p className="subtitle">Revisa y actualiza tus datos</p>
        <div className="imagen">
          <Form.Item>
            <p className="subtitle">Imagen de perfil</p>
            <ImgCrop
              rotate={false}
              aspect={50 / 50}
              modalTitle={'Edita tu imagen'}
              shape={'round'}
              modalOk={'Guardar'}
              modalCancel={'Cancelar'}
            >
              <Upload
                listType="picture-card"
                fileList={files}
                defaultFileList={[...files]}
                onChange={onChange}
              >
                {files.length == 0 && '+ Upload'}
              </Upload>
            </ImgCrop>
            <a className="restartpass" href="/restartpassword">
              Cambiar contraseña
            </a>
          </Form.Item>
        </div>
        <Form layout="vertical" form={form} requiredMark={false} onFinish={handleOk}>
          <div className="form-control">
            <Form.Item
              label="Nombre(s):"
              name="first_name"
              id="first_name"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'No olvides ingresar tu nombre'
                },
                {
                  min: 3,
                  message: 'Tu nombre tener al menos 3 caracteres!'
                }
              ]}
            >
              <Input onChange={() => setChangeDone(true)} />
            </Form.Item>

            <Form.Item
              label="Apellidos:"
              name="last_name"
              id="last_name"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa tu apellido'
                },
                {
                  min: 3,
                  message: 'Tu apellido deben tener al menos 3 caracteres'
                }
              ]}
            >
              <Input onChange={() => setChangeDone(true)} />
            </Form.Item>

            <Form.Item
              label="Celular/Teléfono:"
              name="phone"
              id="phone"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Por favor ingresa tu número móvil'
                },
                {
                  min: 7,
                  message: 'Tu número móvil debe tener mínimo 7 caracteres'
                },
                {
                  max: 10,
                  message: 'Tu número móvil debe tener máximo 10 caracteres'
                }
              ]}
            >
              <Input type="number" onChange={() => setChangeDone(true)} />
            </Form.Item>

            <Form.Item
              label="Correo:"
              name="email"
              id="email"
              hasFeedback
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Este correo no es válido. ¡Inténtalo de nuevo!'
                }
              ]}
            >
              <Input disabled="true" onChange={() => setChangeDone(true)} />
            </Form.Item>

            {/*<Form.Item
              className='enterprise-row'
              label="Empresa:"
              name="name_enterprise"
              id="name_enterprise"
              hasFeedback
            >
              <Input onChange={() => setChangeDone(true)} />
            </Form.Item>*/}

            <Form.Item  style={{display:'flex', justifyContent:'center'}} label="¿Eres cliente empresarial?" name="enterprise" id="enteprise">
              <Radio.Group
                defaultValue={user && user.enterprise != '' ? 1 : 2}
                onChange={onchangeRadio}
                style={{display:'flex', justifyContent:'center'}}
              >
                <Radio value={1}>Si</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Form.Item>

            {fieldEnterprise || (user && user.enterprise) ? (
              <>
                <Form.Item
                  className="enterprise-row"
                  label="Empresa:"
                  name="name_enterprise"
                  id="name_enterprise"
                  hasFeedback
                >
                  <Input onChange={() => setChangeDone(true)} />
                </Form.Item>
              </>
            ) : null}

            {/*<Form.Item
              name="role"
              id="role"
              label="Rol:"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input className='selector-rol' placeholder="Seleccione un rol" allowClear disabled={true}></Input>
            </Form.Item>*/}
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default UserDialog
