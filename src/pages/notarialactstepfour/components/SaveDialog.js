import React, { useContext } from 'react'
import { Modal } from 'antd'
import AuthContext from '../../../context/AuthContext'

import { Button } from 'antd'

const SaveDialog = ({ openDialog, setOpenDialog, callback }) => {
  const { user } = useContext(AuthContext)

  const handleOk = () => {
    setOpenDialog(false)
    callback()
  }

  return (
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
      <p className="centrar">
        Ahora vamos a confirmar el valor cobrado por la Notaría de acuerdo a toda la información que
        nos has suministrado, ya que este valor puede variar dependiendo de la cantidad de
        solicitantes, del número de páginas del documento final, etc.
        <br /> <br />
        Apenas nos respondan te estaremos enviando un mensaje a tu correo para que puedas continuar
        con el pago.
      </p>
    </Modal>
  )
}

export default SaveDialog
