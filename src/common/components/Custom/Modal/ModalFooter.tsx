import React, { FC } from 'react'
import PrimaryButton from '../../Primary/Button'

const ModalFooter = (props) => {
	const { hideCancel, hideOK, cancelText, buttonFull, okText, children, layout, position, onCancel, onOK, loading, disable } = props

	function getLayout() {
		return layout == 'vertical' ? 'flex flex-col' : layout == 'horizontal' ? 'flex flex-column' : 'inline-flex'
	}

	function getPosition() {
		return position == 'end' ? 'justify-end' : position == 'left' ? 'justify-start' : 'justify-center'
	}

	return (
		<div
			className={`${getLayout()} ${getPosition()} w-full ${buttonFull ? 'flex' : ''}`}
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				paddingLeft: 180,
				paddingRight: 125
			}}
		>
			{!hideCancel && (
				<PrimaryButton
					className={`${buttonFull ? 'flex-1' : ''}`}
					onClick={() => !!onCancel && onCancel()}
					background="green"
					icon="add"
					type="button"
				>
					{cancelText || 'Thêm'}
				</PrimaryButton>
			)}

			{!hideCancel && !hideOK && <div className="ml-3 mt-2" />}

			{!hideOK && (
				<PrimaryButton
					className={`${buttonFull ? 'flex-1' : ''}`}
					loading={loading}
					disable={disable}
					onClick={() => !!onOK && onOK()}
					type="button"
					icon="save"
					background="primary"
				>
					{okText || 'Lưu'}
				</PrimaryButton>
			)}
			{children}
		</div>
	)
}

export default ModalFooter
