import React from 'react'
import { Row, Col } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

import { useHistory } from 'react-router-dom'

const TableDouble = ({
  title1,
  title2,
  columns1,
  columns2,
  data1,
  url1,
  data2,
  url2,
  revert = false
}) => {
  const history = useHistory()

  const handleView = (item) => {
    history.push('/resume?p=' + item._id)
  }

  const handleView2 = (item) => {
    history.push('/resume?p=' + item._id)
  }

  const handleTotal = () => {
    history.push(url1)
  }

  const handleTotal2 = () => {
    history.push(url2)
  }
  return (
    <Row className={revert ? 'revertTables' : ''}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} className="padding10 ">
        <div
          className="panelEstadistica"
          style={{ backgroundImage: 'url(/assets/images/fondonotaria.png' }}
        >
          <h3 className="sinMargen centrar colorBlanco">{title1}</h3>
          <div className="totalSolicitud" onClick={() => handleTotal()}>
            <span className="sinMargen centrar">{data1.length}</span>
          </div>
        </div>
        <table>
          <thead className="ant-table-thead yellow">
            <tr>
              {columns1.map((item, i) => (
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
            {data1.map((item, i) => (
              <tr key={i}>
                {i < 3 && (
                  <>
                    {columns1.length == 3 ? (
                      <>
                        <td className="ant-table-cell">{item.date}</td>
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
                    ) : (
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
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} className="padding10">
        <div
          className="panelEstadistica"
          style={{ backgroundImage: 'url(/assets/images/fondoperfil.jpeg' }}
        >
          <h3 className="sinMargen centrar colorBlanco">{title2}</h3>
          <div className="totalSolicitud" onClick={() => handleTotal2()}>
            <span className="sinMargen centrar">{data2.length}</span>
          </div>
        </div>
        <table>
          <thead className="ant-table-thead">
            <tr>
              {columns2.map((item, i) => (
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
            {data2.map((item, i) => (
              <tr key={i}>
                {i < 3 && (
                  <>
                    {columns2.length == 3 ? (
                      <>
                        <td className="ant-table-cell">{item.date}</td>
                        <td className="ant-table-cell">
                          {item.user.first_name + ' ' + item.user.last_name}
                        </td>
                        <td className="ant-table-cell">{item.notarialAct.name}</td>
                        <td className="btn-action ant-table-cell">
                          <a className="action-delete" onClick={() => handleView2(item)}>
                            <EyeOutlined />
                            Ver
                          </a>
                        </td>
                      </>
                    ) : (
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
                          <a className="action-delete" onClick={() => handleView2(item)}>
                            <EyeOutlined />
                            Ver
                          </a>
                        </td>
                      </>
                    )}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </Col>
    </Row>
  )
}

export default TableDouble
