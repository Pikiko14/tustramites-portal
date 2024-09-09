import React from 'react'
import { Space } from 'antd'

// ICON
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'

const ActionTable = ({ handleSee, handleEdit, handleDelete }) => {
  return (
    <Space size="middle">
      {handleSee ? (
        <span className="action-edit" onClick={handleSee}>
          <EyeOutlined />
          Ver
        </span>
      ) : null}
      {handleEdit ? (
        <span className="action-edit" onClick={handleEdit}>
          <EditOutlined />
          Editar
        </span>
      ) : null}
      {handleDelete ? (
        <span className="action-edit" onClick={handleDelete}>
          <DeleteOutlined />
          Eliminar
        </span>
      ) : null}
    </Space>
  )
}

export default ActionTable
