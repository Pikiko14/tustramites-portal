import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'

const TableHeader = ({ state, date, user, notarialact }) => {
  const [title, setTitle] = useState()

  const loadTitle = () => {
    if (state == 5) setTitle('Solicitud de Cotización')
    else if (state == 7 && user.enterprise) setTitle('Nuevo trámite empresarial')
    else if (state == 7) setTitle('Nuevo trámite persona')
    else if (state == 9) setTitle('Borrador Aprobado')
    else if (state == 10) setTitle('Borrador Rechazado')
    else if (state == 12) setTitle('Cita solicitada')
    else if (state == 13) setTitle('Modificar cita')
    else if (state == 14) setTitle('Reagendar cita')
  }

  useEffect(() => {
    loadTitle()
  }, [])

  return (
    <>
      <div
        className="panelEstadistica"
        // style={{ backgroundImage: 'url(/assets/images/fondoperfil.jpeg)' }}
      >
        <h3 className="panelEstadistica-info">{title ? title : ''}</h3>
      </div>
      <table className='tableNor'>
        <thead className="ant-table-thead">
          <tr>
            <th className="ant-table-cell">Fecha / Hora</th>
            <th className="ant-table-cell">Tipo Cliente</th>
            <th className="ant-table-cell">Empresa</th>
            <th className="ant-table-cell">Nombre</th>
            <th className="ant-table-cell">Trámite</th>
          </tr>
        </thead>
        <tbody className="ant-table-tbody">
          <React.Fragment>
            <tr>
              <td className="ant-table-cell">{date}</td>
              <td className="ant-table-cell">{user.enterprise ? 'Empresarial' : 'Persona'}</td>
              <td className="ant-table-cell">{user.enterprise ? user.first_name : ''}</td>
              <td className="ant-table-cell">
                {user.enterprise ? user.last_name : user.first_name + ' ' + user.last_name}
              </td>
              <td className="ant-table-cell">{notarialact}</td>
            </tr>
          </React.Fragment>
        </tbody>
      </table>
    </>
  )
}

export default TableHeader
