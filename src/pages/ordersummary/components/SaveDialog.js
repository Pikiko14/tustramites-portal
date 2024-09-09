import React, { useContext } from 'react'
import { Modal } from 'antd'
import AuthContext from '../../../context/AuthContext'

import { Button } from 'antd'

const SaveDialog = ({ openDialog, setOpenDialog, callback, message }) => {
  const { user } = useContext(AuthContext)

  const handleOk = () => {
    setOpenDialog(false)
    callback()
  }

  return (
    <>
      <Modal
        open={openDialog}
        title={user ? '¡Genial ' + user.first_name + '!' : '¡Genial!'}
        onOk={handleOk}
        className="modalFinal"
        forceRender
        maskClosable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
        closeIcon={null}
        footer={[
          <Button key="submit" type="primary" className="btnSaveFinal" onClick={handleOk}>
            Guardar
          </Button>
        ]}
      >
        <p className="display-linebreak">{message}</p>
      </Modal>
    </>
  )
}

export default SaveDialog
