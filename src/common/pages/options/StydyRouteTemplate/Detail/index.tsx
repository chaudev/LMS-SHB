import { Card, Spin, Timeline } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FcClock } from 'react-icons/fc'
import { ImMoveDown, ImMoveUp } from 'react-icons/im'
import { StudyRouteTemplateDetailApi } from '~/api/option/study-router-template-detail'

import { ShowNostis } from '~/common/utils'
import ModalActionStudyRouteTemplateDetail from './ModalActionStudyRouteTemplateDetail'

const StudyRouteTemplateDetailPage = () => {
	const router = useRouter()
	const { slug, name } = router.query
	const [loading, setLoading] = useState(false)
	const [studyTemplateDetail, setStudyTemplateDetail] = useState<IStudyRouteTemplateDetail[]>([])

	const getAllStudyTemplateDetail = async () => {
		try {
			setLoading(true)
			const response = await StudyRouteTemplateDetailApi.getAllStudyRouteTemplateDetail({
				pageSize: 9999,
				pageIndex: 1,
				studyRouteTemplateId: slug
			})
			if (response.status === 200) {
				setStudyTemplateDetail(response.data.data)
			}
			setLoading(false)
		} catch (error) {
			setLoading(false)

			ShowNostis.error(error.message)
		}
	}

	useEffect(() => {
		if (!!slug) {
			getAllStudyTemplateDetail()
		}
	}, [slug])

	const handleChangeIndex = async (type, index) => {
		try {
			let arrRef = [...studyTemplateDetail]
			const element = arrRef.splice(index, 1)[0]
			arrRef.splice(type === 'up' ? index - 1 : index + 1, 0, element)
			const templ = []
			arrRef.forEach((item, index) => {
				templ.push({
					Id: item.Id,
					Index: index + 1
				})
			})

			const response = await StudyRouteTemplateDetailApi.changeIndenStudyRouteTemplateDetail({
				items: templ
			})

			if (response.status === 200) {
				ShowNostis.success(response.data.message)
				setStudyTemplateDetail(arrRef)
			}
		} catch (error) {
			ShowNostis.error(error.message)
		}
	}

	return (
		<Card title={name ? name : ''} extra={<ModalActionStudyRouteTemplateDetail mode="CREATE" onRefresh={getAllStudyTemplateDetail} />}>
			<Spin spinning={loading}>
				<Timeline mode="left">
					{studyTemplateDetail.length > 0 &&
						studyTemplateDetail &&
						studyTemplateDetail.map((item, index) => {
							return (
								<Timeline.Item
									label={<div className="text-green font-[500]">{`[${item?.ProgramCode}] ${item?.ProgramName}`}</div>}
									key={index}
									dot={<FcClock />}
								>
									<div className="flex justify-between">
										<div>
											<p>
												<span className="font-[500] ">Người tạo:</span> {item?.CreatedBy}
											</p>
											<p>
												<span className="font-[500]">Ngày tạo:</span> {moment(item?.CreatedOn).format('DD-MM-YYYY HH:mm A')}
											</p>
											<p>
												<span className="font-[500]">Ghi chú:</span> {item?.Note}
											</p>
										</div>
										<div className="d-flex justify-end items-center gap-3">
											<div onClick={() => handleChangeIndex('up', index)} className="icon cursor-pointer">
												{index !== 0 && <ImMoveUp size={22} color="#0068ac" />}
											</div>
											{index + 1 < studyTemplateDetail.length && (
												<div onClick={() => handleChangeIndex('down', index)} className="icon cursor-pointer">
													<ImMoveDown size={22} color="#007134" />
												</div>
											)}
											<ModalActionStudyRouteTemplateDetail item={item} mode="UPDATE" onRefresh={getAllStudyTemplateDetail} />
										</div>
									</div>
								</Timeline.Item>
							)
						})}
				</Timeline>
			</Spin>
		</Card>
	)
}

export default StudyRouteTemplateDetailPage
