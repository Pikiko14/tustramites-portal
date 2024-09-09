import React, { useContext, useEffect } from 'react'
//import { getFirebaseToken, onMessageListener } from '../../firebase/config'
// CONTEXT
import AuthContext from '../../context/AuthContext'
import { Context } from '../../context/store'

import CallMe from '../../components/layout/components/CallMe'
import CallUs from '../../components/layout/components/Callus'
import ChatMe from '../../components/layout/components/ChatMe'
import HelpFloat from '../../pages/home/components/HelpFloat'
import Loader from '../loader/Loader'
import Header from './components/Header'
import DrawerMenu from './components/menu/DrawerMenu'

import './scss/layout.scss'

const Layout = ({
  children,
  loader = false,
  visible = true,
  hasHeaderProfile = true,
  classNameMain = ''
}) => {
  const { user } = useContext(AuthContext)
  const { state, dispatch } = useContext(Context)
  /* useSession() */

  const getChat = async () => {
    if (localStorage.getItem('levelKeys') && localStorage.getItem('actualLevel'))
      dispatch({
        type: 'CHAT_ME',
        payload: true
      })
  }



  useEffect(() => {
    getChat()
  }, [])

  return (
    <>
      {loader && <Loader type="loader" />}
      <div
        className="layout"
        style={{ backgroundImage: 'url(/assets/images/background-main.png)' }}
      >
        <DrawerMenu user={user} />
        <div className="layout-content">
          {state.call_me && <CallMe />}
          {state.call_us && <CallUs />}
          {state.chat_me && <ChatMe />}
          {visible && user && user.role === 'CLIENTE' && <HelpFloat />}

          {hasHeaderProfile && (
            <Header user={user} />
          )}
          <main className={classNameMain}>{children}</main>
        </div>
      </div>
    </>
  )
}

export default Layout
