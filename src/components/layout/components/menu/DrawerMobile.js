import React, { useContext } from 'react'
import { Drawer } from 'antd'
// CONTEXT
import AuthContext from '../../../../context/AuthContext'

import DrawerMenu from './DrawerMenu'

const DrawerMobile = ({ openDrawer, setOpenDrawer }) => {
  const onClose = () => {
    setOpenDrawer(false)
  }

  const { user } = useContext(AuthContext)

  return (
    <Drawer
      placement={'left'}
      closable={false}
      onClose={onClose}
      open={openDrawer}
      key={'right'}
      className="drawerMobile"
      width={window.screen.width <= 545 ? '100vw' : 360}
    >
      <DrawerMenu user={user} drawerMenu={openDrawer} onClose={onClose} />
    </Drawer>
  )
}

export default DrawerMobile
