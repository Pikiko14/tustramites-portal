import React from 'react'
import { Row } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

import { useHistory } from 'react-router-dom'

const TableSingle = ({ title, columns, type, data, url }) => {
  const history = useHistory()

  const handleTotal = () => {
    history.push(url)
  }

  const handleView = (item) => {
    history.push('/resume?p=' + item._id)
  }

  return (
    <>
      {type === 1 ? (
        <Row>
          <div
            className="panelEstadisticaTitulo"
            style={{ backgroundImage: 'url(/assets/images/fondonotaria.png)' }}
          ></div>
          <div
            className="panelEstadistica"
            style={{ backgroundImage: 'url(/assets/images/fondoperfil.jpeg)' }}
          >
            <h3 className="sinMargen centrar colorBlanco">{title}</h3>
            <div className="totalSolicitud" onClick={() => handleTotal()}>
              <span className="sinMargen centrar">{data.length}</span>
            </div>
          </div>
          <table>
            <thead className="ant-table-thead">
              <tr>
                {columns.map((item, i) => (
                  <th className="ant-table-cell" key={i}>
                    {item}
                  </th>
                ))}

                <th width="10%" className="ant-table-cell">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="ant-table-tbody">
              {data.map((item, i) => (
                <tr key={i}>
                  {i < 3 && (
                    <>
                      <td className="ant-table-cell">{item.date}</td>
                      <td className="ant-table-cell">
                        {item.user.enterprise ? 'Empresa' : 'Persona'}
                      </td>
                      <td className="ant-table-cell">
                        {item.user.first_name + ' ' + item.user.last_name}
                      </td>
                      <td className="ant-table-cell">{item.notarialAct.name}</td>
                      <td className="btn-action ant-table-cell">
                        <a className="action-delete" onClick={() => handleView(item)}>
                          <EyeOutlined />
                          Ver
                        </a>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Row>
      ) : (
        <Row>
          <div
            className="panelEstadistica"
            style={{ backgroundImage: 'url(/assets/images/fondoperfil.jpeg)' }}
          >
            <h3 className="sinMargen centrar colorBlanco">{title}</h3>
            <div className="totalSolicitud" onClick={() => handleTotal()}>
              <span className="sinMargen centrar">{data.length}</span>
            </div>
          </div>
          <table>
            <thead className="ant-table-thead">
              <tr>
                {columns.map((item, i) => (
                  <th className="ant-table-cell" key={i}>
                    {item}
                  </th>
                ))}

                <th width="10%" className="ant-table-cell">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="ant-table-tbody">
              {data.map((item, i) => (
                <tr key={i}>
                  <td className="ant-table-cell">{item.date}</td>
                  <td className="ant-table-cell">{item.user.enterprise ? 'Empresa' : 'Persona'}</td>
                  <td className="ant-table-cell">
                    {item.user.first_name + ' ' + item.user.last_name}
                  </td>
                  <td className="ant-table-cell">{item.notarialAct.name}</td>
                  <td className="btn-action ant-table-cell">
                    <a className="action-delete" onClick={() => handleView(item)}>
                      <EyeOutlined />
                      Ver
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="panelEstadisticaTitulo"
            style={{ backgroundImage: 'url(/assets/images/fondonotaria.png)' }}
          ></div>
        </Row>
      )}
    </>
  )
}

export default TableSingle
