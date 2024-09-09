import React, { useEffect, useState } from 'react'
// import DataTable from '../../../components/table/DataTable'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Collapse, Tooltip } from 'antd'
import Alert from '../../../helpers/alert/Alert'

const ModalActor = ({ open, actor, setOpen, data, form, setData, callback, callbackLength }) => {
  const [formSelected, setFormSelected] = useState([])

  const handleOk = () => {
    callbackLength(data)
    setOpen(false)
  }

  const handleDelete = (position) => {
    Alert.show({
      type: 'warning',
      title: 'Eliminar',
      message: `¿Estás segur@ que deseas eliminarlo?`,
      btnOk: 'Aceptar',
      buttonX: true,
      fnOk: () => {
        deleteActor(position)
      },
      // btnCancel: 'Cancelar',
      fnCancel: () => { }
    })
  }

  const handleEdit = (position) => {
    Alert.show({
      type: 'warning',
      title: 'Editar',
      message: `¿Estás segur@ que deseas editarlo?`,
      btnOk: 'Aceptar',
      buttonX: true,
      fnOk: () => {
        editActor(position)
      },
      // btnCancel: 'Cancelar',
      fnCancel: () => { }
    })
  }

  const editActor = (position) => {
    var item = data[actor.actor._id][position]
    deleteActor(position)
    callback(item)
    setOpen(false)
  }
  const deleteActor = (position) => {
    var dataAux = { ...data }
    let list = dataAux[actor.actor._id] || []
    list.splice(position, 1)
    dataAux[actor.actor._id] = list
    setData(dataAux)
    if (dataAux.length === 0) setOpen(false)
  }

  const loadInputs = () => {
    var arrayInput = []
    Object.keys(form).forEach((input, j) => {
      if (form[input]['actors'][actor.actor.name].checked) {
        arrayInput.push(form[input]['input'])
      }
    })
    setFormSelected(arrayInput)
  }

  useEffect(() => {
    loadInputs()
  }, [])

  return (
    /*{ <Modal
      open={open}
      title={actor.actor.name}
      // onOk={handleOk}
      onCancel={handleOk}
      forceRender
      maskClosable={false}
      centered
      className="modalActors"
      footer={[
        <Button
          key="submit"
          type="primary"
          // loading={loading}
          onClick={handleOk}
        >
          Aceptar
        </Button>
      ]}
    >
      <p className="description">
        A continuación encontrarás el listado completo de los que has agregado. Recuerda que en
        acciones, puedes editarlos o eliminarlos.
      </p> }*/
    <>
      {data && data[actor?.actor?._id].length ?
        <>
          {formSelected && formSelected.length > 0 && (
            <div style={{ width: '100%', maxWidth: '800px', margin: '20px' }}>
              <Collapse
                collapsible="header"
                defaultActiveKey={['1']}
                items={[
                  {
                    key: '1',
                    label: 'Personas: ' + data[actor.actor._id].length,
                    children: <table style={{ width: '100%' }}>
                      <thead className="ant-table-thead">
                        <tr>
                          <th className="ant-table-cell" style={{ textAlign: 'left' }}>{formSelected[0].name}</th>
                          {formSelected[1] &&
                            <th className="ant-table-cell" style={{ textAlign: 'left' }}>{formSelected[1].name}</th>}
                          <th width="10%" className="ant-table-cell">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="ant-table-tbody">
                        {data ? (
                          <React.Fragment>
                            {data[actor.actor._id] &&
                              data[actor.actor._id].map((item, j) => (
                                <tr key={j}>
                                  <td className="ant-table-cell">{item[formSelected[0]._id]}</td>
                                  {formSelected[1] && (
                                    <td className="ant-table-cell">{item[formSelected[1]._id]}</td>
                                  )}

                                  <td className="btn-action ant-table-cell" style={{ textAlign: 'center' }}>
                                    <Tooltip
                                      title="Editar"
                                      overlayClassName="tooltipCustomActor"

                                      color={'#8556ee'}
                                    >
                                      <a className="action-delete">
                                        <EditOutlined onClick={() => handleEdit(j)} />
                                      </a>
                                    </Tooltip>

                                    <Tooltip
                                      title="Eliminar"
                                      overlayClassName="tooltipCustomActor"
                                      color={'#8556ee'}
                                    >
                                      <a className="action-delete" onClick={() => handleDelete(j)}>
                                        <DeleteOutlined />
                                      </a>
                                    </Tooltip>
                                  </td>
                                </tr>
                              ))}
                          </React.Fragment>
                        ) : (
                          <tr></tr>
                        )}
                      </tbody>
                    </table>
                  }
                ]}
              />

            </div>
          )}
        </> : ''
      }

    </>
    /* </Modal> */
  )
}

export default ModalActor
