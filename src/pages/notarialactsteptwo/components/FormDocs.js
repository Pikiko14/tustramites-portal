import {
  CloseOutlined,
  PaperClipOutlined
} from '@ant-design/icons'
import { Button, Col, Form, Row, Upload } from 'antd'
import React from 'react'
import { JpgCustomIcon, PdfCustomIcon, PlusCustomIcon } from '../../../components/icons/Icons'
import Alert from '../../../helpers/alert/Alert'

const FormDocs = ({ notarialact, group, fileList, setFileList, maximum }) => {

  const loadTotalDocs = (nameDoc) => {
    let count = fileList.filter((document) => document.numDoc == nameDoc)
    return count.length
  }

  const onChange = (file, nameDoc) => {
    if (loadTotalDocs(nameDoc) > maximum) {
      Alert.show({
        type: 'error',
        title: '¡Lo sentimos!',
        message: ` Has adjuntado más documentos de los permitidos. Recuerda que por cada solicitud de documentos, puedes adjuntar máximo 10. Por favor revísalo y vuelve a intentarlo.\n\n
        Si tienes dudas, por favor comunícate con nosotros a través de la ayuda.`,
        btnOk: 'Aceptar',
        fnOk: () => { },
        buttonX: true,
        fnCancel: () => { }
      })
    } else {
      if (file.file.size / 1000000 <= 2) {
        var fileAux = { file: { ...file.file } }
        fileAux.numDoc = nameDoc
        var array = [...fileList]
        array.push(fileAux)
        setFileList(array)
      } else {
        Alert.show({
          type: 'error',
          title: '¡Lo sentimos!',
          message: `El tamaño máximo permitido en los archivos PDF o las fotos es de 3 MB. Por favor reduce su tamaño y vuelve a intentarlo o comunícate con nosotros a través de la ayuda para poderte colaborar.`,
          btnOk: 'Aceptar',
          fnOk: () => { },
          buttonX: true,
          fnCancel: () => { }
        })
      }
    }
    return true
  }

  const onDeleteDoc = (file) => {
    Alert.show({
      type: 'warning',
      title: '',
      message: `¿Deseas eliminar este documento?`,
      btnOk: 'Aceptar',
      fnOk: () => {
        let newArr = [...fileList]
        for (let i = 0; i < newArr.length; i++) {
          if (file.file.name === newArr[i].file.name && file.numDoc === newArr[i].numDoc) {
            newArr.splice(i, 1)
          }
        }
        setFileList(newArr)
      },
      buttonX: true,
      fnCancel: () => { }
    })
  }

  /*const onPreview = (file, i) => {
    const fileAux = new Blob([file.file.originFileObj], { type: 'application/pdf' })
    const fileURL = URL.createObjectURL(fileAux)
    const pdfWindow = window.open()
    pdfWindow.location.href = fileURL
  }*/

  const onClick = (file, i) => {
    const fileAux = new Blob([file.file.originFileObj], { type: file.file.type })
    const fileURL = URL.createObjectURL(fileAux)
    const pdfWindow = window.open()
    pdfWindow.location.href = fileURL
  }

  return (
    <Row>
      <Col span={24} className="panelFiles">
        <Row>
          <Col span={24} className="centrar margeTituloActor">
            <h3 className="titleIngresarInfo">{group}</h3>
          </Col>
        </Row>
        {notarialact.documents.map((document, i) => (
          <>
            {group === document.group && (
              <>
                <Row>
                  <Col span={24}>
                    <p className="colorGray">
                      • {document.required ? document.name + '*' : document.name}
                    </p>
                  </Col>
                </Row>
                <Row className="alinearFiles">
                  <div className={`containerFullFiles`}>
                    <Form.Item
                      name={i + document.name}
                      rules={[
                        { required: document.required, message: 'No olvides subir este documento' }
                      ]}
                      className="containerItemFile"
                    >
                      <div className={`displayFlex ${fileList.length ? '' : 'hidden'}`}>
                        <div className="contenedorFiles">
                          {fileList.map((item, a) => (
                            <>
                              {item.numDoc === document.name && (
                                <div className="cardFile">
                                  <div className="cardFileEdit">
                                    <Button
                                      // type="primary"
                                      onClick={() => onDeleteDoc(item)}
                                      // shape="circle"
                                      icon={<CloseOutlined />}
                                    />
                                  </div>
                                  <div
                                    className="cardFile-content"
                                    onClick={() => onClick(item, a)}
                                  >
                                    {item.file.name.split('.').at(-1) === 'pdf' ? (
                                      <PdfCustomIcon />
                                    ) : (
                                      <JpgCustomIcon />
                                    )}
                                    <p className="nameDoc">{item.file.name}</p>
                                  </div>
                                </div>
                              )}
                            </>
                          ))}
                        </div>
                        <Upload
                          listType="picture-card"
                          fileList={fileList}
                          accept="image/*,.pdf"
                          name={i}
                          onChange={(e) => onChange(e, document.name)}
                          key={i}
                          maxCount={10}
                        >
                          <PlusCustomIcon />
                        </Upload>
                      </div>
                    </Form.Item>
                  </div>
                  <div className="tamAdjuntar">
                    <Button icon={<PaperClipOutlined />} type="primary">
                      Adjuntar
                    </Button>
                    <p className="colorGray textoArrastrar">
                      Selecciona los archivos o arrastra y suelta para adjuntar los documentos.
                      Puedes agregar más de un documento.
                    </p>
                  </div>
                </Row>
              </>
            )}
          </>
        ))}
      </Col>
    </Row>
  )
}

export default FormDocs
