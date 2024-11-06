import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { salaryConfigApi } from '~/api/salary'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ModalSalaryConfigCRUD } from './ModalSalaryConfigCRUD'
import { Input } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
const initParameters = { fullName: '', userCode: '', pageIndex: 1, pageSize: PAGE_SIZE, search: '' }
export const SalaryConfigPage = () => {
	const state = useSelector((state: RootState) => state)
	const { information: userInformation } = state.user
	const [apiParameters, setApiParameters] = useState(initParameters)
	const [totalRow, setTotalRow] = useState(1)
	const [dataTable, setDataTable] = useState([])
	const [loading, setLoading] = useState(false)

	const getSalaryConfig = async (params) => {
		try {
			setLoading(true)
			const res = await salaryConfigApi.getAll(params)
			if (res.status === 200) {
				setDataTable(res.data.data)
				setTotalRow(res.data.totalRow)
			}
			if (res.status === 204) {
				setDataTable([])
			}
		} catch (error) {
			setLoading(true)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (apiParameters) {
			getSalaryConfig(apiParameters)
		}
	}, [apiParameters])

	const columns = [
		{
			width: 100,
			title: 'Mã',
			dataIndex: 'UserCode',
			render: (text) => <p className="font-semibold">{text}</p>
		},
		{
			title: 'Họ tên',
			dataIndex: 'FullName',
			render: (text) => <p className="font-semibold text-[#B32025]">{text}</p>
		},
		{
			title: 'Chức vụ',
			dataIndex: 'RoleId',
			width: 150,
			render: (value, item) => (
				<>
					{value == 1 && <span className="tag green">{item?.RoleName}</span>}
					{value == 2 && <span className="tag blue">{item?.RoleName}</span>}
					{value == 4 && <span className="tag yellow">{item?.RoleName}</span>}
					{value == 5 && <span className="tag blue-weight">{item?.RoleName}</span>}
					{value == 6 && <span className="tag gray">{item?.RoleName}</span>}
					{value == 7 && <span className="tag gray">{item?.RoleName}</span>}
					{value == 8 && <span className="tag gray">{item?.RoleName}</span>}
				</>
			)
		},
		{
			title: 'Mức lương',
			dataIndex: 'Value',
			width: 150,
			render: (text) => <div className="font-[600] text-[#388E3C]">{Intl.NumberFormat('ja-JP').format(text)}₫</div>
		},
		{
			title: 'Thêm lúc',
			dataIndex: 'CreatedOn',
			render: (date) => moment(date).format('DD/MM/YYYY')
		},
		{
			title: 'Ghi chú',
			dataIndex: 'Note',
			width: 200
		},
		{
			fixed: 'right',
			title: '',
			dataIndex: 'Action',
			render: (text, item) => {
				return (
					<div className="flex items-center">
						{checkIncludesRole(listPermissionsByRoles.account.salaryConfig.update, Number(userInformation?.RoleId)) && (
							<ModalSalaryConfigCRUD mode="edit" onRefresh={() => getSalaryConfig(apiParameters)} dataRow={item} />
						)}
						{checkIncludesRole(listPermissionsByRoles.account.salaryConfig.delete, Number(userInformation?.RoleId)) && (
							<ModalSalaryConfigCRUD mode="delete" onRefresh={() => getSalaryConfig(apiParameters)} dataRow={item} />
						)}
					</div>
				)
			}
		}
	]

	return (
		<div className="salaryConfig-page-list">
			<PrimaryTable
				loading={loading}
				total={totalRow}
				onChangePage={(event: number) => setApiParameters({ ...apiParameters, pageIndex: event })}
				TitleCard={
					<div className="flex-1">
						<Input.Search
							className="primary-search max-w-[250px]"
							onChange={(event) => {
								if (event.target.value == '') {
									setApiParameters({ ...apiParameters, pageIndex: 1, search: '' })
								}
							}}
							onSearch={(event) => setApiParameters({ ...apiParameters, pageIndex: 1, search: event })}
							placeholder="Tìm kiếm"
						/>
					</div>
				}
				data={dataTable}
				columns={columns}
				Extra={
					checkIncludesRole(listPermissionsByRoles.account.salaryConfig.create, Number(userInformation?.RoleId)) ? (
						<ModalSalaryConfigCRUD mode="add" onRefresh={() => getSalaryConfig(apiParameters)} />
					) : undefined
				}
			/>
		</div>
	)
}
