import { Modal, ModalProps } from 'antd'
import React from 'react'

type TMyModal = {} & ModalProps

const MyModal: React.FC<TMyModal> = (props) => {
	return <Modal {...props} />
}

export default MyModal
