import { Popover } from 'antd'
import Link from 'next/link'
import React from 'react'
import { BsQuestionCircleFill } from 'react-icons/bs'

// nếu có noDetails thì không cần prop link
// còn không thì mặc định phải có link
type Common = {
	content: React.ReactNode
}

type MyInfoPropsWithLink = Common & {
	noDetails?: never
	link: string
}

type MyInfoPropsWithoutLink = Common & {
	noDetails: true
	link?: never
}

type MyInfoProps = MyInfoPropsWithLink | MyInfoPropsWithoutLink

const MyInfo: React.FC<MyInfoProps> = (props) => {
	const { content, link, noDetails } = props
	return (
		<Popover
			content={
				<div className="w-[250px]">
					{content} {!noDetails && <span>Chi tiết</span>}{' '}
					{!noDetails && (
						<Link href={link}>
							<a>xem tại đây</a>
						</Link>
					)}
				</div>
			}
		>
			<BsQuestionCircleFill className="text-[#f39c12]" />
		</Popover>
	)
}

export default MyInfo
