import React, { FC } from 'react'

const PrimaryTag: FC<IPrimaryTag> = (props) => {
	const { color, children, className, width = 'w-auto' } = props

	function getBG() {
		if (color == 'green') {
			return 'bg-[#4CAF50]'
		}
		if (color == 'blue') {
			return 'bg-[#0A89FF]'
		}
		if (color == 'red') {
			return 'bg-[#C94A4F]'
		}
		if (color == 'yellow') {
			return 'bg-[#FFBA0A]'
		}
		if (color == 'black') {
			return 'bg-[#000]'
		}
		if (color == 'primary') {
			return 'bg-[#B32025]'
		}
		if (color == 'disabled') {
			return 'bg-[#CFD8DC]'
		}
		if (color == 'orange') {
			return 'bg-[#ff7c38]'
		}
	}

	function getColor() {
		if (color == 'green') {
			return 'text-white'
		}
		if (color == 'blue') {
			return 'text-white'
		}
		if (color == 'red') {
			return 'text-white'
		}
		if (color == 'yellow') {
			return 'text-black'
		}
		if (color == 'primary') {
			return 'text-white'
		}
		if (color == 'black') {
			return 'text-white'
		}
		if (color == 'disabled') {
			return 'text-gray-800'
		}
		if (color == 'orange') {
			return 'text-white'
		}
	}

	return <div className={`rounded-lg px-3 py-1  inline-flex items-center text-[500] ${getBG()} ${getColor()} ${width} ${className}`}>{children}</div>
}

export default PrimaryTag
