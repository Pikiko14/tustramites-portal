import React from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { LogoTTV } from '../icons/Icons'

import './scss/loader.scss'

const Loader = ({ type = '' }) => {
  return (
    <div
      className={'loader-page ' + type}
      style={{ backgroundImage: 'url(/assets/images/background-main.png)' }}
    >
      <span className="containerImage">
        {/* <img src="/assets/logo/logo.svg" alt="/assets/logo/logo.svg" /> */}
        <LogoTTV />
      </span>

      <span className="containerLoader">
        <PropagateLoader
          color={getComputedStyle(document.documentElement).getPropertyValue(
            '--primary-color--dark'
          )}
          loading={true}
          size={15}
        />
      </span>
    </div>
  )
}

export default Loader
