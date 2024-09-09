import React from 'react'
import { Button, Row, Col, Form, Input } from 'antd'
//COMPONENTS
import DataTable from '../../../../../../components/table/DataTable'
import ActionTable from '../../../../../../components/table/ActionTable'
import Alert from '../../../../../../helpers/alert/Alert'
import { PlusCustomIcon } from '../../../../../../components/icons/Icons'

const FormProcedure = ({ dataSummary, setDataSummary }) => {
  const [form] = Form.useForm()
  const { TextArea } = Input

  const columns = [
    {
      title: 'Detalle',
      dataIndex: 'detail',
      key: 'deyail'
      // render: (text) => <a>{text}</a>
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text) => (
        <span>
          {'$ ' +
            parseInt(text)
              .toFixed(1)
              .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
        </span>
      )
    },
    {
      title: 'Acción',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <ActionTable handleEdit={() => handleEdit(record)} handleDelete={() => showAlert(record)} />
      )
    }
  ]

  const handleEdit = (item) => {
    var array = [...dataSummary]
    for (let i = 0; i < array.length; i++) {
      if (item.detail === array[i].detail && item.total === array[i].total) {
        array.splice(i, 1)
      }
    }
    setDataSummary(array)
    form.setFieldsValue(item)
  }

  const handleDelete = (item) => {
    var array = [...dataSummary]
    for (let i = 0; i < array.length; i++) {
      if (item.detail === array[i].detail && item.total === array[i].total) {
        array.splice(i, 1)
      }
    }
    setDataSummary(array)
  }

  const showAlert = (item) => {
    Alert.show({
      type: 'warning',
      title: 'Confirmación',
      message: `¿Está seguro que desea eliminar este elemento?`,
      btnOk: 'Aceptar',
      fnOk: () => {
        handleDelete(item)
      },
      btnCancel: 'Cancelar',
      fnCancel: () => {}
    })
  }

  const onFinish = (values) => {
    var array = [...dataSummary]
    array.push(values)
    setDataSummary(array)
    let data = { detail: '', total: '' }
    form.setFieldsValue(data)
  }
  const onFinishFailed = () => {}

  return (
    <>
      <Form
        name="basic"
        autoComplete="off"
        className="formAdd"
        layout="vertical"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h2 className="titleIngresarInfo">{'Si necesitas agregar uno nuevo'}</h2>
        <Form.Item
          className="spaceLabel"
          label="Detalle"
          name="detail"
          rules={[
            {
              required: true,
              message: 'Detalle requerido!'
            },
            {
              min: 4,
              message: 'El detalle debe tener al menos 4 caracteres'
            },
            {
              max: 80,
              message: 'El detall debe tener como maximo 80 caracteres'
            }
          ]}
          hasFeedback
        >
          <TextArea className="textArea" rows={4} autoSize={{ maxRows: 4, minRows: 4 }} />
        </Form.Item>

        <Form.Item
          className="spaceLabel"
          label="Total: "
          name="total"
          rules={[
            {
              required: true,
              message: 'Total requerido!'
            }
          ]}
          hasFeedback
        >
          <Input className="input-dynamic" type="number" aria-controls="none" />
        </Form.Item>

        <Button className="" type="primary" htmlType="submit">
          <PlusCustomIcon />
          Agregar
        </Button>
      </Form>

      <div className="main-card card">
        <DataTable
          columns={columns}
          data={dataSummary}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </>
  )
}

export default FormProcedure
