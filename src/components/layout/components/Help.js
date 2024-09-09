import React from 'react'

const Help = () => {
  return (
    <div className="btn-help">
      <div className="btn-help-hover">
        <img className="globe-help" src="/assets/images/need_help_globe.png" />
        <img className="action-help" src="/assets/images/btn_help.png" />
      </div>
      <div
        className="panel-help"
        style={{
          backgroundImage: 'url(/assets/icon/burbuje.svg)'
        }}
      >
        <img className="rectangule" src="/assets/icon/rectangule.svg" />
        <img className="close" src="/assets/icon/close.svg" />
        {/* <div className="help-menu one">
          <p>Chat en línea</p>
          <img src="/assets/icon/home_message.svg" />
        </div> */}
        <div className="help-menu three">
          <p>Nosotros te llamamos</p>
          <img src="/assets/icon/home_support.svg" />
        </div>
      </div>
    </div>
  )
}

export default Help
