import { CloseOutlined } from '@ant-design/icons'
import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import './scss/alert.scss'

const Alert = {
  show(alert) {
    confirmAlert({
      closeOnClickOutside: false,
      customUI: ({ onClose }) => {
        return (
          <div className="modal-alert">
            <div className={'modal-content ' + alert.type}>
              <div className="content">
                {(alert.buttonX) && (
                  <span className="containerButtonX" onClick={() => (onClose())}>
                    <CloseOutlined />
                  </span>
                )}
                <div className="alert-content">
                  <p className="alert-title">{alert.title}</p>
                  <p className="alert-message">{alert.message}</p>
                </div>
                <div className="alert-buttons">
                  {alert.btnOk && <button
                    type="submit"
                    className="btn-large"
                    onClick={() => (onClose(), alert.fnOk())}
                  >
                    {alert.btnOk}
                  </button>
                  }
                  {alert.btnCancel && alert.fnCancel && (
                    <button
                      type="submit"
                      className="btn-large outline"
                      onClick={() => (onClose(), alert.fnCancel())}
                    >
                      {alert.btnCancel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      }
    })
  }
}

export default Alert
