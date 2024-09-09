import moment from 'moment'
import 'moment/locale/es'
import React, { useEffect, useState } from 'react'

import { DeleteOutlined, ExclamationCircleFilled, ExportOutlined } from '@ant-design/icons'
import { Badge, Dropdown, Popover, Typography } from 'antd'
import httpClient from '../../../helpers/network/HttpClient'
//import NotificationContext from '../../../context/NotificationsContext'
import { NotificationIcon } from '../../icons/Icons'

import '../scss/notifications.scss'

const { Link } = Typography

const Notifications = () => {
  //const { notifications, setNotifications } = useContext(NotificationContext)
  const [notifications, setNotifications] = useState([])

  const PopoverNotification = (

    <div
      className={notifications && notifications.length > 2 ? 'notifications active-scroll' : 'notifications'}
    >
      {notifications && notifications.map((item, key) => (
        < Dropdown trigger={['contextMenu']} key={key} onClick={() => !item.view && updateNotification(item._id)} >
          <div
            className="notification-item"
            /*style={{ backgroundColor: item.view ? '#ffffff' : '#e1f5fe' }}*/
            >
            {!item.view && <ExclamationCircleFilled className="icon-view" />}
            <div className={item.view ? 'content' : 'content icon-view-active'}>
              <h2 className='title'>
                {item.title}
              </h2>
              <p className='message'>{item.message}</p>
              <p className="date">{moment(item.created_at).locale('es').format('LLL')}</p>
              <div className='container-footer'>
                <DeleteOutlined className="btn-delet" type="primary"  onClick={() => deleteNotification(item._id)}/>
                {item.text && item.text != '' &&
                  <Link href={item.link} className="link-go">
                    {item.text}
                    <ExportOutlined className="icon" />
                  </Link>
                }
              </div>
            </div>
          </div>
        </Dropdown>
      ))
      }
      {!notifications || notifications.length == 0 && (
        <div>
          <h4>No hay notificaciones...</h4>
        </div>
      )}
    </div >

  )

  const updateNotification = async (id) => {
    await httpClient.put('/api/notification-new/' + id).then((res) => {
      const clone = [...notifications]
      let list = clone.map((item) => {
        return item._id == id ? { ...item, view: true } : { ...item }
      })
      setNotifications(list)
    })
  }

  const deleteNotification = async (id) => {
    httpClient.delete('/api/notification-new/' + id).then((res) => {
      const clone = [...notifications]
      const list = clone.filter((item) => item._id != id)
      setNotifications(list)
    })
  }

  const interval = () => {
    const interval = setInterval(() => {
      loadNotifications()
    }, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }

  const loadNotifications = async () => {
    console.log('entro')
    await httpClient.get('/api/notification-new')
      .then((res) => {
        if (res.status == 200 && res.data && res.data.length > 0) {
          let count = parseInt(localStorage.getItem('notifications'))
          setNotifications(res.data)
          localStorage.setItem('notifications', (res.data.length).toString())
          if (count && res.data.length > count)
            showNotification()

        }
      })
      .catch((err) => {
      })
  }

  const showNotification = () => {
    new Notification('Tus trámites, notificación', {
      body: 'Tienes nuevas notificaciones en nuestra plataforma.'
    })
  }

  useEffect(() => {
    loadNotifications()
    const cleanupFunction = interval()
    return cleanupFunction
  }, [])

  return (
    <>
      <Popover
        placement="bottom"
        // title={'Notificaciones'}
        content={PopoverNotification}
        trigger="click"
      >
        {/* <Badge dot={notifications.filter((x) => x.view == false).length > 0}> */}
        <Badge dot={notifications && notifications.filter((x) => x.view == false).length > 0}>
          <NotificationIcon />
        </Badge>
      </Popover >
    </>
  )
}

export default Notifications
