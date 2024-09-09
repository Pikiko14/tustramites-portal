import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import './scss/EnterpriseDialog.scss'
import { Form, Input, Button, Select, Upload } from 'antd'
import ImgCrop from 'antd-img-crop'

const EnterpriseDialog = ({ user, data, setData, callback }) => {
  const [form] = Form.useForm()
  const [files, setFiles] = useState([])

  const onChange = (file) => {
    setFiles(file.fileList)
  }

  // const onPreview = async (file) => {
  //     let src = file.url;
  //     if (!src) {
  //         src = await new Promise(resolve => {
  //             const reader = new FileReader();
  //             reader.readAsDataURL(file.originFileObj);
  //             reader.onload = () => resolve(reader.result);
  //         });
  //     }
  //     const image = new Image();
  //     image.src = src;
  //     const imgWindow = window.open(src);
  //     imgWindow.document.write(image.outerHTML);
  // };

  const handleOk = () => {
    setData(null)
    callback()
  }

  const handleCancel = () => {
    setData(null)
  }

  useEffect(() => {
    form.resetFields()
    if (user) {
      console.log(user)
      let data = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
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
  }, [user, data])

  return (
    <Modal
      open={data}
      onOk={handleOk}
      onCancel={handleCancel}
      forceRender
      maskClosable={false}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          Aceptar
        </Button>
      ]}
    >
      <h3>Información de la empresa</h3>

      <Form layout="vertical" form={form}>
        <div className="form-control">
          <ImgCrop rotate={false} aspect={50 / 50} modalTitle={'Editar Imagen'} disabled={true}>
            <Upload
              listType="picture-card"
              fileList={files}
              defaultFileList={[...files]}
              onChange={onChange}
              disabled={true}
            >
              {files.length == 0 && 'Picture'}
            </Upload>
          </ImgCrop>

          <Form.Item
            label="Nombre(s)"
            name="first_name"
            id="first_name"
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            label="Apellidos"
            name="last_name"
            id="last_name"
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            label="Correo"
            name="email"
            id="email"
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            className='enterprise-row'
            label="Empresa"
            name="name_enterprise"
            id="name_enterprise"
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="role"
            id="role"
            label="Rol"
          >
            <Input disabled={true} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default EnterpriseDialog
