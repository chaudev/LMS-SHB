import { Card } from 'antd'
import React from 'react'
import { parseToMoney } from '~/common/utils/common'

function CardOldMajors({ oldMajors, tuitionInOld }) {
	return (
		<>
			{oldMajors && (
				<Card>
					<Card.Meta
						title={'Ngành học đang theo học'}
						description={
							<div className="d-flex flex-col gap-3 text-black">
								<div>
									<span className="font-[500] text-[gray]  inline-block w-2/5">Ngành học</span>:{' '}
									<span className="font-[500]">{oldMajors.MajorsName}</span>
								</div>
								<div>
									<span className="font-[500] text-[gray] inline-block w-2/5">Số tiền đã đóng</span>:
									<span className="text-[green]"> {parseToMoney(oldMajors.Paid)}₫</span>
								</div>
								<div>
									<span className="font-[500] text-[gray] inline-block w-2/5">Số tiền phát sinh</span>:
									<span className="text-[orange]"> {parseToMoney(tuitionInOld)}₫</span>
								</div>
								<div>
									<span className="font-[500] text-[gray] inline-block w-2/5">Ghi chú</span>: {oldMajors.Note}
								</div>
							</div>
						}
					></Card.Meta>
				</Card>
			)}
		</>
	)
}

export default CardOldMajors
