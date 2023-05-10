import React, { useEffect, useState } from 'react'
import { profileTemplateApi } from '~/api/profile-template'
import PrimaryTable from '~/common/components/Primary/Table'
import { ShowNostis } from '~/common/utils'

const ProfileTemplatePage = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [profileTemplates, setProfileTemplates] = useState<IProfileTemplate[]>([])

	const getAllProfileTemplate = async () => {
		try {
			setLoading(true)
			const response = await profileTemplateApi.getAll()
			if (response.status === 200) {
				setProfileTemplates(response.data.data)
			}
			setLoading(false)
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading(false)
		}
	}

	useEffect(() => {
		getAllProfileTemplate()
	}, [])

	const columns = [
    {
      width: 70,
			title: 'Index',
			dataIndex: 'Index',
			render: (text) => <p className="font-semibold">{text}</p>
		},
		{
			// width: 160,
			title: 'Tên mẫu hồ sơ',
			dataIndex: 'Name',
			render: (text) => <p className="font-semibold">{text}</p>
		},
		{
			title: 'Kiểu',
			width: 160,
			dataIndex: 'Type',
			render: (text) => <p className="font-semibold text-[#1b73e8]">{text}</p>
		}
		// {
		// 	title: 'Ngày cấp',
		// 	dataIndex: 'CreatedOn',
		// 	render: (date) => moment(date).format('DD/MM/YYYY HH:mm')
		// },
		// {
		// 	title: 'Người cấp',
		// 	dataIndex: 'CreatedBy',
		// 	render: (text) => <p className="font-semibold text-[#1b73e8]">{text}</p>
		// },
		// {
		// 	title: 'Chức năng',
		// 	render: (data) => {
		// 		return (
		// 			<div className="flex items-center">
		// 				<DeleteTableRow handleDelete={() => handleDelete(data.Id)} />
		// 			</div>
		// 		)
		// 	}
		// }
	]

	return <PrimaryTable loading={loading} data={profileTemplates} columns={columns} />
}

export default ProfileTemplatePage
