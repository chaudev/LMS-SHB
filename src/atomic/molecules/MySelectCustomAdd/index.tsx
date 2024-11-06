import { PlusOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from 'antd'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import MyDivider from '~/atomic/atoms/MyDivider'
import MyInput, { TMyInput } from '~/atomic/atoms/MyInput'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'

export type TMySelectCustomAdd = {
	inputProps?: TMyInput
	buttonProps?: ButtonProps
} & TMySelectProps

const MySelectCustomAdd: React.FC<TMySelectCustomAdd> = (props) => {
	const { inputProps, buttonProps, ...rest } = props
	return (
		<MySelect
			{...rest}
			dropdownRender={(menu) => (
				<>
					<div className="grid grid-cols-3 gap-x-2 px-2 py-1">
						<MyInput className="col-span-2" {...inputProps} />
						<Button type="text" className="flex items-center gap-2 h-[36px]" icon={<FiPlus />} {...buttonProps}>
							Thêm mới
						</Button>
					</div>
					<MyDivider marginBottom={8} marginTop={8} />
					{menu}
				</>
			)}
		/>
	)
}

export default MySelectCustomAdd
