import React, { useState } from 'react'
import { Row, Col, Form, Upload, Button } from 'antd'
import { SaveOutlined, FilePdfOutlined } from '@ant-design/icons'
//COMPONENTS
import Alert from '../../../../helpers/alert/Alert'
import HttpClient from '../../../../helpers/network/HttpClient'

import './scss/tab4.scss'

const Documentresult = ({ procedurenotarial, category }) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState([])

  const onChange = (file) => {
    var fileAux = [{ ...file.file }]
    setFileList(fileAux)
  }

  const onClickContinue = () => {
    if (fileList.length > 0) {
      const formData = new FormData()

      fileList.forEach((item) => {
        formData.append('file', item.originFileObj)
      })
      procedurenotarial.state = '8'
      formData.append(
        'notarial',
        JSON.stringify({
          ...procedurenotarial
        })
      )
      //procedurenotarial.document_result = fileList[0];
      //procedurenotarial.state = '8';

      HttpClient.put('/api/procedurenotarial/' + procedurenotarial._id, formData)
        .then((res) => {
          Alert.show({
            type: 'success',
            title: 'Exito',
            message: `Información almacenada correctamente`,
            btnOk: 'Aceptar',
            fnOk: () => {},
            btnCancel: 'Cancelar'
          })
        })
        .catch((err) => {
          Alert.show({
            type: 'error',
            title: '¡Ups!',
            message: err,
            btnOk: 'Aceptar',
            fnOk: () => {},
            btnCancel: 'Cancelar'
          })
        })
    } else {
      Alert.show({
        type: 'error',
        title: 'Información',
        message: `Debes cargar el documento para poder almacernar la información.`,
        btnOk: 'Aceptar',
        fnOk: () => {},
        btnCancel: 'Cancelar'
      })
    }
  }
  return (
    <>
      <h3 className="title-indicaciones">{category && category.name} /</h3>
      <div className="line-morado"> </div>
      <h2 className="title-indicaciones">{procedurenotarial.notarialAct.name}</h2>
      <div className="diplayflex">
        <div className="content-circule">
          <div className="circule-notaria">
            <span className="circule-number">4</span>
          </div>
        </div>
        <h2 className="titleIngresarInfo">Borrador del documento final</h2>
      </div>
      <br />
      <br />

      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <div className="displayFlex">
          <div className="contenedorFiles">
            <p className="colorGray">Subir borrador</p>
          </div>

          <Upload
            fileList={fileList}
            accept=".pdf"
            name={1}
            onChange={(e) => onChange(e)}
            key={1}
            showUploadList={false}
          >
            <Button disabled={procedurenotarial.document_result} className="btnSave">
              <FilePdfOutlined />
              Adjuntar
            </Button>
          </Upload>
        </div>

        {!procedurenotarial.document_result && (
          <Button
            className="btnContinuar"
            type="primary"
            icon={<SaveOutlined />}
            htmlType="submit"
            onClick={() => onClickContinue()}
          >
            Finalizar
          </Button>
        )}
      </Form>
    </>
  )
}

export default Documentresult
