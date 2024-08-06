import { Radio, RadioGroupProps, Space, SpaceProps } from 'antd'
import React from 'react'
import { TMyRadio } from '~/atomic/atoms/MyRadio'

export type TMyRadioGroup = {
	radioProps?: TMyRadio
	spaceProps?: SpaceProps
	children?: React.ReactNode
	noSpace?: boolean
} & RadioGroupProps

const MyRadioGroup: React.FC<TMyRadioGroup> = (props) => {
	const { radioProps, spaceProps, children, noSpace, ...rest } = props
	return (
		<Radio.Group {...rest}>
			{!noSpace && (
				<Space direction={spaceProps?.direction || 'vertical'} {...spaceProps}>
					{children}
				</Space>
			)}
			{noSpace && children}
		</Radio.Group>
	)
}

export default MyRadioGroup
