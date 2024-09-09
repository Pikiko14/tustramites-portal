import React, { useState, useEffect, useContext } from 'react'
import { Form, Input, Button } from 'antd'
import Alert from '../../../../helpers/alert/Alert'
import ReactWhatsapp from 'react-whatsapp'
import { WhatsappIcon } from '../../../../components/icons/Icons'
import httpClient from '../../../../helpers/network/HttpClient'
import AuthContext from '../../../../context/AuthContext'
import './ChatContent.scss'

import { SendOutlined } from '@ant-design/icons'

const ChatContent = ({ whatsapp, options, levelKeys, setLevelKeys, actualLevel, setActualLevel }) => {
  const [form] = Form.useForm()
  const [history, setHistory] = useState([])
  //const [options, setOptions] = useState([])
  const { user } = useContext(AuthContext)

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
          //setHistory(temp)
          localStorage.setItem('levelKeys', JSON.stringify([...keys]))
          localStorage.setItem('actualLevel', ('' + level))
          setLevelKeys(keys)
          //loadHistory()
          preloadHistory()
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
          result = options.find(item => item.key == key)
      }

      if (actualLevel == 1) {
          let secondLevel = options.find(item => item.key == keys[0]).secondLevel
          let second = secondLevel.find(level => level.key == key)
          result = second
      }

      if (actualLevel == 2) {
          let secondLevel = options.find(item => item.key == keys[0]).secondLevel
          let second = secondLevel.find(level => level.key == keys[1])
          let thirthLevel = second.sons.find(item => item.key == key)
          result = thirthLevel
      }
      
      return result
  }

  const loadHistory = () => {

      if (actualLevel == 0) {
          let value = { description: 'Bienvenido, elige una de las siguientes opciones' }
          let items = []
          options.map((item, i) => (
              items.push(item.key + ' ' + item.title)
          ))
          value.items = items
          value.whatsapp = false
          let a = []
          a.push(value)
          setHistory(a)
      } else {
          let levelOptions = []
          let value = {}
          if (actualLevel == 1) {

              let finder = options.find(item => item.key == levelKeys[0])
              value.description = finder.description
              levelOptions = finder.secondLevel || []
              value.whatsapp = finder.whatsapp
          } else if (actualLevel == 2) {

              let finder = options.find(item => item.key == levelKeys[0])
              let secondLevel = finder.secondLevel.find(element => element.key == levelKeys[1])
              value.description = secondLevel.description
              levelOptions = secondLevel.sons || []
              value.whatsapp = secondLevel.whatsapp
          } else if (actualLevel == 3) {
              let finder = options.find(item => item.key == levelKeys[0])

              let secondLevel = finder.secondLevel.find(element => element.key == levelKeys[1])

              let thirdLevel = secondLevel.sons.find(element => element.key == levelKeys[2]) || null

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
              if (actualLevel == 3)
                  items.push(item.title + ': \n' + item.description)
              else
                  items.push(item.key + ' ' + item.title)
          })
          value.items = items
          let historyTemp = [...history]
          historyTemp.push(value)
          setHistory(historyTemp)
      }

  }

  const preloadHistory = () => {
    if (options.length > 0) {
      let value = {}
      let items = []
      let histories = []
      let levelOptions = []
      let level = localStorage.getItem('actualLevel') ? parseInt(localStorage.getItem('actualLevel')) : actualLevel
      let keys = localStorage.getItem('levelKeys') ? JSON.parse(localStorage.getItem('levelKeys')) : levelKeys

      for (let index = 0; index <= level; index++) {
        if (index == 0) {
          value = { description: 'Bienvenido, elige una de las siguientes opciones' }
          options.map((item, i) => items.push(item.key + ' ' + item.title))
          value.items = items
          value.whatsapp = false
          histories.push(value)
        } else if (index == 1) {
          histories.push({ description: keys[0] })

          let finder = options.find((item) => item.key == keys[0])
          value.description = finder.description
          levelOptions = finder.secondLevel || []
          levelOptions.map((item, i) => {
            items.push(item.key + ' ' + item.title)
          })
          value.whatsapp = finder.whatsapp
          value.items = items
          histories.push(value)
        } else if (index == 2) {
          histories.push({ description: keys[1] })

          let finder = options.find((item) => item.key == keys[0])
          let secondLevel = finder.secondLevel.find((element) => element.key == keys[1])
          value.description = secondLevel.description
          levelOptions = secondLevel.sons || []
          levelOptions.map((item, i) => {
            items.push(item.key + ' ' + item.title)
          })
          value.whatsapp = secondLevel.whatsapp
          value.items = items
          histories.push(value)
        } else if (index == 3) {
          histories.push({ description: keys[1] })

          let finder = options.find((item) => item.key == keys[0])
          let secondLevel = finder.secondLevel.find((element) => element.key == keys[1])
          let thirdLevel = secondLevel.sons.find((element) => element.key == keys[2]) || null
          if (thirdLevel) {
            levelOptions.push(thirdLevel)
            levelOptions.map((item, i) => {
              items.push(item.title + ': \n' + item.description)
            })
            value.items = items
            value.description = thirdLevel.description
            value.whatsapp = thirdLevel.whatsapp

          } else {
            value.items = []
            value.whatsapp = false
          }
          histories.push(value)
        }
        value = {}
        items = []
        levelOptions = []

      }
      setHistory(histories)
    }
  }

  const setBack = () => {
    let level = localStorage.getItem('actualLevel') ? parseInt(localStorage.getItem('actualLevel')) : actualLevel
    let keys = localStorage.getItem('levelKeys') ? JSON.parse(localStorage.getItem('levelKeys')) : levelKeys
    level = level - 1

    let newHistory = history.slice(0, level + level)
    keys = keys.slice(0, level)
    localStorage.setItem('actualLevel', level.toString())
    localStorage.setItem('levelKeys', JSON.stringify([...keys]))
    setActualLevel(level)
    setLevelKeys(keys)
    //setHistory(newHistory)
    preloadHistory()
  }

  useEffect(() => {
    preloadHistory()
  }, [options])


  return (
    <>
      {(options && options.length > 0) ? (
        <>
          <div className="chat">
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
        </>
      ) :
        null
      }
    </>
  )
}

export default ChatContent
