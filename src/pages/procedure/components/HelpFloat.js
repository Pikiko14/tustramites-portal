  import React, { useContext, useState, useEffect } from 'react'
// import { useState } from 'react'
import {
  LogoTTVAloneIcon,
  TelegramIcon,
  WhatsappIcon,
  CallIcon
} from '../../../components/icons/Icons'
import { Context } from '../../../context/store'
import ReactWhatsapp from 'react-whatsapp'
import httpClient from '../../../helpers/network/HttpClient'

const HelpFloat = () => {
  const { dispatch } = useContext(Context)
  // const [first, setfirst] = useState('btn-help-hover')
  const myButtonRef = React.useRef()
  const [whatsappNumber, setWhatsappNumber] = useState('')

  const removeHover = () => {
    myButtonRef.current.parentElement.parentElement.classList.remove('no-hover')
  }

  const loadPhone = async () => {
    const response = await httpClient.get('/api/aditional/search/whatsapp')
    if (response.status === 200) {
      setWhatsappNumber(response.data)
    }
  }

  useEffect(() => {
    loadPhone()
  }, [])

  const putHover = () => {
    myButtonRef.current.parentElement.parentElement.classList.remove('no-hover')
  }

  return (
    <div className="btn-help">
      <div className="btn-help-hover" onClick={putHover}>
        <img className="globe-help" src="/assets/images/need_help_globe.png" />
        <span className="btn-help-hover-main">
          <LogoTTVAloneIcon />
        </span>
        {/* <img className="action-help" src="/assets/image/btn_help.png" /> */}
      </div>
      {/* <img className="action-help" onMouseOver={showPanel} src="/assets/images/btn_help.png" /> */}
      <div className="panel-help">
        <span className="panel-help-rectangule" onClick={removeHover} ref={myButtonRef}>
          <img className="close" src="/assets/icon/close.svg" />
        </span>
        {/* <img className="rectangule" src="/assets/icon/rectangule.svg" /> */}
        {/* <img className="close" src="/assets/icon/close.svg" /> */}
        <div
          className="help-menu one"
          onClick={() =>
            dispatch({
              type: 'CHAT_ME',
              payload: true
            })
          }
        >
          <img src="/assets/icon/home_message.svg" />
          <p>Chat en línea</p>
        </div>
        <div
          className="help-menu three"
          onClick={() =>
            dispatch({
              type: 'CALL_US',
              payload: true
            })
          }
        >
          <CallIcon />
          <p>Llámanos</p>
        </div>
        <div
          className="help-menu two"
          onClick={() =>
            dispatch({
              type: 'CALL_ME',
              payload: true
            })
          }
        >
          <img src="/assets/icon/home_support.svg" />
          <p>Nosotros te llamamos</p>
        </div>
        {/*<ReactWhatsapp
          className="help-menu one"
          number={whatsappNumber}
          message="Hola, quisiera realizarte una consulta. Puedes ayudarme?"
        >

          {/*<WhatsappIcon />*/}
        {/*  <img src="/assets/icon/home_message.svg"/>
          <p>Chat en linea</p>
        </ReactWhatsapp>*/}

        {/* <div
          className="help-menu one"
          // onClick={() =>
          //   dispatch({
          //     type: 'CALL_ME',
          //     payload: true
          //   })
          // }
        ></div> */}
      </div>
    </div>
  )
}

export default HelpFloat
