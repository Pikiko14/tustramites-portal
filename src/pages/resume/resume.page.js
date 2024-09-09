import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { Tabs } from 'antd'
import HttpClient from '../../helpers/network/HttpClient'
import queryString from 'query-string'
import Tab1 from './tabs/tab1/Tab1'
import Tab2 from './tabs/tab2/Tab2'
import Ordersummaryprocedure from './tabs/tab3/components/Ordersummaryprocedure'
import Ordersummarynotary from './tabs/tab3/components/Ordersummarynotary'
import Ordersummaryresume from './tabs/tab3/components/Ordersummaryresume'
import Documentresult from './tabs/tab4/Documentresult'
import DateActive from './tabs/tab5/DateActive'
import ApprovedDocument from './tabs/tab6/ApprovedDocument'
import RejectedDocument from './tabs/tab7/RejectedDocument'
import DateAppointment from './tabs/tab8/DateAppointment'
import DateCanceled from './tabs/tab8/DateCanceled'

import './scss/resume.page.scss'

const Resume = (props) => {
  const { TabPane } = Tabs
  const [loader, setLoader] = useState(false)
  const [loaderOrderSummary, setLoaderOrderSummary] = useState(true)
  const [procedureNotarial, setProcedureNotarial] = useState()
  const [category, setCategory] = useState()
  const [summary, setSummary] = useState(1)

  const loadData = () => {
    let { p } = queryString.parse(props.location.search)
    if (p) {
      HttpClient.get('/api/procedurenotarial/one/' + p).then((res) => {
        setProcedureNotarial(res.data)
        loadCategory(res.data.notarialAct.category)
        loadOrderSummary(res.data)
      })
    }
  }

  const loadCategory = (id) => {
    HttpClient.get('/api/category/' + id).then((res) => {
      setCategory(res.data)
    })
  }

  const loadOrderSummary = (procedure) => {
    if (
      procedure.order_summary_procedure &&
      procedure.order_summary_procedure.length > 0 &&
      procedure.order_summary_notary &&
      procedure.order_summary_notary.length > 0
    ) {
      setLoaderOrderSummary(true)
    } else if (procedure.order_summary_procedure) {
      setSummary(2)
      setLoaderOrderSummary(false)
    } else {
      setLoaderOrderSummary(false)
    }
  }

  useEffect(() => {
    loadData()
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])
  return (
    <Layout loader={loader} classNameMain="tramiteInfo">
      {procedureNotarial && category && (
        <>
          <Tabs defaultActiveKey="1" className="padding10" size="large" centered={true}>
            <TabPane tab="Info. Inicial" key="1" className="tabOne">
              <Tab1 procedureNotarial={procedureNotarial} category={category} />
            </TabPane>

            <TabPane tab="Info. Adicional" key="2" className="tabTwo">
              <Tab2 procedureNotarial={procedureNotarial} category={category} />
            </TabPane>

            {/*{console.log('procedureNotarial.state', procedureNotarial.state)}*/}

            {(procedureNotarial.state === '6' || parseInt(procedureNotarial.state) >= 6) &&
              loaderOrderSummary ? (
              <>
                <TabPane tab={'Cotización'} key="3" className="tabThree small">
                  <Ordersummaryresume category={category} procedureNotarial={procedureNotarial} />
                </TabPane>
              </>
            ) : (
              <TabPane
                tab={procedureNotarial.state === '5' ? 'Realizar cotización' : 'Cotización'}
                key="3"
                className="tabThree"
              >
                {summary === 1 ? (
                  <Ordersummaryprocedure
                    category={category}
                    procedureNotarial={procedureNotarial}
                    setSummary={setSummary}
                  />
                ) : (
                  <Ordersummarynotary
                    category={category}
                    procedureNotarial={procedureNotarial}
                    setLoaderOrderSummary={setLoaderOrderSummary}
                  />
                )}
              </TabPane>
            )}

            {parseInt(procedureNotarial.state) >= 7 &&
              procedureNotarial.state !== '9' &&
              procedureNotarial.state !== '10' &&
              procedureNotarial.notarialAct.document_result !== '' && (
                <TabPane tab="Borrador del documento" key="4" className='tabFour'>
                  <Documentresult procedurenotarial={procedureNotarial} category={category} />
                </TabPane>
              )}

            {procedureNotarial.state === '9' &&
              procedureNotarial.notarialAct.document_result !== '' && (
                <TabPane tab="Borrador Aprobado" key="6" className='tabSix'>
                  <ApprovedDocument procedurenotarial={procedureNotarial} category={category} />
                </TabPane>
              )}

            {procedureNotarial.state === '10' &&
              procedureNotarial.notarialAct.document_result !== '' && (
                <TabPane tab="Borrador Rechazado" key="7" className='tabSeven'>
                  <RejectedDocument
                    procedurenotarial={procedureNotarial}
                    setProcedurenotarial={setProcedureNotarial}
                    category={category}
                  />
                </TabPane>
              )}

            {(procedureNotarial.state === '7' || procedureNotarial.state === '9') &&
              procedureNotarial.notarialAct.date && (
                <TabPane tab="Activar Cita" key="8" className='tabEight'>
                  <DateActive
                    procedurenotarial={procedureNotarial}
                    setProcedureNotarial={setProcedureNotarial}
                    category={category}
                  />
                </TabPane>
              )}

            {procedureNotarial.state === '12' &&
              (!procedureNotarial.scheduled || procedureNotarial.scheduled === undefined) &&
              procedureNotarial.notarialAct.date && (
                <TabPane tab="Solicitud cita" key="9" className='tabNine'>
                  <DateAppointment
                    procedurenotarial={procedureNotarial}
                    setProcedurenotarial={setProcedureNotarial}
                    category={category}
                  />
                </TabPane>
              )}

            {procedureNotarial.state === '13' &&
              procedureNotarial.scheduled &&
              procedureNotarial.notarialAct.date && (
                <TabPane tab="Cancelar cita" key="10" className='tabTen'>
                  <DateCanceled
                    procedurenotarial={procedureNotarial}
                    setProcedurenotarial={setProcedureNotarial}
                    category={category}
                  />
                </TabPane>
              )}

            {procedureNotarial.state === '14' &&
              !procedureNotarial.scheduled &&
              procedureNotarial.notarialAct.date && (
                <TabPane tab="Modificar cita" key="11">
                  <DateAppointment
                    procedurenotarial={procedureNotarial}
                    setProcedurenotarial={setProcedureNotarial}
                    category={category}
                  />
                </TabPane>
              )}
          </Tabs>
        </>
      )}
    </Layout>
  )
}

export default Resume
