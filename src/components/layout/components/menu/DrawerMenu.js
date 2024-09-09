import { Menu } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie'

import { useState } from 'react'
import Alert from '../../../../helpers/alert/Alert'
import UserDialog from '../../../../pages/user/components/UserDialog'
import {
  BankIcon,
  EnterpriceIcon,
  HomeIcon,
  LogoTTV,
  MyProceduresIcon,
  NotificationIconWhite,
  QuestionsIcon,
  TeamIcon
} from '../../../icons/Icons'
const cookies = new Cookies()

const DrawerMenu = ({ user, drawerMenu, onClose }) => {
  const history = useHistory()

  const [userDialog, setUserDialog] = useState()

  const callbackUser = () => {
    setUserDialog(null)
  }

  const handleShowUser = () => {
    setUserDialog({ user })
  }

  const exitLogout = () => {
    Alert.show({
      type: 'warning',
      title: 'Confirmación',
      message: `¿ Esta seguro de salir ? `,
      btnOk: 'Aceptar',
      fnOk: () => {
        cookies.remove('token')
        window.location.href = '/login'
      },
      btnCancel: 'Cancelar',
      fnCancel: () => { }
    })
  }

  return (
    <>
      <UserDialog user={user} data={userDialog} setData={callbackUser} callback={callbackUser} />
      <div className="drawer">
        {window.screen.width <= 545 && (
          <div className="drawer-close" onClick={onClose}>
            &times;
          </div>
        )}
        <div className="drawer-logo">
          <LogoTTV />
        </div>
        <nav className="containerMenu">
          {user ? (
            <>
              {user.role === 'CLIENTE' ? (
                <Menu
                  mode="inline"
                  defaultSelectedKeys={[history.location.pathname]}
                  defaultOpenKeys={[history.location.pathname.split('/')[1]]}
                  style={{ height: '100%', borderRight: 0 }}
                  className="mainMenu"
                >
                  <Menu.Item key="/" icon={<HomeIcon />} onClick={() => history.push('/')}>
                    Inicio
                  </Menu.Item>

                  <Menu.Item
                    key="/procedure"
                    icon={<MyProceduresIcon />}
                    onClick={() => history.push('/procedure')}
                  >
                   Nuevo trámite	
                  </Menu.Item>

                  <Menu.Item
                    key="/procedurenotarial"
                    icon={<MyProceduresIcon />}
                    onClick={() => history.push('/procedurenotarial')}
                  >
                    Mis trámites
                  </Menu.Item>

                 

                  <Menu.Item
                    key="/questions"
                    icon={<QuestionsIcon />}
                    onClick={() => history.push('/questions')}
                  >
                    Preguntas frecuentes
                  </Menu.Item>
                  {/* {drawerMenu && (
                    <>
                      <Menu.Item icon={<SettingOutlined />} onClick={() => handleShowUser()}>
                        Configuración
                      </Menu.Item>
                      <Menu.Item icon={<ExportOutlined />} onClick={() => exitLogout()}>
                        Cerrar sesión
                      </Menu.Item>
                    </>
                  )} */}
                </Menu>
              ) : (
                <Menu
                  mode="inline"
                  defaultSelectedKeys={[history.location.pathname]}
                  defaultOpenKeys={[history.location.pathname.split('/')[1]]}
                  style={{ height: '100%', borderRight: 0 }}
                  className="mainMenu"
                >
                  <Menu.Item
                    key="/general"
                    icon={<HomeIcon />}
                    onClick={() => history.push('/general')}
                  >
                    General
                  </Menu.Item>

                  <Menu.Item
                    key="/procedure"
                    icon={<MyProceduresIcon />}
                    onClick={() => history.push('/procedurenotarial')}
                  >
                    Trámites
                  </Menu.Item>

                  <Menu.Item
                    key="/client"
                    icon={<TeamIcon />}
                    onClick={() => history.push('/client')}
                  >
                    Clientes
                  </Menu.Item>

                  <Menu.Item
                    key="/enterprise"
                    icon={<EnterpriceIcon />}
                    onClick={() => history.push('/enterprise')}
                  >
                    Empresas
                  </Menu.Item>

                  <Menu.Item
                    key="/notary"
                    icon={<BankIcon />}
                    onClick={() => history.push('/notary')}
                  >
                    Notarías
                  </Menu.Item>
                  
                  <Menu.Item
                    key="/notification"
                    icon={<NotificationIconWhite />}
                    onClick={() => history.push('/notification')}
                  >
                    Notificaciones
                  </Menu.Item>
                </Menu>
              )}
            </>
          ) : (
            <Menu
              mode="inline"
              //defaultSelectedKeys={[history.location.pathname]}
              //defaultOpenKeys={[history.location.pathname.split('/')[1]]}
              style={{ height: '100%', borderRight: 0 }}
              className="mainMenu"
            >
              <Menu.Item key="/" icon={<HomeIcon />} onClick={() => history.push('/')}>
                Inicio
              </Menu.Item>
            </Menu>
          )}
        </nav>
      </div>
    </>
  )
}

export default DrawerMenu
