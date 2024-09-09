import React from 'react'
//COMPONENTS
import DataTable from '../../../../../../components/table/DataTable'

const FormResume = ({ orderProcedure, orderNotary }) => {
  const columns = [
    {
      title: 'Detalle',
      dataIndex: 'detail',
      key: 'deyail',
      render: (text) => {
        const boldValues = ['Subtotal', 'IVA', 'Total']
        const mainValue = text.split(' ')[0]
        return (
          <span className={boldValues.some((bold) => bold.includes(mainValue)) ? 'bold' : ''}>
            {text}
          </span>
        )
      }
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text) => (
        <span>
          {text.includes('$') ? text :
            '$ ' +
            parseInt(text)
              .toFixed(1)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </span>
      )
    }
  ]
  return (
    <div className="containerTables">
      <div className="header-page">
        <h6>Cotización Tus Trámites VIP</h6>
        <div className="main-card card">
          <DataTable columns={columns} data={orderProcedure} pagination={false} />
        </div>
      </div>
      <div className="header-page">
        <h6>Cotización Notaria</h6>
        <div className="main-card card">
          <DataTable columns={columns} data={orderNotary} pagination={false} />
        </div>
      </div>
    </div>
  )
}

export default FormResume
