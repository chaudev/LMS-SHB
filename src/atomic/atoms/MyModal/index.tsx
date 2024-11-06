import { Modal, ModalProps } from 'antd'
import React from 'react'

export type TMyModalProps = {} & ModalProps

const MyModal: React.FC<TMyModalProps> = (props) => {
	return <Modal {...props} />
}

export default MyModal
