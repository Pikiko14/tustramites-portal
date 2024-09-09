import React, { useContext, useState, useEffect } from 'react'

//COMPONENTS
import DataTable from '../../components/table/DataTable'
import HttpClient from '../../helpers/network/HttpClient'
import Alert from '../../helpers/alert/Alert'

//ANTD
import { Upload, Button } from 'antd'
//QUERY STRING
import queryString from 'query-string'
//import SaveDialog from './components/SaveDialog'
import AuthContext from '../../context/AuthContext'
import Layout from '../../components/layout/Layout'
import NewProcedure from '../../components/layout/components/NewProcedure'

import './scss/order-summary.page.scss'

const OrderSummary = (props) => {
  const [fileList, setFileList] = useState([])
  const [fileListLoad, setFileListLoad] = useState(false)
  const [procedureNotarial, setProcedureNotarial] = useState()
  const [loader, setLoader] = useState(false)
  const [notarialact, setNotarialact] = useState()
  const [paidout, setPaidOut] = useState(false)
  //const [openDialog, setOpenDialog] = useState(false)
  const [message, setMessage] = useState('En este momento iniciamos tu proceso.\nEn el transcurso del día nos estaremos comunicando contigo.\nPor favor espera nuestra llamada.')
  const [proceduresNotarialGroup, setProceduresNotarialGroup] = useState([])
  const [value, setValue] = useState('0.0')
  const { user } = useContext(AuthContext)
  const [category, setCategory] = useState()

  const onChange = (file) => {
    if (!fileListLoad) {
      var fileAux = [{ ...file.file }]
      setFileList(fileAux)
    }
  }

  const columns = [
    {
      title: 'Detalle',
      dataIndex: 'detail',
      key: 'detail',
      width: 250,
      render: (text) => {
        const boldValues = ['Subtotal', 'IVA', 'Total']
        const mainValue = text.split(' ')[0]
        return (
          <span className={boldValues.some((bold) => bold.includes(mainValue)) ? 'bold' : ''}>
            {text}
          </span>
        )
      }
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total'
      // render: (text) => <a>{text}</a>/
    }
  ]

  const loadData = async () => {
    let { p } = queryString.parse(props.location.search)
    if (p) {
      HttpClient.get('/api/procedurenotarial/one/' + p).then((res) => {
        let total = 0.0
        let tax = 12 / 100
        let valueFinal = 0.0

        let flag = res.data.order_summary_procedure.find((item) => (item.detail == 'Subtotal' || item.detail == 'IVA' || item.detail == 'Total'))
        if (!flag) {
          res.data.order_summary_procedure.forEach((item) => {
            total += parseFloat(item.total)
            item.total = '$ ' + item.total
          })

          valueFinal = total + total * tax
          let subtotal = { detail: 'Subtotal', total: '$ ' + total }
          let taxValue = { detail: 'IVA 12%', total: '$ ' + (total * tax).toFixed(1) }
          let totalItem = { detail: 'Total', total: '$ ' + (total + total * tax).toFixed(1) }
          res.data.order_summary_procedure.push(subtotal)
          res.data.order_summary_procedure.push(taxValue)
          res.data.order_summary_procedure.push(totalItem)

        } else {
          let item = res.data.order_summary_procedure.find((item) => item.detail == 'Total')
          valueFinal = parseFloat(item.total.replace('$', '').replace(' ', ''))
        }
        total = 0.0
        flag = res.data.order_summary_notary.find((item) => (item.detail == 'Subtotal' || item.detail == 'IVA' || item.detail == 'Total'))
        if (!flag) {
          res.data.order_summary_notary.forEach((item) => {
            total += parseFloat(item.total)
            item.total = '$ ' + item.total
          })
          valueFinal += total + total * tax
          let subtotal = { detail: 'Subtotal', total: '$ ' + total }
          let taxValue = { detail: 'IVA 12%', total: '$ ' + (total * tax).toFixed(1) }
          let totalItem = { detail: 'Total', total: '$ ' + (total + total * tax).toFixed(1) }
          res.data.order_summary_notary.push(subtotal)
          res.data.order_summary_notary.push(taxValue)
          res.data.order_summary_notary.push(totalItem)
        } else {
          let item = res.data.order_summary_notary.find((item) => item.detail == 'Total')
          valueFinal += parseFloat(item.total.replace('$', '').replace(' ', ''))
        }

        setValue('$ ' + valueFinal.toFixed(1))
        setProcedureNotarial(res.data)
        loadCategory(res.data.notarialAct.category)
        if (res.data.paid_out) {
          setPaidOut(res.data.paid_out)
        }
        if (res.data.payment_proof) {
          //setFileList(res.data.payment_proof);
          setFileListLoad(true)
        }

        if (res.data.notarialAct.document_result && res.data.notarialAct.date) {
          let message = 'En este momento iniciamos tu proceso.\nVamos a elaborar el documento de tu trámite y en el transcurso del día te estaremos enviando un mensaje a tu correo electrónico para que ingreses nuevamente a tu cuenta de Trámites VIP, lo puedas revisar y dar tu aprobación o las recomendaciones respectivas.\nTen en cuenta que una vez hayas aprobado el documento, podrás solicitar tu cita preferencial para reclamar el documento en Notaria.'
          setMessage(message)
        } else if (res.data.notarialAct.document_result && !res.data.notarialAct.date) {
          let message = 'En este momento iniciamos tu proceso.\nVamos a elaborar el documento de tu trámite y en el transcurso del día te estaremos enviando un mensaje a tu correo electrónico para que ingreses nuevamente a tu cuenta de Trámites VIP, lo puedas revisar y dar tu aprobación o las recomendaciones respectivas.'
          setMessage(message)
        } else if (!res.data.notarialAct.document_result && !res.data.notarialAct.date) {
          let message = 'En este momento iniciamos tu proceso.\nEn el transcurso del día nos estaremos comunicando contigo.\nPor favor espera nuestra llamada.'
          setMessage(message)
        }
        setNotarialact(res.data.notarialAct)
        loadgroup(res.data._id)
      })
    }
  }

  const loadCategory = (id) => {
    HttpClient.get('/api/category/' + id).then((res) => {
      setCategory(res.data)
    })
  }

  const loadgroup = (id) => {
    HttpClient.get('/api/procedurenotarial/group/' + id).then((res) => {
      setProceduresNotarialGroup(res.data)
    })
  }

  const saveData = () => {
    if (fileList.length > 0 || paidout) {
      procedureNotarial.state = '6'

      if (paidout) procedureNotarial.paid_out = paidout

      /*if (fileList.length > 0)
                procedureNotarial.payment_proof = fileList[0]*/

      const formData = new FormData()

      fileList.forEach((item) => {
        formData.append('file', item.originFileObj)
      })

      formData.append(
        'notarial',
        JSON.stringify({
          ...procedureNotarial
        })
      )

      HttpClient.put('/api/procedurenotarial/' + procedureNotarial._id, procedureNotarial)
        .then((res) => {
          if (proceduresNotarialGroup.length === 0) {
            Alert.show({
              type: 'warning',
              title: '',
              message: `Toda la información que has ingresado hasta este punto quedará guardada para que puedas continuar después. Si necesitas ayuda no dudes en contactarnos.\n\n¿Segur@ que deseas guardar y salir?`,
              btnOk: 'Confirmar',
              fnOk: () => {
                alertShow2()
              },
              btnCancel: 'Cancelar',
              buttonX: true
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })

      if (proceduresNotarialGroup.length > 0) {
        proceduresNotarialGroup.forEach((element, i) => {
          element.state = '6'

          if (paidout) element.paid_out = paidout
          /*if (fileList.length > 0)
                        element.payment_proof = fileList[0]*/
          const formData = new FormData()

          fileList.forEach((item) => {
            formData.append('file', item.originFileObj)
          })

          formData.append(
            'notarial',
            JSON.stringify({
              ...element
            })
          )

          HttpClient.put('/api/procedurenotarial/' + element._id, formData)
            .then((res) => {
              Alert.show({
                type: 'warning',
                title: '',
                message: `Toda la información que has ingresado hasta este punto quedará guardada para que puedas continuar después. Si necesitas ayuda no dudes en contactarnos.\n\n¿Segur@ que deseas guardar y salir?`,
                btnOk: 'Confirmar',
                fnOk: () => {
                  if (i === proceduresNotarialGroup.length - 1) alertShow2()
                },
                btnCancel: 'Cancelar',
                //fnCancel: () => { if (i === proceduresNotarialGroup.length - 1) props.history.push('/') }
                buttonX: true
              })
            })
            .catch((err) => {
              console.log(err)
            })
        })
      }
    } else {
      Alert.show({
        type: 'error',
        title: 'Información',
        message: `Debes ingresar información para poder guardar.`,
        btnOk: 'Aceptar',
        fnOk: () => { },
        btnCancel: 'Cancelar'
      })
    }
  }

  const alertShow2 = () => {
    Alert.show({
      type: 'success',
      title: '¡Tú trámite ha sido guardado!',
      message: `Para completar tu solicitud, podrás ir a la opción del menú Mis trámites, seleccionar el botón Ver de este trámite y así podrás continuar justo en donde lo dejaste.\nRecuerda que tienes 10 días para completarlo. Después de este tiempo, tu trámite será eliminado.\n\nSi tienes alguna duda, activa la ayuda y podrás chatear con nosotros o si deseas podemos llamarte. `,
      btnOk: 'Aceptar',
      fnOk: () => {
        //props.history.push('/procedurenotarial')
      },
      btnCancel: 'Cancelar',
      buttonX: true
    })
  }

  const continueProcess = () => {
    procedureNotarial.state = '7'
    procedureNotarial.paid_out = paidout
    const formData = new FormData()

    fileList.forEach((item) => {
      formData.append('file', item.originFileObj)
    })
    formData.append(
      'notarial',
      JSON.stringify({
        ...procedureNotarial
      })
    )
    //procedureNotarial.payment_proof = fileList[0];

    HttpClient.put('/api/procedurenotarial/' + procedureNotarial._id, formData)
      .then((res) => {
        if (proceduresNotarialGroup.length === 0) handleSave()
      })
      .catch((err) => {
        console.log(err)
      })

    if (proceduresNotarialGroup.length > 0) {
      proceduresNotarialGroup.forEach((element, i) => {
        element.state = '7'
        element.paid_out = paidout
        element.payment_proof = fileList[0]

        HttpClient.put('/api/procedurenotarial/' + element._id, element)
          .then((res) => {
            if (i === proceduresNotarialGroup.length - 1) handleSave()
          })
          .catch((err) => {
            console.log(err)
          })
      })
    }
  }

  const handleSave = () => {
    let logout = false
    Alert.show({
      type: 'success',
      title: user ? '¡'+user.first_name + ' gracias por preferirnos!':'¡Gracias por preferirnos!',
      message: message,
      btnOk: 'Aceptar',
      fnOk: () => {
        logout = true
        props.history.push('/')
      },
      btnCancel: 'Cancelar',
      buttonX: true
    })

    if (!logout) props.history.push('/')
    //setOpenDialog(true)
  }

  /*const callback = () => {
        props.history.push('/')
    }*/

  useEffect(() => {
    loadData()
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 3000)
  }, [])

  return (
    <Layout loader={loader} hasHeaderProfile={true} visible={false} classNameMain="orderSummary">
      <NewProcedure />
      {procedureNotarial && (
        <>
          {/*<SaveDialog
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        callback={callback}
                        message={message}
            />*/}
          <div className="containerProcedure-info">
            <div span={23} className="categories">
              <h3 className="title-indicaciones">{category && category.name} /</h3>
              <div className="line-morado" />
              <h2 className="title-indicaciones">{notarialact && notarialact.name}</h2>
              <div className="diplayflex">
                <div className="content-circule">
                  <span className="circule-number">4</span>
                </div>
                <h2 className="titleIngresarInfo">Resumen de tu pedido</h2>
              </div>
              {/* <div className="circule-notaria">
                <span className="circule-number">4</span>
              </div> */}
            </div>
            {/* <h1>Resumen de tu pedido</h1> */}
          </div>

          <div className="containerDescription">
            <p className="containerDescription-description">
              {`El valor total de tu(s) trámite(s) es de ${value} USD y lo puedes tener disponible en
              2 días hábiles.`}
            </p>
            <p className="containerDescription-description">
              A continuación, te detallamos el valor de Tus Trámites VIP y de la Notaria, acompañado
              de las opciones correspondientes de pago de cada uno. Ten en cuenta que los pagos
              deben realizarse por separado.
            </p>
          </div>

          <div className="containerTables">
            <div className="table-or">
              <div className="containerHeader">
                <h6>Tu Experto Legal</h6>
                <span className="containerHeader-payment">
                  <span className="pay">pago</span>
                  <span className="number">1</span>
                </span>
              </div>
              <div className="table-ori">
                <div className="main-card-table-order">
                  <DataTable
                    className="table-order-summary"
                    pagination={false}
                    columns={columns}
                    data={procedureNotarial.order_summary_procedure}
                  />
                </div>
                <div className="containerButton">
                  <Upload
                      fileList={fileList}
                      accept=".pdf"
                      name={1}
                      onChange={(e) => onChange(e)}
                      key={1}
                      showUploadList={false}
                    >
                      <Button className="btnContinuar" disabled={fileListLoad}>
                        Subir comprobante
                      </Button>
                    </Upload>
                </div>
              </div>
            </div>
          </div>

          <div className="containerNote">
            <p>
              NOTA: Recuerda que si has solicitado la gestión de documentos o procesos adicionales,
              sus valores correspondientes no están contemplados en esta cotización y deberán ser
              cancelados posteriormente.
            </p>
          </div>

          <div className="containerButtons">
            <Button className="btnSave" onClick={() => saveData()}>
              Guardar
            </Button>
            <Button
              className="btnContinuar"
              onClick={() => continueProcess()}
              
            >
              Finalizar
            </Button>
          </div>
        </>
      )}
    </Layout>
  )
}

export default OrderSummary
