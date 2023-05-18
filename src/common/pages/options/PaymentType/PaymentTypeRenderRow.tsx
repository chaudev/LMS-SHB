import React, { useEffect, useState } from 'react'
import NestedTable from '~/common/components/NestedTable'

type I = {
	Id: number
}
export const PaymentTypeRenderRow: React.FC<I> = ({ Id }) => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])
	const getData = async (id) => {
		try {
		} catch (error) {}
	}
	useEffect(() => {
		getData(Id)
	}, [Id])

	const columns = [
		{
			title: 'Loại',
			dataIndex: 'Type'
		}
	]

	return (
		<>
			<NestedTable loading={loading} addClass="basic-header" dataSource={data} columns={columns} haveBorder={true} />
		</>
	)
}
