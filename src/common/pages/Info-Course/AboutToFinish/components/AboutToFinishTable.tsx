import Link from 'next/link'
import React from 'react'
import IconButton from '~/common/components/Primary/IconButton'
import PrimaryTable from '~/common/components/Primary/Table'
import { ButtonEye } from '~/common/components/TableButton'
import { userInfoColumn } from '~/common/libs/columns/user-info'

type TAboutToFinishTable = {
	total: number
	loading: boolean
	onChangePage: any
	data: any[]
	refreshData: any
} & Omit<IPrimaryTable, 'columns'>

const AboutToFinishTable: React.FC<TAboutToFinishTable> = (props) => {
	const { refreshData } = props
	const columns = [
		{ ...userInfoColumn, fixed: 'left' },
		{
			title: 'Liên hệ',
			dataIndex: 'Mobile',
			render: (value, item) => {
				return (
					<div>
						<p>
							<span className="font-medium">Điện thoại: </span> {item?.Mobile}
						</p>
						<p>
							<span className="font-medium">Email: </span> {item?.Email}
						</p>
					</div>
				)
			}
		},
		{
			title: 'Số buổi còn lại',
			dataIndex: 'TotalLesson',
			className: 'min-w-[120px]',
			render: (value, item) => {
				return <p className="font-bold !text-primary">{value}</p>
			}
		},
		{
			title: '',
			align: 'center',
			width: 50,
			render: (text, data: TStudentAboutToFinish, index) => (
				<div className="flex">
					<Link
						href={{
							pathname: '/info-course/student/detail',
							query: { StudentID: data?.StudentId }
						}}
					>
						<a>
							<ButtonEye className="" />
						</a>
					</Link>
				</div>
			)
		}
	]

	return (
		<div>
			<PrimaryTable columns={columns} {...props} />
		</div>
	)
}

export default AboutToFinishTable
