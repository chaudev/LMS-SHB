import { Tooltip } from 'antd'
import React, { useState } from 'react'
import { IoMdCheckmark, IoMdCopy } from 'react-icons/io'
import { ShowNoti } from '~/common/utils'

interface ICopyButton {
	value: any
	tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
}

const CopyButton: React.FC<ICopyButton> = (props) => {
	const { value, tooltipPlacement } = props
	const [copied, setCopied] = useState(false)

	const handleCopy = (value) => {
		if (!copied) {
			navigator.clipboard.writeText(value)
			ShowNoti('success', 'Đã sao chép ' + value + '!')
			setCopied(true)
			setTimeout(() => {
				setCopied(false)
			}, 1000)
		}
	}

	return (
		<Tooltip title="Sao chép" placement={tooltipPlacement || 'left'}>
			<button
				className="flex items-center gap-1 cursor-pointer border-[#53535399] hover:bg-[#e3e3e3] hover:border-[#c9c9c9] bg-[#fafafa] rounded px-1 w-fit border"
				onClick={() => {
					handleCopy(value)
				}}
			>
				{!copied ? <IoMdCopy size={18} color="#53535399" /> : <IoMdCheckmark size={18} color="#53535399" />}
				<span className="font-medium">{value}</span>
			</button>
		</Tooltip>
	)
}

export default CopyButton
