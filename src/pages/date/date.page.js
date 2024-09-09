import React, { useEffect, useState, useContext } from 'react'

//COMPONENTS
import Layout from '../../components/layout/Layout'

// CONTEXT
import AuthContext from '../../context/AuthContext'

//import moment from 'moment'
import es_ES from 'antd/es/locale/es_ES';
import { Button, Calendar, Row, Col, Form, Select, ConfigProvider } from 'antd'
import Alert from '../../helpers/alert/Alert'
import HttpClient from '../../helpers/network/HttpClient'
import queryString from 'query-string'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import NewProcedure from '../../components/layout/components/NewProcedure'

import './scss/date.page.scss'

const Date = (props) => {
  const [loader, setLoader] = useState(false)
  const [notarialact, setNotarialact] = useState()
  const [category, setCategory] = useState()
  const [procedureNotarial, setProcedureNotarial] = useState()
  const [date, setDate] = useState(null)
  const [dateAux, setDateAux] = useState(null)
  const [schedule, setSchedule] = useState([])
  const [form] = Form.useForm()
  const [scheduleSelected, setScheduleSelected] = useState([])
  const [isModified, setIsModified] = useState(false)
  const { user } = useContext(AuthContext)

  const loadData = () => {
    let a = dayjs().format('YYYY/MM/DD')
    setDate(a)
    setDateAux(a)
    let { p } = queryString.parse(props.location.search)
    if (p) {
      HttpClient.get('/api/procedurenotarial/one/' + p).then((res) => {
        setProcedureNotarial(res.data)
        setNotarialact(res.data.notarialAct)
        loadCategory(res.data.notarialAct.category)
        loadSchedule(res.data.notary)

        if (res?.data?.state === '12' || res?.data?.state === '14') {
          setIsModified(true)
          setDateAux(dayjs(res?.data?.date_appointment?.split(' ')[0]).format('YYYY-MM-DD'))
          let data = { hour: res?.data?.date_appointment?.split(' ')[1] }
          form.setFieldsValue(data)
        }
      })
    }
  }

  const loadSchedule = (notary) => {
    HttpClient.get('/api/notary/schedule/' + notary._id).then((res) => {
      setSchedule(res.data)
    })
  }

  const loadCategory = (id) => {
    HttpClient.get('/api/category/' + id).then((res) => {
      setCategory(res.data)
    })
  }

  const onFinish = (values) => {
    procedureNotarial.date_appointment = date + ' ' + values.hour
    if (isModified) procedureNotarial.state = '14'
    else procedureNotarial.state = '12'

    if (date && values.hour) {
      HttpClient.put('/api/procedurenotarial/' + procedureNotarial._id, procedureNotarial)
        .then((res) => {
          Alert.show({
            type: 'success',
            title: !isModified ? 'Exito' : '¡' + user.first_name + ' tú cita ha sido modificada!',
            message: !isModified
              ? `¡Tú cita preferencial está agendada!\n `
              : `` +
                `Dia: ` +
                date +
                `\n ` +
                `Hora: ` +
                values.hour +
                `\n ` +
                `Notaría: ` +
                procedureNotarial.notary.name +
                ` \n` +
                `Dirección: ` +
                procedureNotarial.notary.address +
                ` \n` +
                `Gracias por confiar en nosotros.`,
            btnOk: 'Aceptar',
            fnOk: () => {
              props.history.push('/procedurenotarial')
            },
            btnCancel: 'Cancelar'
          })
        })
        .catch((err) => {
          Alert.show({
            type: 'error',
            title: 'Error inesperado',
            message: 'Ocurrio un error inesperado, vuelve a intentar',
            btnOk: 'Aceptar',
            fnOk: () => {},
            btnCancel: 'Cancelar'
          })
        })
    } else {
      Alert.show({
        type: 'error',
        title: 'Información',
        message: 'Por favor selecciona el día y la hora de tu cita.',
        btnOk: 'Aceptar',
        fnOk: () => {},
        btnCancel: 'Cancelar'
      })
    }
  }

  const onFinishFailed = () => {}

  const onSelect = (value) => {
    setDate(dayjs(value).format('YYYY-MM-DD'))
    var aux = []
    schedule.forEach((element) => {
      if (parseInt(element.day) === parseInt(value.day())) {
        element.schedule.schedules.forEach((schedule) => {
          aux.push(schedule)
        })
      }
    })

    setScheduleSelected(aux)
  }

  const handleClose = () => {
    if (isModified) {
      Alert.show({
        type: 'warning',
        title: 'Confirmación',
        message: '¿Esta seguro de cancelar su cita?.',
        btnOk: 'Aceptar',
        fnOk: () => {
          cancelDate()
        },
        btnCancel: 'Cancelar',
        fnCancel: () => {}
      })
    } else {
      props.history.push('/procedurenotarial')
    }
  }

  const cancelDate = () => {
    var a = { ...procedureNotarial }
    a.state = '13'
    delete a.date_appointment
    HttpClient.put('/api/procedurenotarial/' + a._id, a)
      .then((res) => {
        Alert.show({
          type: 'success',
          title: '¡' + user.first_name + ' tú cita ha quedado cancelada!',
          message: `Cuando tengas la nueva fecha confirmada para ir a Notaria, ve a la opción Mis Trámites, buscas tu trámite y accedes en el botón Ver de la opción Reagendar cita.`,
          btnOk: 'Aceptar',
          fnOk: () => {
            props.history.push('/procedurenotarial')
          },
          btnCancel: 'Cancelar'
        })
      })
      .catch((err) => {
        Alert.show({
          type: 'error',
          title: 'Error inesperado',
          message: 'Ocurrio un error inesperado, vuelve a intentar',
          btnOk: 'Aceptar',
          fnOk: () => {},
          btnCancel: 'Cancelar'
        })
      })
  }

  useEffect(() => {
    loadData()
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])
  return (
    <>
      <Layout loader={loader} hasHeaderProfile={true} classNameMain="dateMain">
        <NewProcedure />
        <h3 className="title-indicaciones">{category && category.name + ' /'}</h3>
        <div className="line-morado"> </div>
        <h2 className="title-indicaciones">{notarialact && notarialact.name}</h2>
        <div className="diplayflex">
          <div className="content-circule">
            <div className="circule-notaria">
              <span className="circule-number">4</span>
            </div>
          </div>
          <h2 className="titleIngresarInfo">
            {isModified ? 'Modifica tu cita' : 'Agenda tu cita'}
          </h2>
        </div>
        <br />
        <p className="display-linebreak">
          {!isModified
            ? `¡Tu trámite ya está listo! \n
                                Selecciona el día y la hora para reclamar tu documento en Notaría con una cita preferencial.`
            : 'Datos de tu cita. \n\n' +
              procedureNotarial.notary.name +
              ` \n` +
              procedureNotarial.notary.address +
              `\n` +
              `Fecha: ` +
              dateAux+
              `\n` +
              `Hora: ` +
              form.getFieldValue('hour') +
              `\n\n\n` +
              `Si deseas cambiar el día de tu cita, selecciona la nueva fecha en el siguiente calendario. A continuación, escoge la hora en la que deseas asistir y presiona el botón Modificar.\n 
                            Si no tienes definida la fecha en la que vas a asistir, puedes oprimir el botón Cancelar cita y programarla después.`}
        </p>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor seleccionada la hora de tu cita'
              }
            ]}
            className="calendarItem"
          >
             <ConfigProvider locale={es_ES}>
            <Calendar
              name="date"
              disabledDate={(current) => {
                let customDate = dayjs().format('YYYY-MM-DD')
                return (
                  (current && current.format('YYYY-MM-DD') < customDate) ||
                  current.format('YYYY-MM-DD') >
                    dayjs(customDate).add(1, 'M').format('YYYY-MM-DD') ||
                  current.day() === 0
                )
              }}
              fullscreen={false}
              defaultValue={dayjs()}
              format={'YYYY-MM-DD'}
              onSelect={onSelect}
            />
            </ConfigProvider>
          </Form.Item>
          <Form.Item
            label="Hora:"
            name="hour"
            id="hour"
            rules={[
              {
                required: true,
                message: 'La Hora es requerida'
              }
            ]}
            className="selectHour"
          >
            <Select placeholder="Seleccione la hora" allowClear>
              {scheduleSelected.map((hour, i) => (
                <option key={i} value={hour}>
                  {hour}
                </option>
              ))}
            </Select>
          </Form.Item>

          <h6 className="titleIngresarInfo">
            NOTA:
            <span className="titleIngresarInfo-rest">
              {!isModified
                ? 'Recuerda que debes presentar los documentos originales o copias certificadas ante el Notario en el momento de la cita.'
                : ` Para modificar o cancelar tu cita, recuerda que puedes hacerlo con un mínimo de 8 horas de anticipación. De lo contrario, ya no te aparecerá habilitada la opción de cambiarla.`}
            </span>
          </h6>

          <div className="containerButtons">
            <Form.Item>
              <Button type="primary" className="btnSave" onClick={() => handleClose()}>
                {!isModified ? 'Cerrar' : 'Cancelar cita'}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="btnContinuar">
                {!isModified ? 'Agendar' : 'Modificar'}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Layout>
    </>
  )
}

export default Date
