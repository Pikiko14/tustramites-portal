import React, { useContext, useState, useEffect } from 'react'
import { Form, Input, Checkbox, Select, notification, Button } from 'antd'
import { useUID } from 'react-uid'
import Alert from '../../../helpers/alert/Alert'

import AuthContext from '../../../context/AuthContext'
import { Context } from '../../../context/store'

import ChatContent from './chat/ChatContent'
import '../scss/chat-me.scss'

import HttpClient from '../../../helpers/network/HttpClient'

const ChatMe = () => {
  const { dispatch } = useContext(Context)
  const { user } = useContext(AuthContext)
  const [whatsapp, setWhatsapp] = useState('')
  const [options, setOptions] = useState([])
  const [levelKeys, setLevelKeys] = useState([])
  const [actualLevel, setActualLevel] = useState(0)

  const closeHistory = async () => {
    Alert.show({
      type: 'success',
      title: '',
      message:
        '¿Estás seguro de finalizar el chat?',
      btnOk: 'Si',
      fnOk: async () => {
        localStorage.removeItem('actualLevel')
        localStorage.removeItem('levelKeys')
        dispatch({
          type: 'CHAT_ME',
          payload: false
        })

      },
      btnCancel: 'Cancelar',
      buttonX: true
    })
  }

  const loadPhone = async () => {
    const response = await HttpClient.get('/api/aditional/search/whatsapp')
    if (response.status === 200) {
      setWhatsapp(response.data)
    }
  }

  const loadOptions = () => {
    HttpClient.get('/api/chatbot')
      .then((res) => {
        setOptions(res.data)
      })
      .catch((err) => {
      })
  }

  const loadStates = () => {
    if (localStorage.getItem('levelKeys'))
      setLevelKeys(JSON.parse(localStorage.getItem('levelKeys')))

    if (localStorage.getItem('actualLevel'))
      setActualLevel(parseInt(localStorage.getItem('actualLevel')))

  }

  useEffect(() => {
    loadPhone()
    loadOptions()
    loadStates()
  }, [])

  return (
    <>
      {/*<PTYDDialog page={page} data={pytdDialog} setData={setPytdDialog} />*/}
      <div className="chat-me">
        <div
          style={{ backgroundImage: 'url(/assets/images/fondoperfil.jpeg)' }}
          className="chat-me-header"
        >
          <h6>Chat en línea</h6>
        </div>

        <ChatContent
          whatsapp={whatsapp}
          options={options}
          levelKeys={levelKeys}
          setLevelKeys={setLevelKeys}
          actualLevel={actualLevel}
          setActualLevel={setActualLevel}
        />
        <div className='containerButton'>
          <Button
            className="btnContinuar"
            onClick={() => closeHistory()}
          >
            Cerrar chat
          </Button>
        </div>
      </div>
    </>
  )
}

export default ChatMe
