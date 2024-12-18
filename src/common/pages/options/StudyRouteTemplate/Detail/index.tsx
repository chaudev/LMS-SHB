import { Card, Empty, Popconfirm, Spin, Timeline } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FcClock } from 'react-icons/fc'
import { ImMoveDown, ImMoveUp } from 'react-icons/im'
import { StudyRouteTemplateDetailApi } from '~/api/option/study-router-template-detail'

import { ShowNostis } from '~/common/utils'
import ModalActionStudyRouteTemplateDetail from './ModalActionStudyRouteTemplateDetail'
import IconButton from '~/common/components/Primary/IconButton'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'

const StudyRouteTemplateDetailPage = () => {
	const router = useRouter()
	const { slug, name } = router.query
	const userInformation = useSelector((state: RootState) => state.user.information)
	const [loading, setLoading] = useState<string>('')
	const [studyTemplateDetail, setStudyTemplateDetail] = useState<IStudyRouteTemplateDetail[]>([])

	const getAllStudyTemplateDetail = async () => {
		try {
			setLoading('GET_ALL')
			const response = await StudyRouteTemplateDetailApi.getAllStudyRouteTemplateDetail({
				pageSize: 9999,
				pageIndex: 1,
				studyRouteTemplateId: slug
			})
			if (response.status === 200) {
				setStudyTemplateDetail(response.data.data)
			}
			setLoading('')
		} catch (error) {
			setLoading('')

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
			setLoading(`CHANGER_${index}`)
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
			setLoading(``)
		} catch (error) {
			setLoading(` `)

			ShowNostis.error(error.message)
		}
	}

	const handleRemovePrograms = async (item) => {
		try {
			setLoading(`DELETE_${item}`)
			const response = await StudyRouteTemplateDetailApi.deleteStudyRouteTemplateDetail(item.Id)
			if (response.status === 200) {
				getAllStudyTemplateDetail()
				ShowNostis.success(response.data.message)
			}
			setLoading(` `)
		} catch (error) {
			setLoading(` `)

			ShowNostis.error(error.message)
		}
	}

	return (
		<div className="d-flex justify-center">
			<Card
				className="w-full max-w-[1200px]"
				title={name ? name : ''}
				loading={loading === 'GET_ALL'}
				extra={
					checkIncludesRole(listPermissionsByRoles.config.sampleLearningRoadmap.createDetail, Number(userInformation?.RoleId)) ? (
						<ModalActionStudyRouteTemplateDetail mode="CREATE" onRefresh={getAllStudyTemplateDetail} />
					) : undefined
				}
			>
				<Timeline mode="left">
					{studyTemplateDetail.length > 0 && studyTemplateDetail ? (
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
												<span className="font-[500]">Ngày tạo:</span> {moment(item?.CreatedOn).format('DD/MM/YYYY HH:MM')}
											</p>
											<p>
												<span className="font-[500]">Ghi chú:</span> {item?.Note}
											</p>
										</div>
										<div className="d-flex justify-end items-center gap-1">
											{checkIncludesRole(
												listPermissionsByRoles.config.sampleLearningRoadmap.updateDetailIndex,
												Number(userInformation?.RoleId)
											) && (
												<>
													{index !== 0 && (
														<div onClick={() => handleChangeIndex('up', index)} className="icon cursor-pointer">
															<ImMoveUp size={22} color="#0068ac" />
														</div>
													)}
													{index + 1 < studyTemplateDetail.length && (
														<div onClick={() => handleChangeIndex('down', index)} className="icon cursor-pointer">
															<ImMoveDown size={22} color="#007134" />
														</div>
													)}
												</>
											)}
											{checkIncludesRole(
												listPermissionsByRoles.config.sampleLearningRoadmap.updateDetail,
												Number(userInformation?.RoleId)
											) && <ModalActionStudyRouteTemplateDetail item={item} mode="UPDATE" onRefresh={getAllStudyTemplateDetail} />}
											{checkIncludesRole(
												listPermissionsByRoles.config.sampleLearningRoadmap.deleteDetail,
												Number(userInformation?.RoleId)
											) && (
												<Popconfirm
													onConfirm={() => handleRemovePrograms(item)}
													title="Xóa Khung đào tạo khỏi lộ trình học"
													okText="Xóa"
													cancelText="Hủy"
												>
													<IconButton type="button" icon="remove" color="red" />
												</Popconfirm>
											)}
										</div>
									</div>
								</Timeline.Item>
							)
						})
					) : (
						<Empty description={<span>Chưa có Khung đào tạo học!</span>} />
					)}
				</Timeline>
			</Card>
		</div>
	)
}

export default StudyRouteTemplateDetailPage
