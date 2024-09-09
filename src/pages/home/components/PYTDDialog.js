import React from 'react'

import { Modal, Button } from 'antd'

const PTYDDialog = ({ page, data, setData, callback }) => {
  const handleOk = () => {
    setData(null)
    callback(true)
  }

  const handleCancel = () => {
    setData(null)
    callback(false)
  }

  return (
    <Modal
      open={data}
      onOk={handleOk}
      onCancel={handleOk}
      forceRender
      centered
      maskClosable={false}
      className="modalPYTD"
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          Aceptar términos
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>
      ]}
    >
      <div
        dangerouslySetInnerHTML={{
          __html:
            page &&
            page.content
              .replace('oembed', 'embed')
              .replace('url', 'src')
              .replace('</oembed>', '</embed>')
              .replace('watch?v=', 'embed/')
        }}
      />
    </Modal>
  )
}

export default PTYDDialog
