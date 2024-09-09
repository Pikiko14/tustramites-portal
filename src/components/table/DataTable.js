import React from 'react'
import { Table } from 'antd'

const DataTable = ({ columns, data, pagination }) => {
  return <Table columns={columns} dataSource={data} pagination={pagination} />
}

export default DataTable
