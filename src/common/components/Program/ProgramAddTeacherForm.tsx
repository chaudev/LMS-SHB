import { Checkbox, Modal, Spin, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { programApi } from '~/api/program'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti } from '~/common/utils'
import PrimaryButton from '../Primary/Button'
import IconButton from '../Primary/IconButton'
import PrimaryTable from '../Primary/Table'

const ProgramAddTeacherForm = (props) => {
	const { rowData } = props
	const listTodoApi = {
		programId: rowData?.Id,
		pageSize: PAGE_SIZE,
		pageIndex: 1
	}
	const [isLoading, setIsLoading] = useState(false)
	const [todoApi, setTodoApi] = useState(listTodoApi)
	const [listTeacher, setListTeacher] = useState<ITeacher[]>([])
	const [totalRow, setTotalRow] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [loading, setLoading] = useState('')

	const columns = [
		{
			title: 'Mã giáo viên',
			width: 250,
			dataIndex: 'TeacherCode',
			render: (text) => {
				return <p className="font-weight-black">{text}</p>
			}
		},
		{
			title: 'Tên giáo viên',
			width: 300,
			className: 'font-weight-primary',
			dataIndex: 'TeacherName'
		},
		{
			title: 'Thêm vào chương trình',
			dataIndex: 'Allow',
			align: 'center',
			width: 170,
			render: (allow, data) => {
				return (
					<>
						{loading == data.TeacherId ? (
							<Spin></Spin>
						) : (
							<Checkbox checked={allow} onChange={() => handleUpdateAllowTeacher(data)}></Checkbox>
						)}
					</>
				)
			}
		}
	]

	const handleUpdateAllowTeacher = async (data) => {
		try {
			setLoading(data.TeacherId)
			const DATA_SUBMIT = {
				teacherId: data.TeacherId,
				programId: data.ProgramId
			}
			const res = await programApi.updateAllowTeacher(DATA_SUBMIT)
			if (res.status === 200) {
				const temlp = []
				listTeacher.forEach((element) => {
					if (element.TeacherId === data.TeacherId) {
						temlp.push({ ...element, Allow: element.Allow === true ? false : true })
					} else {
						temlp.push(element)
					}
				})
				setListTeacher(temlp)
				ShowNoti('success', res.data.message)
			}
			setLoading('')
		} catch (err) {
			ShowNoti('error', err.message)
			setLoading('')
		}
	}

	const getAllTeacher = async () => {
		setIsLoading(true)
		try {
			const res = await programApi.getTeacherInProgram(listTodoApi)
			if (res.status === 200) {
				setListTeacher(res.data.data)
				setTotalRow(res.data.totalRow)
			}
			if (res.status === 204) {
				setListTeacher([])
			}
		} catch (err) {
			ShowNoti('error', err.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (isModalOpen) {
			getAllTeacher()
		}
	}, [isModalOpen, todoApi])
	return (
		<>
			<IconButton onClick={() => setIsModalOpen(true)} icon="user-group" type="button" tooltip="Thêm giáo viên" color="green" />
			<Modal
				title={
					<>
						Thêm giáo viên vào chương trình: <span className="font-semibold text-tw-primary">{rowData?.Name}</span>
					</>
				}
				open={isModalOpen}
				width={800}
				footer={null}
				onCancel={() => setIsModalOpen(false)}
			>
				<PrimaryTable
					total={totalRow}
					loading={isLoading}
					onChangePage={(event: number) => setTodoApi({ ...listTodoApi, pageIndex: event })}
					columns={columns}
					data={listTeacher}
				/>
			</Modal>
		</>
	)
}

export default ProgramAddTeacherForm
