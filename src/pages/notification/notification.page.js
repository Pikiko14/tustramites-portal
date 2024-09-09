import React, { useState, useEffect } from 'react'
import httpClient from '../../helpers/network/HttpClient'
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import ActionTable from '../../components/table/ActionTable'
import NotificationDialog from './components/NotificationDialog'
import '../procedurenotarial/scss/procedurenotarial.page.scss'
import NewProcedure from '../../components/layout/components/NewProcedure'
import Alert from '../../helpers/alert/Alert'
import { Button } from 'antd'
import moment from 'moment'
import 'moment/locale/es'

import './scss/notification.page.scss'

const Notification = () => {
  const [loader, setLoader] = useState(false)
  const [listDatas, setListDatas] = useState([])
  const [dataDialog, setDataDialog] = useState()
  const [data, setData] = useState(undefined)

  const columns = [
    {
      title: 'Titulo',
      dataIndex: 'title',
      key: 'title',
      render: text => <span>{text}</span>
    },
    {
      title: 'Fecha',
      dataIndex: 'created_at',
      key: 'created_at',
      render: text => <span>{text}</span>
    },
    {
      title: 'Asignado a',
      dataIndex: '_to_complete',
      key: '_to_complete',
      render: record => <span>{record && record.first_name && record.last_name
        ? record.first_name + ' ' + record.last_name
        : 'Sin asignar'}</span>
    },
    {
      title: 'Acto notarial',
      dataIndex: 'procedure_notarial',
      key: 'procedure_notarial',
      render: text => <span>{text}</span>
    },
    {
      title: 'Estado',
      dataIndex: 'view',
      key: 'view',
      render: record => <span>{record ? 'Leído' : 'No leído'}</span>
    },
    {
      title: 'Acción',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <ActionTable
          //handleEdit={() => handleEditData(record)}
          handleDelete={() => alertShow(record)}
        />
      )
    }
  ]

  const handleNewData = () => {
    setData(null)
    setDataDialog({})
  }

  const handleEditData = (notification) => {
    if (!notification.view) {
      setData(notification)
      setDataDialog({ notification })
    } else {
      Alert.show({
        type: 'error',
        title: '',
        message: 'No puedes editar esta notificación, ya el usuario la marco como leída.',
        buttonX: true
      })
    }
  }

  const alertShow = (input) => {
    Alert.show({
      type: 'error',
      title: '',
      message: '¿Seguro desea eliminar esta notificación?',
      btnOk: 'Aceptar',
      fnOk: () => { deleteData(input) },
      btnCancel: 'Cancelar',
      buttonX: true
    })
  }

  const deleteData = async (notification) => {

    const response = await httpClient.delete('/api/notification-new/' + notification._id)
    if (response.status == 200) {
      getDatas()
    }
  }

  const callbackData = () => {
    getDatas()
    setDataDialog(null)
  }

  const getDatas = async () => {
    let notifications = []
    let users = []
    const response = await httpClient.get('/api/notification-new/all?type=0')
    if (response.status == 200) {
      notifications = [...response.data]
    }
    const responseUsers = await httpClient.get('/api/user')
    if (responseUsers.status == 200) {
      users = [...responseUsers.data]
    }

    let notificationsTemp = []
    if (notifications.length > 0) {
      for await (var item of notifications) {
        let user = users.find(user => item._to === user._id)
        item['_to_complete'] = user
        if (item.text != '' && item.link != '') {
          let procedures = await loadProcedureNotarials(user._id)
          const idRegex = /id=([^&]+)/
          const pRegex = /p=([^&]+)/
          const idMatch = item.link.match(idRegex)
          const pMatch = item.link.match(pRegex)

          let procedurenotarialSearch = procedures.find(item => item._id === pMatch[1])
          if (procedurenotarialSearch) {
            item['procedure_notarial'] = moment(procedurenotarialSearch.date).locale('es').format('LL') + ' - ' + procedurenotarialSearch.notarialAct.name
          }
        }
        notificationsTemp.push(item)
      }
    }
    notifications.sort((a, b) => {
      return a.created_at - b.created_at
    })
    setListDatas(notifications)
  }

  const loadProcedureNotarials = async (value) => {
    const response = await httpClient.get('/api/procedurenotarial/' + value)
    if (response.status == 200) {
      return response.data
    }
    return []
  }

  useEffect(() => {
    getDatas()
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 2000)
  }, [])
  return (
    <>
      <NotificationDialog
        notification={data}
        data={dataDialog}
        setData={setDataDialog}
        callback={callbackData}
      />
      <Layout loader={loader} classNameMain="mainTable">
        <NewProcedure title='Notifcaciones' />
        <div className="header-page">
          <div className="title-btn">
            <h6>A continuación encontrarás todas tus notificaciones</h6>
            <Button 
              size="large"
              className="btn-create"
              type="primary"
              onClick={() => handleNewData()}>
              Crear
            </Button>
          </div>
          <div className="main-card card">
            <div className="main-card-table">
              <DataTable
                columns={columns}
                data={listDatas}
                pagination={{ position: ['bottomCenter'] }}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Notification
