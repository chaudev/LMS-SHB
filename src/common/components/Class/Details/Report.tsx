import { DatePicker, Input, Popconfirm, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { transcriptApi } from '~/api/transcript'
import { ShowNostis, ShowNoti } from '~/common/utils'
import { RootState } from '~/store'
import PrimaryTable from '../../Primary/Table'
import PrimaryButton from '../../Primary/Button'
import { studentPointRecordApi } from '~/api/class/report'
import moment from 'moment'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import NestedTable from '../../NestedTable'
import ExpandTable from '../../Primary/Table/ExpandTable'
import PrimaryTag from '../../Primary/Tag'
import ReportForm from './ReportForm'
import IconButton from '../../Primary/IconButton'
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'
import PrimaryTooltip from '../../PrimaryTooltip'
import BaseLoading from '../../BaseLoading'
import { Trash2 } from 'react-feather'
import { IoClose } from 'react-icons/io5'
import FilterBaseVer2 from '../../Elements/FilterBaseVer2'
import { profileStatusApi } from '~/api/profile-status'
import { officeApi } from '~/api/office'
import { foreignLanguageApi } from '~/api/foreign-language'

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
// const initFilter = { pageSize: PAGE_SIZE, pageIndex: 1, year: initYear, month: initMonth }

export const StudentReport = () => {
	const user = useSelector((state: RootState) => state.user.information)
	const [loading, setLoading] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [dataTable, setDataTable] = useState([])
	const [transcriptId, setTranscriptId] = useState(null)

	function subtractOneMonthFromDate() {
		// Kiểm tra đầu vào là kiểu Date hoặc chuỗi ngày hợp lệ

		let date = new Date()

		// Trừ đi 1 tháng
		date.setMonth(date.getMonth() - 1)

		// Trả về ngày đã được trừ đi 1 tháng
		return date
	}

	const initFilter = {
		pageSize: PAGE_SIZE,
		pageIndex: 1,
		year: moment(subtractOneMonthFromDate()).format('YYYY'),
		month: moment(subtractOneMonthFromDate()).format('MM'),
		foreignLanguageId: null,
		officeId: null
	}
	const [foreinLanguage, setForeinLanguage] = useState([])
	const [office, setOffice] = useState([])

	const [filter, setFilter] = useState(initFilter)

	const currentClassDetails = useSelector((state: RootState) => state.classState?.currentClassDetails)

	const [loadingData, setLoadingData] = useState<boolean>(false)

	const [creating, setCreating] = useState<boolean>(false)

	const [selectedDate, setSelectedDate] = useState(moment(subtractOneMonthFromDate()))

	useEffect(() => {
		if (filter?.year) {
			getStudentPointRecord()
		}
		console.log('filter', filter)
	}, [filter])
	useEffect(() => {
		getForeignLanguage()
		getOffices()
	}, [])

	const getForeignLanguage = async () => {
		try {
			const res = await foreignLanguageApi.getAll({ pageIndex: 1, pageSize: 99999 })
			if (res.status === 200) {
				let temp = []
				res.data.data?.forEach((item) => {
					temp.push({ title: item?.Name, value: item?.Id })
				})
				setForeinLanguage(temp)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}
	const getOffices = async () => {
		try {
			const res = await officeApi.getAll({ pageIndex: 1, pageSize: 99999 })
			if (res.status === 200) {
				let temp = []
				res.data.data?.forEach((item) => {
					temp.push({ title: item?.Name, value: item?.Id })
				})
				setOffice(temp)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getStudentPointRecord = async () => {
		setLoading(true)
		try {
			const res: any = await studentPointRecordApi.getAll({ ...filter, classId: currentClassDetails?.Id })
			if (res.status == 200) {
				setDataTable(res.data.data)
				setLoading(false)
			} else {
				setDataTable([])
			}
		} catch (error) {
			ShowNostis.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	const getTranscriptPoint = async (Id) => {
		setLoadingData(true)
		try {
			setLoading(true)
			const res = await transcriptApi.getTranscriptPoint(Id)
			if (res.status === 200) {
				setDataTable(res.data.data)
				setLoading(false)
			}
			if (res.status === 204) {
				setDataTable([])
			}
		} catch (error) {
			setLoading(true)
		} finally {
			setLoading(false)
			setLoadingData(false)
		}
	}

	const handleUpdatePoint = async (data) => {
		try {
			setIsLoading(true)
			const res = await transcriptApi.updatePoint(data)
			if (res.status === 200) {
				ShowNoti('success', res.data.message)
				setIsLoading(false)
			}
		} catch (error) {
			ShowNoti('error', error.message)
			setIsLoading(true)
		} finally {
			setIsLoading(false)
		}
	}

	const handleSave = () => {
		const dataSubmit = {
			Id: transcriptId,
			Items: dataTable
		}
		handleUpdatePoint(dataSubmit)
	}

	useEffect(() => {
		if (transcriptId) {
			getTranscriptPoint(transcriptId)
		}
	}, [transcriptId])

	useEffect(() => {
		if (currentClassDetails?.Id) {
			getStudentPointRecord()
		}
	}, [currentClassDetails?.Id])

	const handleDelete = async (data) => {
		try {
			setIsLoading(true)
			const res = await studentPointRecordApi.delete(data)
			if (res.status === 200) {
				ShowNoti('success', res.data.message)
				getStudentPointRecord()
				setIsLoading(false)
			}
		} catch (error) {
			ShowNoti('error', error.message)
			setIsLoading(true)
		} finally {
			setIsLoading(false)
		}
	}

	const columns = [
		{
			title: 'Học viên',
			dataIndex: 'StudentName',
			width: 200,
			render: (text, item) => (
				<>
					<p className="font-weight-primary">{text}</p>
					<p className="text-[14px]">{item?.UserCode}</p>
				</>
			)
		},
		{
			title: 'Trình độ',
			dataIndex: 'LevelName',
			className: 'min-w-[100px]'
		},
		{
			title: 'Văn phòng',
			dataIndex: 'OfficeName',
			className: 'min-w-[100px]'
		},
		{
			title: '',
			width: 100,
			dataIndex: 'PassOrFail',
			render: (text, item) => (
				<div className="flex items-center">
					<PrimaryTooltip className="w-full px-[8px]" place="left" content="Xoá" id={`remove-sc-${item?.Id}`}>
						<Popconfirm placement="left" title="Xoá báo cáo này?" onConfirm={() => handleDelete(item?.Id)}>
							<div className="w-[24px] cursor-pointer h-[24px] flex items-center justify-center text-[#C94A4F] hover:text-[#b43f43] focus:text-[#9f3136]">
								<IoClose size={22} />
							</div>
						</Popconfirm>
					</PrimaryTooltip>

					<PrimaryTooltip place="left" id={`tooltip-${item?.Id}`} content="Xuất file">
						<div onClick={() => handleExportFile(item)} className="w-[24px] cursor-pointer h-[24px] flex items-center justify-center">
							{exporting != item?.Id && <BsFillFileEarmarkPdfFill size={18} color="#1E88E5" />}
							{exporting == item?.Id && <BaseLoading.Blue />}
						</div>
					</PrimaryTooltip>
				</div>
			)
		}
	]

	useEffect(() => {
		if (!selectedDate) setFilter({ ...filter, year: null, month: null })
		else setFilter({ ...filter, year: moment(selectedDate).format('YYYY'), month: moment(selectedDate).format('MM') })
	}, [selectedDate])

	const handleCreateReport = async () => {
		try {
			setCreating(true)
			const res = await studentPointRecordApi.add({
				ClassId: currentClassDetails?.Id,
				Year: moment(selectedDate).format('YYYY'),
				Month: moment(selectedDate).format('MM')
			})
			if (res.status === 200) {
				ShowNoti('success', res.data?.message)
				getStudentPointRecord()
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setCreating(false)
		}
	}

	const [exporting, setExporting] = useState(false)

	const handleDownload = (downloadUrl) => {
		const link = document.createElement('a')
		link.href = downloadUrl
		link.target = '_blank'
		link.download = 'Example-PDF-File'

		link.click()
	}

	const handleExportFile = async (param) => {
		try {
			setExporting(param?.Id)
			const res = await studentPointRecordApi.exportFile(param?.Id)
			if (res.status == 200) {
				handleDownload(res.data?.data?.PDFUrl)
				ShowNoti('success', res.data?.message)
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setExporting(null)
		}
	}

	const expandedRowRender = (data) => {
		const thisTranscript = !data?.Transcript ? [] : JSON.parse(data?.Transcript)

		const transcriptColumns = [
			{
				title: 'Bài kiểm tra',
				dataIndex: 'TermName'
			},
			{
				title: 'Đọc',
				width: 70,
				align: 'center',
				dataIndex: 'Reading'
			},
			{
				title: 'Nghe',
				width: 70,
				align: 'center',
				dataIndex: 'Listening'
			},
			{
				title: 'Viết',
				width: 70,
				align: 'center',
				dataIndex: 'Writing'
			},
			{
				title: 'Ngữ pháp',
				width: 96,
				align: 'center',
				dataIndex: 'Grammar'
			},
			{
				title: 'Nói',
				width: 70,
				align: 'center',
				dataIndex: 'Speaking'
			},
			{
				title: 'Tổng',
				width: 70,
				align: 'center',
				dataIndex: 'Medium'
			},
			{
				title: 'Trạng thái',
				width: 100,
				dataIndex: 'PassOrFail',
				render: (text, item) => {
					if (text) {
						return (
							<PrimaryTag color="green" className="!w-[62px] flex justify-center">
								Đỗ
							</PrimaryTag>
						)
					}
					return <PrimaryTag color="red">Trượt</PrimaryTag>
				}
			},
			{
				title: 'Nhận xét',
				width: 180,
				dataIndex: 'Note'
			}
		]

		function onUpdateItem(params) {
			const thisItemIndex = dataTable.findIndex((item) => item.Id == params?.Id)
			dataTable[thisItemIndex] = { ...dataTable[thisItemIndex], ...params }
			setDataTable([...dataTable])
		}

		return (
			<>
				<ReportForm data={data} onUpdateItem={onUpdateItem} />

				<NestedTable
					Extra="Chuyên cần"
					addClass="basic-header hide-pani"
					dataSource={[{ TotalLessons: data?.TotalLessons, Attend: data?.Attend, Unexcused: data?.Unexcused }]}
					columns={[
						{
							title: 'Tổng số buổi',
							dataIndex: 'TotalLessons',
							width: 70,
							align: 'center',
							className: 'font-[500]'
						},
						{
							title: 'Số buổi có mặt',
							width: 70,
							align: 'center',
							dataIndex: 'Attend',
							className: 'font-[500]'
						},
						{
							title: 'Nghỉ không phép',
							width: 70,
							align: 'center',
							dataIndex: 'Unexcused',
							className: 'font-[500]'
						}
					]}
					haveBorder={true}
				/>

				<NestedTable
					Extra="Kết quả học tập"
					addClass="basic-header"
					dataSource={thisTranscript}
					columns={transcriptColumns}
					haveBorder={true}
				/>
			</>
		)
	}

	return (
		<ExpandTable
			className="shadow-sm"
			loading={loading}
			TitleCard={
				<div className="flex w-full items-center">
					<div className="flex-1">
						{(user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7) && (
							<div className="extra-table">
								<PrimaryButton
									disable={!selectedDate}
									loading={creating}
									onClick={handleCreateReport}
									icon="add"
									background="green"
									type="button"
								>
									Tạo báo cáo
								</PrimaryButton>
							</div>
						)}
					</div>

					<div className="flex items-center gap-3">
						<DatePicker
							defaultValue={moment(subtractOneMonthFromDate())}
							className="w-[160px] primary-input"
							placeholder="Chọn tháng, năm"
							picker="month"
							format="MM/YYYY"
							onChange={(event) => setSelectedDate(!event ? event : moment(event))}
						/>
						<FilterBaseVer2
							dataFilter={[
								{
									name: 'foreignLanguageId',
									title: 'Trình độ',
									type: 'select',
									col: 'col-span-2',
									optionList: foreinLanguage
								},
								{
									name: 'officeId',
									title: 'Văn phòng',
									type: 'select',
									col: 'col-span-2',
									optionList: office
								}
							]}
							handleFilter={(params) => {
								setFilter({ ...filter, ...params })
							}}
							handleReset={(value) => {
								setFilter(initFilter)
							}}
						></FilterBaseVer2>
					</div>
				</div>
			}
			dataSource={dataTable}
			columns={loadingData ? [] : columns}
			expandable={expandedRowRender}
		/>
	)
}
