import { Card } from 'antd'
import React from 'react'
import { AiOutlinePhone } from 'react-icons/ai'
import { BsJournalCode } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'
import Avatar from '~/common/components/Avatar'

const CardInfomation = ({ templ }) => {
	return (
		<Card>
			<Card.Meta
				avatar={
					<Avatar
						className="h-[64px] w-[64px] rounded-full shadow-sm"
						uri={templ && templ.Avatar ? templ.Avatar : ''}
						isThumbnail={false}
					/>
				}
				title={templ ? templ.StudentName : ''}
				description={
					<div className="d-flex flex-col gap-3 ">
						<div className="d-fex items-center">
							<BsJournalCode size={20} className="mr-3" />
							{templ ? templ.StudentCode : '------------'}
						</div>
						<div className="d-fex items-center">
							<HiOutlineMail size={22} className="mr-3" />
							{templ ? templ.Email : '------------'}
						</div>
						<div className="d-fex items-center">
							<AiOutlinePhone size={22} className="mr-3" />
							{templ ? templ.Mobile : '------------'}
						</div>
					</div>
				}
			></Card.Meta>
		</Card>
	)
}

export default CardInfomation
