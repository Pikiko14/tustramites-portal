import React, { useContext, useState, useEffect } from 'react'
import { Form, Input, Checkbox, Select, notification, Button } from 'antd'
import { useUID } from 'react-uid'
import Alert from '../../../helpers/alert/Alert'

import AuthContext from '../../../context/AuthContext'
import { Context } from '../../../context/store'

import ChatContent from './chat/ChatContent'
import '../scss/chat-me.scss'

import { CloseOutlined } from '@ant-design/icons'
import HttpClient from '../../../helpers/network/HttpClient'

const ChatMeOriginal = () => {
  const { dispatch } = useContext(Context)
  const { user } = useContext(AuthContext)
  const [options, setOptions] = useState([])
  const [levelKeys, setLevelKeys] = useState([])
  const [history, setHistory] = useState([])
  const [actualLevel, setActualLevel] = useState(0)
  const [whatsapp, setWhatsapp] = useState('')

  const loadOptions = async () => {
    const response = await HttpClient.get('/api/chatbot')

    if (response.status === 200) {
      setOptions(response.data)
    }
  }

  const loadHistory = async () => {
    
    const response = await HttpClient.get('/api/chatbotHistory/' + user.id)

    if (response.status === 200 && response.data != null) {
      if ((response.data.history).length > 0)
        setHistory(response.data.history)
      if ((response.data.levelkeys).length > 0)
        setLevelKeys(response.data.levelkeys)
      if ((response.data.levelkeys).length > 0)
        setActualLevel(response.data.actuallevel)
    }
  }

  const closeHistory = async () => {
    Alert.show({
      type: 'success',
      title: '',
      message:
        '¿Estás seguro de finalizar el chat?',
      btnOk: 'Si',
      fnOk: async () => {
        const response = await HttpClient.delete('/api/chatbotHistory/' + user.id)

        const responseUpdate = await HttpClient.put('/api/chatbotHistory/all/' + user.id)
        if (responseUpdate.status === 200) {
          dispatch({
            type: 'CHAT_ME',
            payload: false
          })
        }

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

  useEffect(() => {
    loadOptions()
    loadHistory()
    loadPhone()
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

        <ChatContent options={options} setLevelKeys={setLevelKeys}
          levelKeys={levelKeys} whatsapp={whatsapp} setHistory={setHistory} history={history}
          setActualLevel={setActualLevel} actualLevel={actualLevel}
          user={user} loadHistoryCallback={loadHistory}/>
        <div className='containerButton'>
          <Button
            className="btnContinuar"
            onClick={() => closeHistory() }
          >
            Cerrar chat
          </Button>
        </div>
      </div>
    </>
  )
}

export default ChatMeOriginal
