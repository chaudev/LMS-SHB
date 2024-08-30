import { DatePicker, Input, Modal, Popconfirm } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { staffSalaryApi } from '~/api/staff-salary'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti } from '~/common/utils'
import { parseToMoney } from '~/common/utils/common'
import FilterTable from '~/common/utils/table-filter'
import { ModalSalaryCRUD } from './ModalSalaryCRUD'
import { ModalTeachingDetail } from './ModalTeachingDetail'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import FilterBaseVer2 from '~/common/components/Elements/FilterBaseVer2'
import PrimaryButton from '~/common/components/Primary/Button'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export const SalaryPage = () => {
	const [valueDate, setValueDate] = useState(moment().subtract(1, 'months'))
	const initParameters = { fullName: '', userCode: '', year: null, month: null, pageIndex: 1, pageSize: PAGE_SIZE, search: '' }
	const [apiParameters, setApiParameters] = useState(initParameters)
	const [totalRow, setTotalRow] = useState(1)
	const [dataTable, setDataTable] = useState([])
	const [loading, setLoading] = useState(false)
	const [time, setTime] = useState(null)

	const router = useRouter()

	useEffect(() => {
		if (valueDate) {
			const year = Number(moment(valueDate).format('YYYY'))
			const month = Number(moment(valueDate).format('MM'))
			setApiParameters({ ...apiParameters, month: month, year: year })
			setTime({ month: month, year: year })
		}
	}, [valueDate])

	useEffect(() => {
		if (!!apiParameters?.year) {
			getSalary(apiParameters)
		}
	}, [apiParameters])

	const theInformation = useSelector((state: RootState) => state.user.information)

	function isAdmin() {
		return theInformation?.RoleId == 1
	}

	function isTeacher() {
		return theInformation?.RoleId == 2
	}

	function isSaler() {
		return theInformation?.RoleId == 5
	}

	function isAccountant() {
		return theInformation?.RoleId == 6
	}

	function isAcademic() {
		return theInformation?.RoleId == 7
	}

	const handleFilterMonth = (data) => {
		setValueDate(data)
	}

	const handleReset = () => {
		if (valueDate) {
			const year = Number(moment(valueDate).format('YYYY'))
			const month = Number(moment(valueDate).format('MM'))
			setApiParameters({ ...initParameters, month: month, year: year })
		}
	}

	const handleSalaryClosing = async () => {
		try {
			const res = await staffSalaryApi.addSalaryClosing()
			if (res.status === 200) {
				ShowNoti('success', res.data.message)
				const year = Number(moment(valueDate).format('YYYY'))
				const month = Number(moment(valueDate).format('MM'))
				setApiParameters({ ...initParameters, month: month, year: year })
			}
		} catch (error) {
			ShowNoti('error', error.message)
		}
	}

	const getSalary = async (params) => {
		try {
			setLoading(true)
			const res = await staffSalaryApi.getAll(params)
			if (res.status == 200) {
				setDataTable(res.data.data)
				setTotalRow(res.data.totalRow)
			} else {
				setDataTable([])
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setLoading(false)
		}
	}

	const columns = [
		{
			...FilterTable({
				type: 'search',
				dataIndex: 'FullName',
				handleSearch: (event) => setApiParameters({ ...apiParameters, fullName: event }),
				handleReset: (event) => handleReset()
			}),
			width: 200,
			title: 'Nhân viên',
			dataIndex: 'FullName',
			render: (text) => <p className="font-semibold text-[#B32025]">{text}</p>
		},
		{
			title: 'Năm',
			width: 80,
			dataIndex: 'Year',
			render: (text) => <>{text}</>
		},
		{
			title: 'Tháng',
			width: 80,
			dataIndex: 'Month',
			render: (text) => <>{text}</>
		},
		{
			title: 'Thưởng',
			width: 80,
			dataIndex: 'Bonus',
			align: 'right',
			render: (text) => <>{parseToMoney(text)}₫</>
		},
		{
			title: 'Ghi chú',
			width: 200,
			dataIndex: 'Note',
			render: (text) => <>{text}</>
		},
		{
			title: 'Trạng thái',
			width: 150,
			dataIndex: 'StatusName',
			render: (text, item) => (
				<>
					<span className={`tag ${item?.Status == 1 ? 'yellow' : item?.Status == 2 ? 'green' : 'blue'}`}>{text}</span>
				</>
			)
		},
		{
			title: 'Trừ tạm ứng',
			width: 150,
			dataIndex: 'Deduction',
			align: 'right',
			render: (text) => <>{parseToMoney(text)}₫</>
		},
		{
			title: 'Lương cơ bản',
			width: 150,
			dataIndex: 'BasicSalary',
			align: 'right',
			render: (text) => <>{parseToMoney(text)}₫</>
		},
		{
			title: 'Lương giảng dạy',
			width: 150,
			dataIndex: 'TeachingSalary',
			align: 'right',
			render: (text) => <>{parseToMoney(text)}₫</>
			// render: (text, item) => <ModalTeachingDetail dataRow={item} />
		},
		{
			title: 'Lương tổng',
			width: 150,
			dataIndex: 'TotalSalary',
			align: 'right',
			render: (text) => <>{parseToMoney(text)}₫</>
		},
		{
			title: '',
			dataIndex: 'Action',
			render: (text, item) => {
				if (isSaler() || isAcademic() || isTeacher()) return ''
				return (
					<div className="flex items-center">
						<ModalTeachingDetail dataRow={item} />
						{(isAdmin() || isAccountant()) && <ModalSalaryCRUD mode="edit" onRefresh={() => getSalary(apiParameters)} dataRow={item} />}
					</div>
				)
			}
		}
	]

	const mutationExportExcel = useMutation({
		mutationKey: ['GET api/Salary/excel'],
		mutationFn: async (params: any) => staffSalaryApi.exportExcel(params),
		onSuccess: (res) => {
			const data = res.data.data;
			router.push(data)
		},
		onError: (error) => ShowNoti('error', error?.message)
	})

	return (
		<div className="salary-page-list">
			<PrimaryTable
				loading={loading}
				total={totalRow}
				onChangePage={(event: number) => setApiParameters({ ...apiParameters, pageIndex: event })}
				TitleCard={
					<div className="extra-table">
						<div className="flex gap-3">
							<FilterBaseVer2
								dataFilter={[
									{
										name: 'status',
										title: 'Trạng thái',
										type: 'select',
										col: 'col-span-2',
										optionList: [
											{ title: 'Chưa chốt', value: 1 },
											{ title: 'Đã chốt', value: 2 },
											{ title: 'Đã thanh toán', value: 3 }
										]
									}
								]}
								handleFilter={(values) => {
									setApiParameters({ ...apiParameters, ...values })
								}}
								handleReset={(value) => {
									setApiParameters(initParameters)
								}}
							/>
							<DatePicker
								onChange={handleFilterMonth}
								picker="month"
								placeholder="Chọn tháng"
								value={valueDate}
								className="min-w-[120px]"
							/>
							<Input.Search
								className="primary-search max-w-[300px]"
								onChange={(event) => {
									if (event.target.value == '') {
										setApiParameters({ ...apiParameters, pageIndex: 1, search: '' })
									}
								}}
								onSearch={(event) => setApiParameters({ ...apiParameters, pageIndex: 1, search: event })}
								placeholder="Tìm kiếm"
							/>
						</div>
					</div>
				}
				data={dataTable}
				columns={columns}
				Extra={
					<>
						{(isAdmin() || isAccountant()) && (
							<div className="flex gap-2">
								<PrimaryButton
									onClick={() => {
										mutationExportExcel.mutateAsync(apiParameters)
									}}
									children="Xuất Excel"
									icon="excel"
									background="red"
									type={'button'}
									disable={dataTable.length <= 0 || mutationExportExcel.isPending}
									loading={mutationExportExcel.isPending}
								/>
								<ModalSalaryCRUD time={time} mode="salary" onRefresh={() => getSalary(apiParameters)} />

								<Popconfirm
									// title={`Xác nhận tính lương từ ${moment().subtract(1, 'months').startOf('month').format('DD-MM-YYYY')} đến ${moment()
									// 	.subtract(1, 'months')
									// 	.endOf('month')
									// 	.format('DD-MM-YYYY')}?`}
									title={
										<div>
											<span className="font-bold">Xác nhận tính lương thủ công</span>
											<div className="flex flex-col gap-1 mt-2">
												<span>Từ ngày: {moment().subtract(1, 'months').startOf('month').format('DD/MM/YYYY')}</span>
												<span>Đến ngày: {moment().subtract(1, 'months').endOf('month').format('DD/MM/YYYY')}</span>
											</div>
										</div>
									}
									okText="Ok"
									cancelText="No"
									onConfirm={handleSalaryClosing}
									placement="topRight"
									icon={null}
								>
									<button
										type="button"
										className={`font-medium none-selection rounded-lg h-[38px] px-3 inline-flex items-center justify-center text-white bg-[#0A89FF] hover:bg-[#157ddd] focus:bg-[#1576cf]`}
									>
										Tính lương tháng trước
									</button>
								</Popconfirm>
							</div>
						)}
					</>
				}
			/>
		</div>
	)
}
