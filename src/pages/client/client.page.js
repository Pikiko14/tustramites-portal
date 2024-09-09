import React, { useState, useEffect } from 'react'
import httpClient from '../../helpers/network/HttpClient'
import Layout from '../../components/layout/Layout'
import DataTable from '../../components/table/DataTable'
import ActionTable from '../../components/table/ActionTable'
import ClientDialog from './components/ClientDialog'
import '../procedurenotarial/scss/procedurenotarial.page.scss'
import NewProcedure from '../../components/layout/components/NewProcedure'

const Client = () => {
  const [users, setUsers] = useState([])
  const [loader, setLoader] = useState(false)
  const [user, setUser] = useState()
  const [userDialog, setUserDialog] = useState()

  const columns = [
    {
      title: 'Nombre(s)',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Apellidos',
      dataIndex: 'last_name',
      key: 'last_name',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (text) => <span>{text}</span>
    },
    {
      title: 'Acción',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => <ActionTable handleSee={() => handleSee(record)} />
    }
  ]

  const getClients = async () => {
    const response = await httpClient.get('/api/user/client/all?type=0')
    if (response.status === 200) {
      setUsers(response.data)
    }
  }

  const handleSee = (user) => {
    setUser(user)
    setUserDialog({ user })
  }

  const callbackUser = (id) => {
    getClients()
    setUserDialog(null)
  }

  useEffect(() => {
    getClients()
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 3000)
  }, [])
  return (
    <>
      <ClientDialog user={user} data={userDialog} setData={setUserDialog} callback={callbackUser} />
      <Layout loader={loader} classNameMain="mainTable">
        <NewProcedure title='Clientes' />
        <div className="header-page">
          <h6>A continuación encontrarás todos los clientes</h6>
          <div className="main-card card">
            <div className="main-card-table">
              <DataTable
                columns={columns}
                data={users}
                pagination={{ position: ['bottomCenter'] }}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Client
