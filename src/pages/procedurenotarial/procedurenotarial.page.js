import React, { useEffect, useState, useContext } from 'react'
// CONTEXT
import AuthContext from '../../context/AuthContext'
//NETWORK
import HttpClient from '../../helpers/network/HttpClient'

//COMPONENTS
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import ActionTable from '../../components/table/ActionTable'
import moment from 'moment'
import queryString from 'query-string'

import './scss/procedurenotarial.page.scss'
import NewProcedure from '../../components/layout/components/NewProcedure'

const Procedurenotarial = (props) => {
  const [proceduresNotarial, setProceduresNotarial] = useState([])
  const { user } = useContext(AuthContext)
  const [loader, setLoader] = useState(false)

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span>{moment(new Date(text)).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Trámite',
      dataIndex: 'notarialAct',
      key: 'notarialAct',
      render: (record) => <span>{record && record.name}</span>
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
      render: (text) => <span>{stateProcedure(text)}</span>
    },
    {
      title: 'Acción',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        record.state === '5' &&  user.role === 'CLIENTE' ? (
          <>Cotizando...</>
        ) : (
          <ActionTable
            handleSee={
              user.role === 'CLIENTE'
                ? record.state === '2' ||
                  record.state === '3' ||
                  record.state === '4' ||
                  record.state === '6' ||
                  (record.state === '7' && (!record.paid_out || !record.payment_proof)) ||
                  record.state === '8' ||
                  record.state === '11' ||
                  record.state === '13' 
                  ? () => handleSee(record)
                  : null
                : () => handleSeeAsesor(record)
            }
            handleEdit={
              user.role == 'CLIENTE' ? (record.state === '12' || (record.state === '14' && validateModifiedDate(record))
                ? () => handleEdit(record)
                : null)
                : null
            }
          />
        )
      )
    }
  ]

  const validateModifiedDate = (record) => {
    var dateObj = new Date(record.date_appointment)
    var momentObj = moment(dateObj)
    var duration = moment.duration(momentObj.diff(moment()))
    if (duration.asHours() > 8) return true
    else {
      return false
    }
  }

  const stateProcedure = (data) => {
    switch (data) {
      case '1':
      case '2':
      case '3':
      case '4':
        data = 'Continuar paso ' + data
        break
      case '5':
        data = 'Cotización Solicitada'
        break
      case '6':
        data = 'Resumen de tu pedido'
        break
      case '7':
        data = 'Iniciado'
        break
      case '8':
        data = user.role === 'CLIENTE' ? 'Revisar Borrador' : 'Borrador enviado'
        break
      case '9':
        data = 'Borrador Aprobado'
        break
      case '10':
        data = 'Correcciones Solicitadas'
        break
      case '11':
        data = user.role === 'CLIENTE' ? 'Solicitar Cita' : 'Cita Activada'
        break
      case '12':
      case '14':
        data = user.role === 'CLIENTE' ? 'Listo para reclamar en Notaria' : 'Por reclamar'
        break
      case '13':
        data = user.role === 'CLIENTE' ? 'Reagendar cita' : 'CIta cancelada'
        break
    }

    return data
  }

  const handleSee = (record) => {
    if (record.state === '2')
      props.history.push('/notarialactsteptwo?id=' + record.notarialAct._id + '&p=' + record._id)
    else if (record.state === '3')
      props.history.push('/notarialactstepthree?id=' + record.notarialAct._id + '&p=' + record._id)
    else if (record.state === '4')
      props.history.push('/notarialactstepfour?id=' + record.notarialAct._id + '&p=' + record._id)
    else if (record.state === '6') props.history.push('/ordersummary?p=' + record._id)
    else if (record.state === '7') props.history.push('/ordersummary?p=' + record._id)
    else if (record.state === '8') props.history.push('/documentresult?p=' + record._id)
    else if (record.state === '9') props.history.push('/documentresult?p=' + record._id)
    else if (record.state === '11' || record.state === '13')
      props.history.push('/date?p=' + record._id)
  }

  const handleSeeAsesor = (record) => {
    props.history.push('/resume?p=' + record._id)
  }

  const handleEdit = (record) => {
    if (record.state === '12' || record.state === '14') props.history.push('/date?p=' + record._id)
  }

  const loadProcedures = async () => {
    var response
    if (user && user.role === 'CLIENTE') {
      response = await HttpClient.get('/api/procedurenotarial/' + user._id)
    } else {
      let { state } = queryString.parse(props.location.search)
      let { enterprise } = queryString.parse(props.location.search)

      if (state && enterprise) {
        response = await HttpClient.get(
          '/api/procedurenotarial?state=' + state + '&user=' + enterprise
        )
      } else if (state) {
        response = await HttpClient.get('/api/procedurenotarial?state=' + state)
      } else {
        response = await HttpClient.get('/api/procedurenotarial')
      }
    }
    if (response.status == 200) {
      setProceduresNotarial(response.data)
    }
  }

  useEffect(() => {
    loadProcedures()
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 3000)
  }, [])

  return (
    <Layout loader={loader} classNameMain="mainTable">
      <NewProcedure title={user && user.role === 'CLIENTE' ? 'Mis Trámites' : 'Historial de trámites'} />
      <div className="header-page">
        <h6>
          {user && user.role === 'CLIENTE'
            ? 'A continuación encontrarás el historial de tus trámites'
            : 'A continuación encontrarás el historial de trámites'}
        </h6>

        <div className="main-card card">
          <div className="main-card-table">
            <DataTable
              columns={columns}
              data={proceduresNotarial}
              pagination={{ position: ['bottomCenter'] }}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Procedurenotarial
