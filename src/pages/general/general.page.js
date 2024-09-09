import React, { useEffect, useState } from 'react'
import { EyeOutlined } from '@ant-design/icons'

// COMPONENTS
import Layout from '../../components/layout/Layout'
import TableDouble from './components/TableDouble'
import TableSingle from './components/TableSingle'

import HttpClient from '../../helpers/network/HttpClient'

import './scss/general.page.scss'

const HomePage = (props) => {
  const [loader, setLoader] = useState(false)
  const [requestMade, setRequestMade] = useState([])
  const [procedureEnterprise, setProcedureEnterprise] = useState([])
  const [procedurePerson, setProcedurePerson] = useState([])
  const [approvedDraft, setApprovedDraft] = useState([])
  const [rejectedDraft, setRejectedDraft] = useState([])
  const [askDate, setAskDate] = useState([])
  const [modifiedDate, setModifiedDate] = useState([])
  const [canceledDate, setCanceledDate] = useState([])

  const loadData = async () => {
    ///SOLCITUDES REALIZADAS
    const response = await HttpClient.get('/api/procedurenotarial?state=5')
    if (response.status === 200) {
      setRequestMade(response.data)
    }

    ///TRÁMITES EMPRESARIALES
    const response2 = await HttpClient.get('/api/procedurenotarial?state=7&&user=1')
    if (response2.status === 200) {
      setProcedureEnterprise(response2.data)
    }

    ///TRÁMITES PERSONAS
    const response3 = await HttpClient.get('/api/procedurenotarial?state=7&&user=0')
    if (response3.status === 200) {
      setProcedurePerson(response3.data)
    }

    ///BORRADORES APROBADAS
    const response4 = await HttpClient.get('/api/procedurenotarial?state=9')
    if (response4.status === 200) {
      setApprovedDraft(response4.data)
    }

    ///BORRADORES RECHAZADOS
    const response5 = await HttpClient.get('/api/procedurenotarial?state=10')
    if (response5.status === 200) {
      setRejectedDraft(response5.data)
    }

    ///SOLICITAR CITA
    const response6 = await HttpClient.get('/api/procedurenotarial?state=12')
    if (response6.status === 200) {
      setAskDate(response6.data)
    }

    ///MODIFICAR CITA
    const response7 = await HttpClient.get('/api/procedurenotarial?state=14')
    if (response7.status === 200) {
      setModifiedDate(response7.data)
    }

    ///CANCELAR CITA
    const response8 = await HttpClient.get('/api/procedurenotarial?state=13')
    if (response8.status === 200) {
      setCanceledDate(response8.data)
    }
  }

  useEffect(() => {
    loadData()
    setTimeout(() => {
      setLoader(false)
    }, 2000)
  }, [])

  return (
    <>
      <Layout loader={loader} classNameMain="homeManager">
        <div className="header-page">
          <div className="firstContainer">
            <TableSingle
              title={'Solicitud cotización'}
              columns={['Fecha', 'Tipo Cliente', 'Nombre', 'Trámite']}
              type={1}
              data={requestMade}
              url={'/procedurenotarial?state=5'}
            />
          </div>

          <div className="secondContainer">
            <TableDouble
              title1={'Nuevos trámites empresariales'}
              title2={'Nuevos trámites personas'}
              columns1={['Fecha', 'Empresa', 'Trámite']}
              columns2={['Fecha', 'Nombre', 'Trámite']}
              data1={procedureEnterprise}
              url1={'/procedurenotarial?state=7&&enterprise=1'}
              data2={procedurePerson}
              url2={'/procedurenotarial?state=7&&enterprise=0'}
            />
          </div>

          <div className="secondContainer">
            <TableDouble
              title1={'Borradores aprobados'}
              title2={'Borradores rechazados'}
              columns1={['Fecha', 'Nombre', 'Trámite']}
              columns2={['Fecha', 'Nombre', 'Trámite']}
              data1={approvedDraft}
              url1={'/procedurenotarial?state=9'}
              data2={rejectedDraft}
              url2={'/procedurenotarial?state=10'}
              revert
            />
          </div>

          <div className="firstContainer">
            <TableSingle
              title={'Citas solicitadas'}
              columns={['Fecha', 'Tipo Cliente', 'Nombre', 'Trámite']}
              type={2}
              data={askDate}
              url={'/procedurenotarial?state=12'}
            />
          </div>

          <div className="secondContainer">
            <TableDouble
              title1={'Modificar Cita'}
              title2={'Reagendar Cita'}
              columns1={['Fecha', 'Tipo Cliente', 'Nombre', 'Trámite']}
              columns2={['Fecha', 'Tipo Cliente', 'Nombre', 'Trámite']}
              data1={modifiedDate}
              url1={'/procedurenotarial?state=13'}
              data2={canceledDate}
              url2={'/procedurenotarial?state=14'}
            />
          </div>
        </div>
        <br></br>
        <br></br>
      </Layout>
    </>
  )
}

export default HomePage
