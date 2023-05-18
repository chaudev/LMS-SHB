import { Input, Select } from 'antd'
import React, { useState } from 'react'
import PrimaryTable from '~/common/components/Primary/Table'

type I = {
	dataDetail: any
	setDataDetail: Function
	loading: boolean
}
export const TablePaymentTypeDetail: React.FC<I> = ({ dataDetail, setDataDetail, loading }) => {
	const [data, setData] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const getData = async (number) => {
		try {
			setIsLoading(true)
			let res
		} catch (error) {
			setIsLoading(true)
		} finally {
			setIsLoading(false)
		}
	}
	const handleChangeType = (info, index) => {
		let temp = [...dataDetail]
		temp[index] = { ...temp[index], Type: info }
		setDataDetail(temp)
	}
	const columns = [
		{
			title: 'Loại',
			width: 150,
			dataIndex: 'Type',
			render: (text, item, index) => (
				<>
					<Select
						className="w-full primary-input"
						placeholder="Chọn loại"
						showSearch
						allowClear
						value={text}
						onChange={(val) => handleChangeType(val, index)}
					>
						{item?.Index === 1 && <Select.Option value={1}>Đăng ký ngành học</Select.Option>}
						<Select.Option value={2}>Thay đổi tình trạng hồ sơ</Select.Option>
						<Select.Option value={3}>Thay đổi tình trạng tiếng</Select.Option>
						<Select.Option value={4}>Thay đổi tình trạng visa </Select.Option>
						<Select.Option value={5}>Thay đổi tình trạng xử lý hồ sơ </Select.Option>
					</Select>
				</>
			)
		},
		{
			title: 'Tình trạng',
			width: 150,
			dataIndex: 'ValueId',
			render: (text, item, index) => (
				<>
					<Select
						onFocus={() => getData(item?.Type)}
						className="w-full primary-input"
						placeholder="Chọn tình trạng"
						showSearch
						allowClear
						value={text}
                        loading={isLoading}
					>
						<Select.Option value={2}>Thay đổi tình trạng hồ sơ</Select.Option>
						<Select.Option value={3}>Thay đổi tình trạng tiếng</Select.Option>
					</Select>
				</>
			)
		},
		{
			title: 'Phần trăm tiền',
			width: 150,
			dataIndex: 'ValueId',
			render: (text, item, index) => (
				<div className="antd-custom-wrap">
					<Input className="primary-input flex-1" type="number" placeholder="Nhập số phần trăm" value={text} />
				</div>
			)
		}
	]
	return (
		<>
			<PrimaryTable loading={loading} data={dataDetail} columns={columns} />
		</>
	)
}
