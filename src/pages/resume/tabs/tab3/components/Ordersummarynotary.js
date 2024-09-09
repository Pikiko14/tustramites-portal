import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'antd'
import FormProcedure from './form/FormProcedure'
import { SaveOutlined } from '@ant-design/icons'
import Alert from '../../../../../helpers/alert/Alert'
import HttpClient from '../../../../../helpers/network/HttpClient'

const Ordersummary = ({ category, procedureNotarial, setLoaderOrderSummary }) => {
  const [dataSummary, setDataSummary] = useState([])

  const onClickSave = () => {
    if (dataSummary.length > 0) {
      procedureNotarial.order_summary_notary = dataSummary
      procedureNotarial.state = '6'
      HttpClient.put('/api/procedurenotarial/' + procedureNotarial._id, procedureNotarial)
        .then((res) => {
          showAlert('success', 'Exito', 'Información almacenada correctamente')
        })
        .catch((err) => {
          showAlert('error', 'Error', showAlert('error', 'Error', err))
        })
    } else {
      showAlert('error', 'Error', 'Debe ingresar al menos un detalle')
    }
  }

  const showAlert = (type, title, message) => {
    Alert.show({
      type: type,
      title: title,
      message: message,
      btnOk: 'Aceptar',
      fnOk: () => {
        if (type === 'success') {
          setLoaderOrderSummary(true)
          setDataSummary([])
        }
      },
      btnCancel: 'Cancelar'
    })
  }
  useEffect(() => {}, [])

  return (
    <>
      <h3 className="title-indicaciones">{category && category.name} /</h3>
      <div className="line-morado"> </div>
      <h2 className="title-indicaciones">{procedureNotarial.notarialAct.name}</h2>
      <div className="diplayflex">
        <div className="content-circule">
          <div className="circule-notaria">
            <span className="circule-number">{'3.1'}</span>
          </div>
        </div>
        <h2 className="titleIngresarInfo">Cotización Notaria</h2>
      </div>
      <br />
      <p className="display-linebreak">
        {
          'Revisa cada uno de los detalles y valores asociados. Si necesitas modificar alguno, puedes hacerlo dando clic sobre el texto.'
        }
      </p>
      <br />
      <div className="containerFormTable">
        <FormProcedure dataSummary={dataSummary} setDataSummary={setDataSummary} />
      </div>
      <Button
        type="primary"
        icon={<SaveOutlined />}
        htmlType="submit"
        className="btnSave"
        onClick={() => onClickSave()}
      >
        Finalizar
      </Button>
    </>
  )
}

export default Ordersummary
