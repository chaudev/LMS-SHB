import React from 'react'
import MyDivider from '~/atomic/atoms/MyDivider'

interface IEssayStatistical {
	data: TListGroup
}

const EssayStatistical: React.FC<IEssayStatistical> = (props) => {
	const { data } = props
	return (
		<div>
			<div>
				{data?.ListQuestion?.map((item) => (
					<div key={crypto.randomUUID()} className="first:mt-0 mt-2">
						<p>
							<span>{item?.Content}</span> - {item?.ListEssay?.length || 0} câu trả lời
						</p>
						{item?.ListEssay?.map((item) => (
							<div key={crypto.randomUUID()} className="bg-[#efefef] p-2 rounded-[6px] first:mt-0 mt-2">
								{item}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default EssayStatistical
