import { IoWarning } from 'react-icons/io5'
import { MdError } from 'react-icons/md'

import RenderBlock from '~/common/pages/dormitory/report/components/RenderBlock'

interface ViolationDormitoryProps {
	totalWarning: number
	violationDormitoryList: TDormitoryWarning['TotalWarningBasaeOnLevels']
}

export default function ViolationDormitory({ totalWarning, violationDormitoryList }: ViolationDormitoryProps) {
	const warningConfig = {
		Nhe: {
			label: 'Nhẹ',
			bgColor: 'bg-tw-green',
			icon: <IoWarning className="size-7" />
		},
		Vua: {
			label: 'Vừa',
			bgColor: 'bg-tw-orange',
			icon: <IoWarning className="size-7" />
		},
		NghiemTrong: {
			label: 'Nghiêm trọng',
			bgColor: 'bg-tw-primary',
			icon: <MdError className="size-7" />
		}
	}
	return (
		<div className="space-y-6">
			{/* <p>Tổng cộng: {totalWarning}</p> */}
			<div>
				<div className="grid grid-cols-12 gap-4">
					{violationDormitoryList.length > 0 ? (
						violationDormitoryList?.map((violationDormitory) => {
							const warningLever = violationDormitory.WarningLevel
							const { label, bgColor, icon } = warningConfig[warningLever] || {}
							return (
								<RenderBlock
									key={violationDormitory.WarningLevel}
									bgColor={bgColor}
									icon={icon}
									label={label}
									total={violationDormitory.TotalWarningOfLevel}
									className={'col-span-2 tablet:col-span-4 '}
								/>
							)
						})
					) : (
						<div className="h-24 col-span-12">Không có kết quả!</div>
					)}
				</div>
			</div>
		</div>
	)
}
