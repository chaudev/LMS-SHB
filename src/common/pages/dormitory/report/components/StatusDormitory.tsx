import React from 'react'
import { FaFileExport, FaFileImport } from 'react-icons/fa6'
import RenderBlock from '~/common/pages/dormitory/report/components/RenderBlock'

interface studentInOutDormitoryListProps {
	studentInOutDormitoryList: TStudentInOutDormitory[]
}
export default function StatusDormitory({ studentInOutDormitoryList }: studentInOutDormitoryListProps) {
	const studentInOutDormitoryConfig = {
		XuatKhu: {
			label: 'Học viên xuất khu',
			bgColor: 'bg-tw-primary',
			icon: <FaFileExport className="size-7" />
		},
		TrongKhu: {
			label: 'Tiếp nhận học viên mới',
			bgColor: 'bg-tw-green',
			icon: <FaFileImport className="size-7" />
		}
	}
	return (
		<div className="grid grid-cols-2 gap-4">
			{studentInOutDormitoryList.length > 0 ? (
				studentInOutDormitoryList?.map((studentInOutDormitory) => {
					const statusStudentInOutDormitory = studentInOutDormitory.Status
					const { label, bgColor, icon } = studentInOutDormitoryConfig[statusStudentInOutDormitory] || {}
					return (
						<RenderBlock
							key={studentInOutDormitory.Status}
							bgColor={bgColor}
							icon={icon}
							label={label}
							total={studentInOutDormitory.TotalStudentQuantity}
							className="col-span-2 tablet:col-span-1"
						/>
					)
				})
			) : (
				<div className="h-24 col-span-2">Không có kết quả!</div>
			)}
		</div>
	)
}
