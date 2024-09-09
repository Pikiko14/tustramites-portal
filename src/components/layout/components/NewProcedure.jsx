import React from 'react'
import { MoreIcon } from '../../icons/Icons'
import Notifications from './Notifications'

const NewProcedure = ({ title = 'Nuevo Trámite' }) => {
  return (
    <div className="content-add-tramite">
      <div className="button-nuevo-tramite">
        <div className="centrarVerHor">
          <MoreIcon />
          <span>{title}</span>
        </div>
      </div>
      <div className="input-tramite">
        <div className="notificacion-movil">
          <Notifications />
        </div>
      </div>
    </div>
  )
}

export default NewProcedure
