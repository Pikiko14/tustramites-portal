import React from 'react'
import TableHeader from './components/TableHeader'
import FormData from './components/Form'
import moment from 'moment'

import './scss/tab1.scss'

const Tab1 = ({ procedureNotarial, category }) => {
  return (
    <>
      {procedureNotarial && (
        <>
          <div className="containerTableNor">
            <TableHeader
              state={procedureNotarial.state}
              date={moment(new Date(procedureNotarial.date)).format('YYYY-MM-DD hh:mm')}
              user={procedureNotarial.user}
              notarialact={procedureNotarial.notarialAct.name}
            />
          </div>

          <div className="containerInfo">
            <FormData procedurenotarial={procedureNotarial} category={category} />
          </div>
        </>
      )}
    </>
  )
}

export default Tab1
