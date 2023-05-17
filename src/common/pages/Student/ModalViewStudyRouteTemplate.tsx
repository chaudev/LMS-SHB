import { Empty, Modal, Select, Spin, Timeline, Tooltip } from 'antd'
import { debounce } from 'lodash'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { FcClock } from 'react-icons/fc'
import { StudyRouteTemplateApi } from '~/api/option/study-route-template'
import { StudyRouteTemplateDetailApi } from '~/api/option/study-router-template-detail'
import { studyRouteApi } from '~/api/study-route'
import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNostis } from '~/common/utils'

interface IModalViewStudyRouteTemplate {
	onRefresh: Function
	status: boolean
}

const ModalViewStudyRouteTemplate: React.FC<IModalViewStudyRouteTemplate> = ({ onRefresh, status = true }) => {
	const router = useRouter()
	const { StudentID } = router.query
	const initParamters = {
		pageSize: 9999,
		pageIndex: 1,
		search: null
	}

	const [open, setOpen] = useState(false)
	const [apiParameters, setApiParameters] = useState(initParamters)
	const [loading, setLoading] = useState<string>('')
	const [studyRouteTemplates, setRouteTemplates] = useState<IStudyRoute[]>([])
	const [studyRouteTemplateDetail, setRouteTemplateDetail] = useState<IStudyRouteTemplateDetail[]>([])
	const [selected, setSelected] = useState<{ label: string; value: number }>()

	const getAllStudyRouteTemplate = async () => {
		try {
			setLoading('GET_ALL')
			const res = await StudyRouteTemplateApi.getAllStudyRoute(apiParameters)

			if (res.status === 200) {
				let templ = []
				res.data.data.forEach((item) => {
					templ.push({
						label: item.Name,
						value: item.Id
					})
				})
				setRouteTemplates(templ)
			}
			if (res.status === 204) {
				setRouteTemplates([])
			}
			setLoading('')
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading('')
		}
	}

	const getAllStudyRouteTemplateDetail = async () => {
		try {
			setLoading('GET_ALL_DETAIL')
			if (!!selected) {
				const response = await StudyRouteTemplateDetailApi.getAllStudyRouteTemplateDetail({
					pageSize: 9999,
					pageIndex: 1,
					studyRouteTemplateId: selected.value
				})
				if (response.status === 200) {
					setRouteTemplateDetail(response.data.data)
				}
				if (response.status === 204) {
					setRouteTemplateDetail([])
				}
			} else {
				setRouteTemplateDetail([])
			}
			setLoading('')
		} catch (error) {
			setLoading('')
			ShowNostis.error(error.message)
		}
	}

	const debounceFetcher = useMemo(() => {
		const loadOptions = (value: string) => {
			if (value == '') {
				setApiParameters({ ...apiParameters, pageIndex: 1, search: '' })
			} else {
				setApiParameters({ ...apiParameters, pageIndex: 1, search: value })
			}
		}
		return debounce(loadOptions, 500)
	}, [studyRouteTemplates, 500])

	useEffect(() => {
		getAllStudyRouteTemplate()
	}, [apiParameters])

	useEffect(() => {
		getAllStudyRouteTemplateDetail()
	}, [selected])

	const _handlUseTemplate = async () => {
		try {
			setLoading('UPDATE_USE_TEMPLATE')

			const payload: IUseTemplate = {
				StudyRouteTemplateId: selected.value,
				StudentId: Number(StudentID)
			}
			const response = await studyRouteApi.updateUseTemplate(payload)

			if (response.status === 200) {
				ShowNostis.success(response.data.message)
				await onRefresh()
				setSelected(null)
				hideModal()
			}
		} catch (error) {
			setLoading('')
			ShowNostis.error(error.message)
		}
	}

	const showModal = () => {
		setOpen(true)
	}

	const hideModal = () => {
		setOpen(false)
	}

	return (
		<>
			{status ? (
				<Tooltip title="Vui lòng xóa hết lộ trình cũ trước khi xử dụng lộ trình mẫu!">
					<div className="px-[10px] text-[#000] font-medium none-selection rounded-lg d-flex justify-center items-center bg-[#cacaca] hover:bg-[#bababa] focus:bg-[#acacac]">
						<AiOutlineEye size={20} className="mr-2" /> Dùng mẫu có sẵn
					</div>
				</Tooltip>
			) : (
				<PrimaryButton disable={status} onClick={showModal} type="button" icon="eye" background="primary">
					Dùng mẫu có sẵn
				</PrimaryButton>
			)}
			<Modal title="Lộ trình có sẵn" width={1000} centered open={open} onOk={hideModal} onCancel={hideModal} footer={false}>
				<div className="d-flex flex-col gap-4">
					<div>
						<Select
							allowClear
							showSearch
							labelInValue
							className="w-full"
							placeholder="Chọn lộ trình học"
							filterOption={false}
							onSearch={debounceFetcher}
							onSelect={(value) => {
								setSelected(value)
							}}
							onClear={() => {
								setSelected(null)
							}}
							loading={loading === 'GET_ALL'}
							notFoundContent={loading === 'GET_ALL' ? <Spin size="small" /> : null}
							options={studyRouteTemplates}
						/>
					</div>
					<Spin spinning={loading === 'GET_ALL_DETAIL'}>
						<Timeline mode="left">
							{studyRouteTemplateDetail.length > 0 && studyRouteTemplateDetail ? (
								studyRouteTemplateDetail.map((item, index) => {
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
											</div>
										</Timeline.Item>
									)
								})
							) : (
								<Empty
									description={!!selected ? <span>Không có chương trình trong lộ trình {selected ? selected.label : ''}! </span> : ''}
								/>
							)}
						</Timeline>
					</Spin>
					<div className="d-flex justify-center gap-3">
						<PrimaryButton onClick={hideModal} type="button" icon="cancel" background="red">
							Hủy
						</PrimaryButton>

						<PrimaryButton
							onClick={_handlUseTemplate}
							disable={!selected || loading === 'UPDATE_USE_TEMPLATE'}
							type="button"
							icon="save"
							background="primary"
						>
							Cập nhật
						</PrimaryButton>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default ModalViewStudyRouteTemplate
