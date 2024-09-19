import React, { useEffect, useState } from 'react'
import PrimaryTable from '~/common/components/Primary/Table'
import JobForm from '~/common/components/Jobs/JobForm'
import { jobApi } from '~/api/job'
import moment from 'moment'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti } from '~/common/utils'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'

const JobsList = () => {
	const userInformation = useSelector((state: RootState) => state.user.information)
	const [job, setJob] = useState<IJob[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [totalPage, setTotalPage] = useState(null)
	const listJobParams = { pageSize: PAGE_SIZE, pageIndex: 1 }
	const [jobParams, setJobParams] = useState(listJobParams)

	const handleDelete = async (id) => {
		try {
			const res = await jobApi.delete(id)
			if (res.status === 200) {
				setJobParams(listJobParams)
				ShowNoti('success', res.data.message)
				return res
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const columns = [
		{
			title: 'Công việc',
			dataIndex: 'Name',
			render: (text) => <p className="font-weight-primary">{text}</p>
		},
		{ title: 'Người tạo', width: 200, dataIndex: 'ModifiedBy' },
		{
			title: 'Ngày tạo',
			dataIndex: 'ModifiedOn',
			render: (date) => moment(date).format('DD/MM/YYYY')
		},

		{
			title: '',
			width: 120,
			render: (data) => {
				return (
					<>
						{checkIncludesRole(listPermissionsByRoles.config.job.update, Number(userInformation?.RoleId)) && (
							<JobForm getDataJob={getDataJob} rowData={data} />
						)}
						{checkIncludesRole(listPermissionsByRoles.config.job.delete, Number(userInformation?.RoleId)) && (
							<DeleteTableRow text={data.Name} handleDelete={() => handleDelete(data.Id)} />
						)}
					</>
				)
			}
		}
	]

	const getDataJob = async () => {
		setIsLoading(true)
		try {
			let res = await jobApi.getAll({ ...jobParams })
			if (res.status === 200) {
				setJob(res.data.data)
				setTotalPage(res.data.totalRow)
			}
			if (res.status === 204) {
				setJob([])
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getDataJob()
	}, [jobParams])

	return (
		<PrimaryTable
			loading={isLoading}
			total={totalPage && totalPage}
			Extra={
				checkIncludesRole(listPermissionsByRoles.config.job.create, Number(userInformation?.RoleId)) ? (
					<JobForm getDataJob={getDataJob} />
				) : undefined
			}
			data={job}
			columns={columns}
			onChangePage={(event: number) => setJobParams({ ...jobParams, pageIndex: event })}
		/>
	)
}
export default JobsList
