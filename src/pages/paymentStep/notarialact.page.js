import React, { useContext, useEffect, useState } from 'react'

// CONTEXT
import AuthContext from '../../context/AuthContext'

import HttpClient from '../../helpers/network/HttpClient'
import queryString from 'query-string'

// COMPONENTS
import Layout from '../../components/layout/Layout'
//import SaveDialog from './components/SaveDialog'
import Alert from '../../helpers/alert/Alert'

import './scss/notarialact-step-four.page.scss'

// RESOURCE
import NewProcedure from '../../components/layout/components/NewProcedure'

const NotarialActStepThreePage = (props) => {
  const { user } = useContext(AuthContext)
  const [loader, setLoader] = useState(false)
  const [notarialact, setNotarialact] = useState()

  const loadNotarialAct = async () => {
    let { p } = queryString.parse(props.location.search)

    const response2 = await HttpClient.get('/api/procedurenotarial/one/' + p)

    if (response2.status == 200) {
      console.log(response2.data)
    }
  }

  useEffect(() => {
    loadNotarialAct()
    setLoader(true)
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])

  return (
    <>
      <Layout
        loader={loader}
        visible={true}
        hasHeaderProfile={true}
        classNameMain="notarialStepPayment"
      >
        <NewProcedure />
        {notarialact ? (
          <>
           hola
          </>
        ) : null}
      </Layout>
    </>
  )
}

export default NotarialActStepThreePage
