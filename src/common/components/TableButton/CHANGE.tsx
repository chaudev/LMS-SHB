import React, { FC } from 'react'
import { CgArrowsExchange } from 'react-icons/cg'

type TButtonChange = {
	className?: string
	onClick?: Function
	onBlur?: Function
	size?: number
}

// Color: orange
const mainClass = 'text-[#B32025] hover:text-[#1976D2] active:text-[#B32025] cursor-pointer none-selection'

const ButtonChange: FC<TButtonChange> = (props) => {
	const { className, onClick, onBlur, size } = props

	function _onClick() {
		if (onClick) onClick()
	}

	function _onBlur() {
		if (onClick) onBlur()
	}

	return (
		<div onClick={_onClick} onBlur={_onBlur} className={`${className || ''} ${mainClass}`}>
			<CgArrowsExchange size={size || 26} />
		</div>
	)
}

export default ButtonChange
