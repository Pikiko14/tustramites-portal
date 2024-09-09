import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Input, Button, Upload } from 'antd'
import { SaveOutlined, FilePdfOutlined } from '@ant-design/icons'

//COMPONENTS
import Alert from '../../../../helpers/alert/Alert'
import HttpClient from '../../../../helpers/network/HttpClient'
import './scss/tab7.scss'

const RejectedDocument = ({ procedurenotarial, category, setProcedurenotarial }) => {
  const [form] = Form.useForm()
  const { TextArea } = Input
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

      formData.append(
        'notarial',
        JSON.stringify({
          notarialAct: procedurenotarial.notarialAct._id,
          state: '8',
          user: procedurenotarial.user._id,
          actors: procedurenotarial.actors ? procedurenotarial.actors : undefined,
          notary: procedurenotarial.notary || undefined,
          group_id: procedurenotarial.group_id ? procedurenotarial.group_id : undefined,
          observation_document: procedurenotarial.observation_document,
          payment_data: procedurenotarial.payment_data,
          paid_out: procedurenotarial.paid_out,
          payment_proof: procedurenotarial.payment_proof || undefined,
          observation_document_result: procedurenotarial.observation_document_result || undefined,
          order_summary_procedure: procedurenotarial.order_summary_procedure,
          order_summary_notary: procedurenotarial.order_summary_notary
        })
      )

      HttpClient.put('/api/procedurenotarial/' + procedurenotarial._id, formData)
        .then((res) => {
          Alert.show({
            type: 'success',
            title: 'Exito',
            message: `Información almacenada correctamente`,
            btnOk: 'Aceptar',
            fnOk: () => {
              var aux = { ...procedurenotarial }
              setProcedurenotarial(aux)
            },
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
    /*if (fileList.length > 0) {

            procedurenotarial.document_result = fileList[0]
            procedurenotarial.state = '8'

            HttpClient.put('/api/procedurenotarial/' + procedurenotarial._id, procedurenotarial)
                .then((res) => {

                    Alert.show({
                        type: 'success',
                        title: 'Exito',
                        message: `Información almacenada correctamente`,
                        btnOk: 'Aceptar',
                        fnOk: () => { var aux = { ...procedurenotarial }; setProcedurenotarial(aux) },
                        btnCancel: 'Cancelar'
                    })
                })
                .catch((err) => {
                    Alert.show({
                        type: 'error',
                        title: '¡Ups!',
                        message: err,
                        btnOk: 'Aceptar',
                        fnOk: () => { },
                        btnCancel: 'Cancelar'
                    })
                })
        } else {
            Alert.show({
                type: 'error',
                title: 'Información',
                message: `Debes cargar el documento para poder almacernar la información.`,
                btnOk: 'Aceptar',
                fnOk: () => { },
                btnCancel: 'Cancelar'
            })
        }*/
  }

  useEffect(() => {
    if (procedurenotarial.observation_document_result) {
      var data = { observation_document_result: procedurenotarial.observation_document_result }
      form.setFieldsValue(data)
    }
  }, [])

  return (
    <>
      <h3 className="title-indicaciones">{category && category.name} /</h3>
      <div className="line-morado"> </div>
      <h2 className="title-indicaciones">{procedurenotarial.notarialAct.name}</h2>
      <div className="diplayflex">
        <div className="content-circule">
          <div className="circule-notaria">
            <span className="circule-number"></span>
          </div>
        </div>
        <h2 className="titleIngresarInfo">Borrador Rechazado</h2>
      </div>
      <br />

      <p className="display-linebreak">
        {
          'Tu cliente ha solicitado que se realicen las siguientes correcciones al borrador del documento final:'
        }
      </p>

      <Form
        name="basic"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          className="spaceLabel"
          label="Observación"
          name="observation_document_result"
          id="observation_document_result"
        >
          <TextArea className="textArea" rows={4} disabled={true} />
        </Form.Item>
      </Form>
      <br />
      <p className="display-linebreak">
        {'A continuación podrás subir el borrador corregido y luego oprime el botón Guardar.'}
      </p>
      <br />
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
          <Button className="btnSave">
            <FilePdfOutlined />
            Adjuntar
          </Button>
        </Upload>
      </div>

      <Button
        className="btnContinuar"
        type="primary"
        icon={<SaveOutlined />}
        htmlType="submit"
        onClick={() => onClickContinue()}
      >
        Guardar
      </Button>
    </>
  )
}

export default RejectedDocument
