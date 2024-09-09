import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Button } from 'antd'
import Alert from '../../../../helpers/alert/Alert'
import ReactWhatsapp from 'react-whatsapp'
import { WhatsappIcon } from '../../../icons/Icons'
import httpClient from '../../../../helpers/network/HttpClient'

import './ChatContent.scss'
// import '../../scss/chat-me.scss'
//import io from 'socket.io-client'

import { SendOutlined } from '@ant-design/icons'

const ChatContentOriginal = ({ options, setLevelKeys, levelKeys, setHistory, history, user, setActualLevel, actualLevel, loadHistoryCallback , whatsapp}) => {
  const [form] = Form.useForm()
  //const [history, setHistory] = useState([])
  //const [actualLevel, setActualLevel] = useState(0)

  const sendMessage = (value) => {
    if (value.message != '') {
      let message = ''
      try {
        let key = parseInt(value.message)
        let temp = [...history]
        let keys = [...levelKeys]

        let optionSelected = validateOptionSelected(key, keys)

        if (optionSelected) {
          temp.push({ description: value.message })
          let level = actualLevel + 1
          setActualLevel(level)
          if (level == 1) keys[0] = optionSelected.key
          else if (level == 2) keys[1] = optionSelected.key
          else if (level == 3) keys[2] = optionSelected.key
          setHistory(temp)
          setLevelKeys(keys)
          loadHistory()
          //loadHistory(level,,keys)
        } else {
          message = 'La opción que elegiste no pudo ser encontrada. Por favor vuelve a intentar'
        }
      } catch (error) {
        message = 'El valor que ingresaste no es válido, ingresa un nuevo valor y vuelve a intentar'
      }
      if (message != '')
        Alert.show({
          type: 'success',
          title: '',
          message: message,
          btnOk: 'Aceptar',
          fnOk: () => { },
          btnCancel: 'Cancelar',
          buttonX: true
        })
      form.resetFields()
    }
  }

  const validateOptionSelected = (key, keys) => {
    let result = undefined

    if (actualLevel == 0) {
      result = options.find((item) => item.key == key)
    }

    if (actualLevel == 1) {
      let secondLevel = options.find((item) => item.key == keys[0]).secondLevel
      let second = secondLevel.find((level) => level.key == key)
      result = second
    }

    if (actualLevel == 2) {
      let secondLevel = options.find((item) => item.key == keys[0]).secondLevel
      let second = secondLevel.find((level) => level.key == keys[1])
      let thirthLevel = second.sons.find((item) => item.key == key)
      result = thirthLevel
    }

    return result
  }

  const loadHistory = async () => {
    if (actualLevel == 0) {
      let value = { description: 'Bienvenido, elige una de las siguientes opciones' }
      let items = []
      options.map((item, i) => items.push(item.key + ' ' + item.title))
      value.items = items
      value.whatsapp = false
      let a = []
      a.push(value)
      setHistory(a)
    } else {
      let levelOptions = []
      let value = {}
      if (actualLevel == 1) {
        let finder = options.find((item) => item.key == levelKeys[0])
        value.description = finder.description
        levelOptions = finder.secondLevel || []
        value.whatsapp = finder.whatsapp
      } else if (actualLevel == 2) {
        let finder = options.find((item) => item.key == levelKeys[0])
        let secondLevel = finder.secondLevel.find((element) => element.key == levelKeys[1])
        value.description = secondLevel.description
        levelOptions = secondLevel.sons || []
        value.whatsapp = secondLevel.whatsapp
      } else if (actualLevel == 3) {
        let finder = options.find((item) => item.key == levelKeys[0])

        let secondLevel = finder.secondLevel.find((element) => element.key == levelKeys[1])

        let thirdLevel = secondLevel.sons.find((element) => element.key == levelKeys[2]) || null

        if (thirdLevel) {
          levelOptions.push(thirdLevel)
          value.description = thirdLevel.description
          value.whatsapp = thirdLevel.whatsapp
        } else {
          levelOptions = []
          value.whatsapp = false
        }
      }

      let items = []
      levelOptions.map((item, i) => {
        if (actualLevel == 3) items.push(item.title + ': \n' + item.description)
        else items.push(item.key + ' ' + item.title)
      })
      value.items = items
      let historyTemp = [...history]
      let levelKeysTemp = [...levelKeys]
      let actualLevelTemp = actualLevel
      historyTemp.push(value)
      setHistory(historyTemp)
      saveHistoryToAPI(historyTemp, levelKeysTemp, actualLevelTemp)
    }
  }

  const setBack = async () => {
    let level = actualLevel - 1

    let newHistory = history.slice(0, level + level)
    let keys = levelKeys.slice(0, level)

    setActualLevel(level)
    setLevelKeys(keys)
    setHistory(newHistory)
    saveHistoryToAPI(newHistory, keys, level)
  }

  useEffect(() => {
    loadHistory()
  }, [levelKeys, options])

  const saveHistoryToAPI = async (historyTemp, keysTemp, actualLevelTemp) => {
    try {
      let data = {
        user: user.id,
        history: historyTemp,
        levelkeys: keysTemp,
        actuallevel: actualLevelTemp,
        state: true
      }
      const response = await httpClient.put('/api/chatbotHistory/' + user.id, data)
      if (response.status !== 200) {
        console.error('Error al guardar el historial en la API')
      }
    } catch (error) {
      console.error('Error al guardar el historial:', error)
    }
  }

  return (
    <div className="chat">
      {/*<>{console.log(history)}</>
      <>{console.log(actualLevel)}</>
  <>{console.log(levelKeys)}</>*/}
      <div className="message">
        {history &&
          history.map((item, i) => (
            <div key={i} className="message-content">
              {item.items ? (
                <>
                  {item.items.length > 0 && (
                    <>
                      <span>{item.description}</span>
                      <ul className="burbuje other" key={i}>
                        {item.items.map((element, index) => (
                          <li key={index}>{element}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              ) : (
                <>
                  <p className="burbuje me">{item.description}</p>
                </>
              )}
            </div>
          ))}
      </div>
      <div className="containerButtons">
        {history.length > 0 &&
          history.map(
            (item, i) =>
              i == history.length - 1 &&
              item.whatsapp && (
                <div className="buttonWhatsapp" key={i}>
                  <ReactWhatsapp
                    number={whatsapp}
                    message="Hola, quisiera realizarte una consulta. Puedes ayudarme?"
                  >
                    <WhatsappIcon />
                    {/* <img src="/assets/icon/home_message.svg" /> */}
                    <span>WhatsApp</span>
                  </ReactWhatsapp>
                </div>
              )
          )}
        {actualLevel > 0 && (
          <div className="containerBack">
            <a onClick={() => setBack()}>Atrás</a>
          </div>
        )}
      </div>

      <div className="message-form">
        <Form layout="vertical" form={form} onFinish={sendMessage}>
          <Form.Item
            name="message"
            id="message"
            rules={[
              {
                required: true,
                message: 'Por favor ingresa un número entre 1 y 99'
              },
              {
                min: 1,
                message: 'Por favor ingresa un número menor a 99'
              },
              {
                max: 2,
                message: 'Por favor ingresa un número menor a 99'
              }
            ]}
          >
            <Input
              disabled={!(actualLevel < 3)}
              placeholder="Elige una de las opciones"
              type="number"
              autoComplete="off"
            />
          </Form.Item>

          <Button htmlType="submit" className="buttonFinish">
            <SendOutlined />
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default ChatContentOriginal
