import { Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { transcriptApi } from '~/api/transcript'
import { ShowNoti } from '~/common/utils'
import { RootState } from '~/store'
import PrimaryButton from '../Primary/Button'
import PrimaryTable from '../Primary/Table'
import { ModalTranscript } from './ModalTranscript'

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

export const TranscriptPage = () => {
	const user = useSelector((state: RootState) => state.user.information)
	const [loading, setLoading] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [dataTable, setDataTable] = useState([])
	const [transcriptId, setTranscriptId] = useState(null)
	const [disabled, setDisabled] = useState(true)
	const [dataTranscript, setDataTranscript] = useState<{ title: string; value: string }[]>([])

	const currentClassDetails = useSelector((state: RootState) => state.classState.currentClassDetails)

	const handleChangeListening = (info, index) => {
		let temp = [...dataTable]
		temp[index] = { ...temp[index], Listening: info.target.value }
		setDataTable(temp)
		setDisabled(false)
	}

	const handleChangeSpeaking = (info, index) => {
		let temp = [...dataTable]
		temp[index] = { ...temp[index], Speaking: info.target.value }
		setDataTable(temp)
		setDisabled(false)
	}

	const handleChangeReading = (info, index) => {
		let temp = [...dataTable]
		temp[index] = { ...temp[index], Reading: info.target.value }
		setDataTable(temp)
		setDisabled(false)
	}

	const handleChangeWriting = (info, index) => {
		let temp = [...dataTable]
		temp[index] = { ...temp[index], Writing: info.target.value }
		setDataTable(temp)
		setDisabled(false)
	}

	const handleChangeGrammar = (info, index) => {
		let temp = [...dataTable]
		temp[index] = { ...temp[index], Grammar: info.target.value }
		setDataTable(temp)
		setDisabled(false)
	}

	const handleChangeMedium = (info, index) => {
		let temp = [...dataTable]
		temp[index] = { ...temp[index], Medium: info.target.value }
		setDataTable(temp)
		setDisabled(false)
	}

	const handleChangeStatus = (info, index) => {
		let temp = [...dataTable]
		temp[index] = { ...temp[index], PassOrFail: info }
		setDataTable(temp)
		setDisabled(false)
	}

	const handleChangeNote = (info, index) => {
		console.log('--- info.target.value: ', info.target.value)

		let temp = [...dataTable]
		temp[index] = { ...temp[index], Note: info.target.value }
		setDataTable(temp)
		setDisabled(false)
	}

	const [loadingData, setLoadingData] = useState<boolean>(false)

	const getTranscriptByClass = async (Id) => {
		setLoadingData(true)
		try {
			const res = await transcriptApi.getTranscriptByClass(Id)
			if (res.status === 200) {
				let temp = []
				res?.data?.data?.forEach((item) => {
					temp.push({ title: item?.Name, value: item?.Id })
				})
				setDataTranscript(temp)
			}
			if (res.status === 204) {
				setDataTranscript([])
			}
		} catch (error) {
		} finally {
			setLoadingData(false)
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
			getTranscriptByClass(currentClassDetails?.Id)
		}
	}, [currentClassDetails?.Id])

	const columns = [
		{
			fixed: 'left',
			title: 'Học viên',
			dataIndex: 'StudentName',
			width: 200,
			render: (text, item) => (
				<>
					<p className="text-primary font-[600]">{text}</p>
					<p className="text-[14px]">{item?.StudentCode}</p>
				</>
			)
		},
		{
			title: 'Đọc',
			width: 80,
			dataIndex: 'Reading',
			render: (text, item, index) => (
				<>
					<div className="antd-custom-wrap">
						<Input
							disabled={user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7 ? false : true}
							onChange={(val) => handleChangeReading(val, index)}
							value={item?.Reading}
							className="rounded-lg h-[36px] text-center"
						/>
					</div>
				</>
			)
		},
		{
			title: 'Nghe',
			width: 80,
			dataIndex: 'Listening',
			render: (text, item, index) => (
				<div className="antd-custom-wrap">
					<Input
						disabled={user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7 ? false : true}
						onChange={(val) => handleChangeListening(val, index)}
						value={item?.Listening}
						className="rounded-lg h-[36px] text-center"
					/>
				</div>
			)
		},
		{
			title: 'Viết',
			width: 80,
			dataIndex: 'Writing',
			render: (text, item, index) => (
				<>
					<div className="antd-custom-wrap">
						<Input
							disabled={user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7 ? false : true}
							onChange={(val) => handleChangeWriting(val, index)}
							value={item?.Writing}
							className="rounded-lg h-[36px] text-center"
						/>
					</div>
				</>
			)
		},
		{
			title: 'Ngữ pháp',
			width: 96,
			dataIndex: 'Grammar',
			render: (text, item, index) => (
				<>
					<div className="antd-custom-wrap">
						<Input
							disabled={user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7 ? false : true}
							onChange={(val) => handleChangeGrammar(val, index)}
							value={item?.Grammar}
							className="rounded-lg h-[36px] text-center"
						/>
					</div>
				</>
			)
		},
		{
			title: 'Nói',
			width: 80,
			dataIndex: 'Speaking',
			render: (text, item, index) => (
				<>
					<div className="antd-custom-wrap">
						<Input
							disabled={user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7 ? false : true}
							onChange={(val) => handleChangeSpeaking(val, index)}
							value={item?.Speaking}
							className="rounded-lg h-[36px] text-center"
						/>
					</div>
				</>
			)
		},
		{
			title: 'Tổng',
			width: 80,
			dataIndex: 'Medium',
			render: (text, item, index) => (
				<>
					<div className="antd-custom-wrap">
						<Input
							disabled={user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7 ? false : true}
							onChange={(val) => handleChangeMedium(val, index)}
							value={item?.Medium}
							className="rounded-lg h-[36px] text-center"
						/>
					</div>
				</>
			)
		},
		{
			title: 'Trạng thái',
			width: 100,
			dataIndex: 'PassOrFail',
			render: (text, item, index) => (
				<>
					<div className="antd-custom-wrap">
						<Select
							onChange={(val) => handleChangeStatus(val, index)}
							value={item?.PassOrFail}
							allowClear
							className="primary-input !h-[34px] w-[100px]"
							placeholder="Chọn"
						>
							<Select.Option key="false" value={false}>
								Trượt
							</Select.Option>
							<Select.Option key="true" value={true}>
								Đỗ
							</Select.Option>
						</Select>
					</div>
				</>
			)
		},
		{
			title: 'Nhận xét',
			width: 180,
			dataIndex: 'Note',
			render: (text, item, index) => {
				return <InputNote onChange={(x, y) => handleChangeNote(x, y)} value={text} index={index} />
			}
		}
	]

	return (
		<>
			<PrimaryTable
				className="shadow-sm"
				loading={loading}
				TitleCard={
					<div className="flex w-full items-center">
						<div className="flex-1">
							{(user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7) && (
								<div className="extra-table">
									<ModalTranscript
										mode="add"
										onRefresh={() => getTranscriptByClass(currentClassDetails?.Id)}
										setTranscriptId={setTranscriptId}
									/>
								</div>
							)}
						</div>

						<div className="flex items-center">
							<div className="font-bold !hidden w1150:!block">Đợt thi:</div>

							<div className="antd-custom-wrap">
								<Select
									className="w-[140px] ml-tw-4 custom-select-transcript"
									onChange={(val) => setTranscriptId(val)}
									placeholder="Chọn đợt thi"
									value={transcriptId}
								>
									{dataTranscript?.map((item, index) => (
										<Select.Option key={index} value={item.value}>
											{item.title}
										</Select.Option>
									))}
								</Select>
							</div>

							{(user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7) && (
								<div className="mr-[8px] ml-[8px]">
									<ModalTranscript
										mode="delete"
										Id={transcriptId}
										onRefresh={() => getTranscriptByClass(currentClassDetails?.Id)}
										setTranscriptId={setTranscriptId}
									/>
								</div>
							)}

							{(user?.RoleId == 2 || user?.RoleId == 1 || user?.RoleId == 4 || user?.RoleId == 7) && (
								<PrimaryButton background="green" type="button" icon="save" disable={disabled} onClick={handleSave} loading={isLoading}>
									Cập nhật
								</PrimaryButton>
							)}
						</div>
					</div>
				}
				data={dataTable}
				columns={loadingData ? [] : columns}
			/>
		</>
	)
}
