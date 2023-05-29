import { DatePicker, Input, Select } from 'antd'
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

const initFilter = { pageSize: PAGE_SIZE, pageIndex: 1, year: null, month: null }

export const StudentReport = () => {
	const user = useSelector((state: RootState) => state.user.information)
	const [loading, setLoading] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [dataTable, setDataTable] = useState([])
	const [transcriptId, setTranscriptId] = useState(null)

	const [filter, setFilter] = useState(initFilter)

	const currentClassDetails = useSelector((state: RootState) => state.classState?.currentClassDetails)

	const [loadingData, setLoadingData] = useState<boolean>(false)

	useEffect(() => {
		if (filter?.year) {
			getStudentPointRecord()
		}
	}, [filter])

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

	const columns = [
		{
			title: 'Học viên',
			dataIndex: 'StudentName',
			width: 200,
			render: (text, item) => (
				<>
					<p className="text-primary font-[600]">{text}</p>
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
				<>
					<PrimaryTooltip place="left" id={`tooltip-${item?.Id}`} content="Xuất file">
						<div onClick={() => handleExportFile(item)} className="w-[24px] cursor-pointer h-[24px] flex items-center justify-center">
							{exporting != item?.Id && <BsFillFileEarmarkPdfFill size={18} color="#1E88E5" />}
							{exporting == item?.Id && <BaseLoading.Blue />}
						</div>
					</PrimaryTooltip>
				</>
			)
		}
	]

	const [creating, setCreating] = useState<boolean>(false)
	const [selectedDate, setSelectedDate] = useState(null)

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

					<div className="flex items-center">
						<div className="antd-custom-wrap">
							<DatePicker
								className="w-[160px]"
								placeholder="Chọn tháng, năm"
								picker="month"
								format="MM/YYYY"
								onChange={(event) => setSelectedDate(!event ? event : moment(event))}
							/>
						</div>
					</div>
				</div>
			}
			dataSource={dataTable}
			columns={loadingData ? [] : columns}
			expandable={expandedRowRender}
		/>
	)
}
