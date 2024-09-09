import React, { useContext, useState } from 'react'
import AuthContext from '../../../context/AuthContext'
import Alert from '../../../helpers/alert/Alert'

import DrawerMobile from './menu/DrawerMobile'

//DIALOG
import UserDialog from '../../../pages/user/components/UserDialog'

// COOKIE
import Cookies from 'universal-cookie'
import HttpClient from '../../../helpers/network/HttpClient'
import { LogOutIcon, SettingsIcon } from '../../icons/Icons'
import Notifications from './Notifications'
const cookies = new Cookies()

const Header = ({ user }) => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [userDialog, setUserDialog] = useState()
  const [isHoveredNotifications, setIsHoveredNotifications] = useState(false)
  const [isHoveredConfig, setIsHoveredConfig] = useState(false)
  const [isHoveredOut, setIsHoveredOut] = useState(false)
  const { updateUser } = useContext(AuthContext)
  const handleMouseOverNotify = () => {
    setIsHoveredNotifications(true)
  }

  const handleMouseOutNotify = () => {
    setIsHoveredNotifications(false)
  }

  const handleMouseOverConfig = () => {
    setIsHoveredConfig(true)
  }

  const handleMouseOutConfig = () => {
    setIsHoveredConfig(false)
  }

  const handleMouseOverOut = () => {
    setIsHoveredOut(true)
  }

  const handleMouseOutOut = () => {
    setIsHoveredOut(false)
  }

  const exitLogout = () => {
    Alert.show({
      type: 'warning',
      title: '',
      message: `¿ Estas seguro de salir ? `,
      btnOk: 'Aceptar',
      fnOk: () => {
        cookies.remove('token')
        localStorage.clear()
        window.location.href = '/login'
      },
      buttonX: true,
      fnCancel: () => { }
    })
  }

  const handleShowUser = () => {
    setUserDialog(true)
  }

  const handleCloseUser = () => {
    setUserDialog(false)
  }

  const callbackUser = async (change) => {
    if (change) {
      Alert.show({
        type: 'warning',
        title: '',
        message: 'Tu información ha sido actualizada con exito.',
        btnOk: 'Aceptar',
        fnOk: async () => {
          await HttpClient.get('/api/user/reload')
          .then((res) => {
            updateUser(res.data)
            if (user.role == 'CLIENTE')
              window.location.href = '/'
            else if (user.role == 'ASESOR LEGAL')
              window.location.href = '/general'
          })
         
        },
        buttonX: true
      })
    }
  }

  return (
    <>
      <UserDialog user={user} data={userDialog} setData={handleCloseUser} callback={callbackUser} />
      <DrawerMobile openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <header className="heaaderHome">
        <div className="responsive-menu cursor-pointer">
          <img
            src="/assets/icon/menu.svg"
            alt="/assets/icon/menu.svg"
            onClick={() => setOpenDrawer(true)}
          />
        </div>
        <div className="info-user-content">
          <div
            className="info-user"
            style={{ backgroundImage: 'url(/assets/images/background-profile.png)' }}
          >
            {user && user.role === 'CLIENTE' ? (
              <>
                <h3>{'¡Hola, ' + (user && user.first_name) + '!'}</h3>
                <h6>Siempre es bueno tenerte de regreso. ¿Qué haremos hoy?</h6>
              </>
            ) : (
              <>
                <h1>{'Bienvenid@ ' + (user && user.first_name)}</h1>
                <h6>Módulo de Asesoría Legal</h6>
              </>
            )}
          </div>

          <ul className="photo-perfil">
            <li>
              {user && user.url_image ? (
                <img
                  className="profile"
                  src={process.env.REACT_APP_URL_API + '/api/storage?url=' + user.url_image}
                  alt=""
                />
              ) : (
                <img className="profile" src='/assets/icon/user_4.svg' alt='' />
              )}
            </li>
          </ul>
        </div>
        <div className="content-config">
          <ul>
            <li>
              <div className="notificacion" onMouseOver={handleMouseOverNotify} onMouseOut={handleMouseOutNotify}>
                <Notifications />
              </div>
              {isHoveredNotifications && <span className='text-spam'>Notificaciones</span>}
            </li>
            <li>
              <div onClick={() => handleShowUser()} onMouseOver={handleMouseOverConfig} onMouseOut={handleMouseOutConfig}>
                <SettingsIcon />
              </div>
              {isHoveredConfig && <span className='text-spam'>Configura<br></br>tu cuenta</span>}
            </li>
            <li>
              <div onClick={() => exitLogout()} onMouseOver={handleMouseOverOut} onMouseOut={handleMouseOutOut}>
                <LogOutIcon />
              </div>
              {isHoveredOut && <span className='text-spam'>Salir</span>}
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}

export default Header
