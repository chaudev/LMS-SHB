import { Divider, Form, Input, Select, Tooltip } from 'antd'
import { TableRowSelection } from 'antd/lib/table/interface'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { rollUpApi } from '~/api/rollup'
import { scheduleApi } from '~/api/schedule'
import MyModal from '~/atomic/atoms/MyModal'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti } from '~/common/utils'
import { RootState } from '~/store'
import PrimaryButton from '../Primary/Button'
import PrimaryTable from '../Primary/Table'
import StudentByAttenance from './ByAttenance'
import { useMutation } from '@tanstack/react-query'

const dataRollUp = [
	{ value: 1, label: 'Có mặt' },
	{ value: 2, label: 'Vắng có phép' },
	{ value: 3, label: 'Vắng không phép' },
	{ value: 4, label: 'Đi muộn' },
	{ value: 5, label: 'Về sớm' },
	{ value: 6, label: 'Nghĩ lễ' }
]

const InputNote = ({ value, onChange, index }) => {
	const [note, setNote] = useState('')

	const user = useSelector((state: RootState) => state.user.information)

	useEffect(() => {
		setNote(value)
	}, [value])

	function onChangeNote(params, index) {
		setNote(params.target?.value)
		onChange(params, index)
	}

	return (
		<Input
			disabled={user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7 ? false : true}
			onChange={(val) => onChangeNote(val, index)}
			value={note}
			className="rounded-lg mb-0"
		/>
	)
}

const ModalForm = ({ RoleId, rowSelected, onCancel, refetch }) => {
	const [form] = Form.useForm()
	const status = Form.useWatch('Status', form)

	const handleUpdateStatus = useMutation({
		mutationKey: ['PUT /api/RollUp/items'],
		mutationFn: async (data: { Items: any[] }) => await rollUpApi.adds(data),
		onSuccess: () => {
			ShowNoti('success', 'Điểm danh thành công !')
			onCancel()
			form.resetFields()
			refetch()
		},
		onError: (error) => ShowNoti('error', error.message)
	})

	const onFinish = async () => {
		const dataSend = {
			Items: [
				...rowSelected.map((item) => ({
					...item,
					Status: status
				}))
			]
		}
		await handleUpdateStatus.mutateAsync(dataSend)
	}

	return (
		<div className="grid grid-cols-2 gap-2">
			<div className="">
				<span className="mb-4 font-bold text-[14px]">Học viên</span>
				<div className="mt-2 max-h-[300px] scrollable">
					<div className=" h-fit">
						{rowSelected?.map((item, index) => (
							<div key={item?.UserCode} className="py-1">
								<Tooltip
									title={
										<div>
											<span>Mã học viên </span>
											<span> - </span>
											<span>{item?.UserCode}</span>
										</div>
									}
								>
									<span className="font-semibold">
										{++index}. {item?.FullName}
									</span>
								</Tooltip>
							</div>
						))}
					</div>
				</div>
			</div>

			<Form form={form} layout="vertical" className="" onFinish={onFinish}>
				<Form.Item name={'Status'} label="Điểm danh">
					<Select
						className="col-12"
						options={dataRollUp}
						// disabled={user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7 ? false : true}
						disabled={![1, 2, 4, 7].includes(Number(RoleId))}
					/>
				</Form.Item>
			</Form>

			<Divider className="col-span-full !my-2" />

			<div className="col-span-full flex items-center justify-center gap-2">
				<PrimaryButton
					background={'red'}
					type={'button'}
					icon="cancel"
					onClick={() => {
						form.resetFields()
						onCancel()
					}}
				>
					Hủy
				</PrimaryButton>
				<PrimaryButton disable={!status} background={'green'} type={'button'} icon="check" onClick={() => form.submit()}>
					Điểm danh
				</PrimaryButton>
			</div>
		</div>
	)
}

type DataUpdate = {
	StudentId: number
	ScheduleId: number
	Status: number
	LearningStatus: number
	Note: string
}

export const RollUpPage = () => {
	const router = useRouter()
	const user = useSelector((state: RootState) => state.user.information)
	const [loading, setLoading] = useState(false)
	const initParameters = { classId: router.query.class, scheduleId: null, pageIndex: 1, pageSize: PAGE_SIZE }
	const initParametersSchedule = { classId: router.query.class }
	const [apiParameters, setApiParameters] = useState(initParameters)
	const [apiParametersSchedule, setApiParametersSchedule] = useState(initParametersSchedule)
	const [totalRow, setTotalRow] = useState(1)
	const [dataTable, setDataTable] = useState([])
	const [scheduleId, setScheduleId] = useState(null)
	const [dataSchedule, setDataSchedule] = useState<{ title: string; value: string }[]>([])
	const [isUpdate, setIsUpdate] = useState<any>(null)
	const [dataUpdate, setDataUpdate] = useState<DataUpdate[]>([])

	const getSchedule = async (params) => {
		try {
			const res = await scheduleApi.getAll(params)
			if (res.status === 200) {
				let temp = [{ title: 'Bỏ chọn', value: null }]
				res?.data?.data?.forEach((item, index) => {
					temp.push({
						title: `[Buổi ${index + 1}][${moment(item?.StartTime).format('MM/DD')}] ${moment(item?.StartTime).format('HH:mm')} - ${moment(
							item?.EndTime
						).format('HH:mm')}`,
						value: item?.Id
					})
				})
				setDataSchedule(temp)
			}
			if (res.status === 204) {
				setDataSchedule([])
			}
		} catch (error) {
		} finally {
		}
	}

	const getRollUp = async (params) => {
		try {
			setLoading(true)
			const res = await rollUpApi.getAll(params)
			if (res.status === 200) {
				if (scheduleId) {
					setDataTable(res.data.data)
					setTotalRow(res.data.totalRow)
				} else {
					setDataTable([])
				}
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

	const handleChangeStatus = (info, index) => {
		let temp = [...dataTable]
		temp[index] = { ...temp[index], Status: info }

		setDataTable(temp)

		const temporary = dataUpdate.findIndex((e) => e.StudentId === temp[index].StudentId)
		const DATA_HANDLE = {
			StudentId: temp[index].StudentId,
			ScheduleId: temp[index].ScheduleId,
			Status: temp[index].Status,
			LearningStatus: temp[index].LearningStatus,
			Note: temp[index].Note
		}

		if (temporary > -1) {
			let tam = [...dataUpdate]
			tam[temporary] = { ...tam[temporary], Status: info }
			setDataUpdate(tam)
		} else {
			setDataUpdate((prev) => [...prev, DATA_HANDLE])
		}
	}

	const handleChangeLearningStatus = (info, index) => {
		let temp = [...dataTable]
		temp[index] = { ...temp[index], LearningStatus: info }
		setDataTable(temp)

		const temporary = dataUpdate.findIndex((e) => e.StudentId === temp[index].StudentId)
		const DATA_HANDLE = {
			StudentId: temp[index].StudentId,
			ScheduleId: temp[index].ScheduleId,
			Status: temp[index].Status,
			LearningStatus: temp[index].LearningStatus,
			Note: temp[index].Note
		}

		if (temporary > -1) {
			let tam = [...dataUpdate]
			tam[temporary] = { ...tam[temporary], LearningStatus: info }
			setDataUpdate(tam)
		} else {
			setDataUpdate((prev) => [...prev, DATA_HANDLE])
		}
	}

	const handleChangeNote = (info, index) => {
		let temp = [...dataTable]
		temp[index] = { ...temp[index], Note: info.target.value }
		setDataTable(temp)

		const temporary = dataUpdate.findIndex((e) => e.StudentId === temp[index].StudentId)
		const DATA_HANDLE = {
			StudentId: temp[index].StudentId,
			ScheduleId: temp[index].ScheduleId,
			Status: temp[index].Status,
			LearningStatus: temp[index].LearningStatus,
			Note: temp[index].Note
		}

		if (temporary > -1) {
			let tam = [...dataUpdate]
			tam[temporary] = { ...tam[temporary], Note: info.target.value }
			setDataUpdate(tam)
		} else {
			setDataUpdate((prev) => [...prev, DATA_HANDLE])
		}
	}

	// const handleUpdateRollUp = async (data) => {
	// 	try {
	// 		setLoadingUpdate(data.Id)
	// 		const res = await rollUpApi.add(data)
	// 		if (res.status === 200) {
	// 			ShowNoti('success', res.data.message)
	// 			// checkupdate thành công => cập nhật lại biểu đồ thống kê
	// 			setIsUpdate(res.data.data)
	// 		}
	// 		setLoadingUpdate(-1)
	// 	} catch (error) {
	// 		ShowNoti('error', error.message)
	// 		setLoadingUpdate(-1)
	// 	}
	// }

	const handleUpdateRollUp = async (data) => {
		const dataSend = {
			Items: [...data]
		}

		try {
			const res = await rollUpApi.adds(dataSend)
			if (res.status === 200) {
				ShowNoti('success', res.data.message)
				setDataUpdate([])
				// checkupdate thành công => cập nhật lại biểu đồ thống kê
				setIsUpdate(res.data.data)
			}
		} catch (error) {
			ShowNoti('error', error.message)
		}
	}

	// const handleChangeRollUp = (data, index) => {
	// 	const dataSubmit = {
	// 		Id: index,
	// 		StudentId: data?.StudentId,
	// 		ScheduleId: data?.ScheduleId,
	// 		Status: data?.Status,
	// 		LearningStatus: data?.LearningStatus,
	// 		Note: data?.Note
	// 	}
	// 	handleUpdateRollUp(dataSubmit)
	// }

	useEffect(() => {
		if (router?.query?.class) {
			getSchedule(apiParametersSchedule)
		}
	}, [router?.query?.class])

	useEffect(() => {
		if (apiParameters) {
			getRollUp(apiParameters)
		}
	}, [router?.query?.class, apiParameters])

	const columns = [
		{
			title: 'Học viên',
			dataIndex: 'FullName',
			width: 200,
			render: (text) => <p className="font-semibold text-[#B32025]">{text}</p>
		},
		{
			title: 'Điểm danh',
			width: 180,
			dataIndex: 'Status',
			render: (text, item, index) => (
				<div className="antd-custom-wrap">
					<Select
						className="w-[220px] ml-tw-4"
						onChange={(val) => handleChangeStatus(val, index)}
						options={dataRollUp}
						disabled={user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7 ? false : true}
						value={item?.Status}
					/>
				</div>
			)
		},
		{
			title: 'Học lực',
			width: 180,
			dataIndex: 'LearningStatus',
			render: (text, item, index) => (
				<div className="antd-custom-wrap">
					<Select
						className="w-[220px] ml-tw-4"
						onChange={(val) => handleChangeLearningStatus(val, index)}
						options={[
							{ value: 1, label: 'Giỏi' },
							{ value: 2, label: 'Khá' },
							{ value: 3, label: 'Trung bình' },
							{ value: 4, label: 'Kém' },
							{ value: 5, label: 'Theo dõi đặc biệt' },
							{ value: 6, label: 'Có cố gắng' },
							{ value: 7, label: 'Không cố gắng' },
							{ value: 8, label: 'Không nhận xét' }
						]}
						disabled={user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7 ? false : true}
						value={item?.LearningStatus}
					/>
				</div>
			)
		},
		{
			title: 'Đánh giá',
			width: 180,
			dataIndex: 'Note',
			render: (text, item, index) => (
				<div className="antd-custom-wrap">
					<InputNote index={index} onChange={(val, inx) => handleChangeNote(val, inx)} value={text} />
				</div>
			)
		}
		// {
		// 	title: '',
		// 	width: 100,
		// 	dataIndex: 'Action',
		// 	align: 'center',
		// 	render: (text, item, index) => (
		// 		<>
		// 			{user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7 ? (
		// 				<>
		// 					{loadingUpdate == index ? (
		// 						<Spin></Spin>
		// 					) : (
		// 						<IconButton
		// 							tooltip="Cập nhật"
		// 							color="green"
		// 							icon="save"
		// 							type="button"
		// 							onClick={() => handleChangeRollUp(item, index)}
		// 							size={22}
		// 						/>
		// 					)}
		// 				</>
		// 			) : (
		// 				''
		// 			)}
		// 		</>
		// 	)
		// }
	]

	// thêm rowSelection để điểm danh nhanh

	const [rowSelected, setRowSelected] = useState([])
	const [showModal, setShowModal] = useState<boolean>(false)

	const rowSelection: TableRowSelection<any> = {
		selectedRowKeys: rowSelected?.map((item) => item.StudentId.toString()),
		onChange(_, selectedRows) {
			setRowSelected(selectedRows)
		}
	}

	return (
		<>
			<StudentByAttenance scheduleId={apiParameters.scheduleId} isUpdate={isUpdate} />

			<PrimaryTable
				loading={loading}
				total={totalRow}
				onChangePage={(event: number) => setApiParameters({ ...apiParameters, pageIndex: event })}
				TitleCard={
					<div
						className="extra-table"
						style={{
							flex: 1,
							justifyContent: 'space-between'
						}}
					>
						<div className="flex items-center antd-custom-wrap">
							Buổi học:
							<Select
								className="w-[220px] ml-tw-4"
								onChange={(data) => {
									setDataUpdate([])
									setScheduleId(data)
									setApiParameters({ ...apiParameters, scheduleId: data })
								}}
								defaultValue={dataSchedule && dataSchedule[1] && dataSchedule[1].value}
							>
								{dataSchedule &&
									dataSchedule?.length > 0 &&
									dataSchedule?.map((item, index) => (
										<>
											<Select.Option key={index} value={item.value}>
												{item.title}
											</Select.Option>
										</>
									))}
							</Select>
						</div>
						<div>
							{[1, 2, 4, 7].includes(Number(user?.RoleId)) && !!rowSelected.length && !!scheduleId && (
								<PrimaryButton
									// color={dataUpdate.length > 0 ? 'green' : 'disabled'}
									icon="check"
									type="button"
									onClick={() => setShowModal(!showModal)}
									background={'green'} // size={25}
									children="Điểm danh"
									className="mr-2"
								/>
							)}

							{[1, 2, 4, 7].includes(Number(user?.RoleId)) && !!scheduleId ? (
								<PrimaryButton
									// color={dataUpdate.length > 0 ? 'green' : 'disabled'}
									icon="save"
									type="button"
									onClick={() => {
										handleUpdateRollUp(dataUpdate)
									}}
									background={'blue'} // size={25}
									children="Cập nhật"
								/>
							) : (
								''
							)}
						</div>
					</div>
				}
				rowKey={'StudentId'}
				data={dataTable}
				columns={columns}
				rowSelection={rowSelection}
			/>

			<MyModal open={showModal} onCancel={() => setShowModal(!showModal)} title="Cập nhật điểm danh học viên" footer={null}>
				<ModalForm
					RoleId={user?.RoleId}
					rowSelected={rowSelected}
					onCancel={() => {
						setShowModal(!showModal)
						setRowSelected([])
					}}
					refetch={() => {
						if (apiParameters) {
							getRollUp(apiParameters)
						}
					}}
				/>
			</MyModal>
		</>
	)
}
