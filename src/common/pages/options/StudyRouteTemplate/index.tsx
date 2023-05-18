import { nanoid } from '@reduxjs/toolkit'
import { Form, Input, Modal, Popconfirm } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { studyRouteTemplateApi } from '~/api/option/study-route-template'
import InputTextField from '~/common/components/FormControl/InputTextField'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNostis } from '~/common/utils'

const StudyRouteTemplatePage = () => {
	const [form] = Form.useForm()
	const router = useRouter()
	const initParamters = {
		pageSize: PAGE_SIZE,
		pageIndex: 1,
		search: null
	}

	const [apiParameters, setApiParameters] = useState(initParamters)
	const [totalRow, setTotalRow] = useState(1)
	const [loading, setLoading] = useState<string>('')
	const [studyRouterTemplates, setRouteTemplates] = useState<IStudyRoute[]>([])
	const [studyRouterTemplateItem, setRouteTemplateItem] = useState<IStudyRoute>()
	const [isShow, setIsShow] = useState<'' | 'CREATE' | 'UPDATE'>('')
	const getAllStudyRouteTemplate = async () => {
		try {
			setLoading('GET_ALL')
			const res = await studyRouteTemplateApi.getAllStudyRoute(apiParameters)

			if (res.status === 200) {
				setRouteTemplates(res.data.data)
				setTotalRow(res.data.totalRow)
			}
			if (res.status === 204) {
				setRouteTemplates([])
				setTotalRow(1)
			}
			setLoading('')
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading('')
		}
	}

	useEffect(() => {
		getAllStudyRouteTemplate()
	}, [apiParameters])
	useEffect(() => {
		if (isShow === 'UPDATE' && studyRouterTemplateItem) {
			form.setFieldValue('Name', studyRouterTemplateItem.Name)
		} else {
			form.resetFields()
		}
	}, [studyRouterTemplateItem])

	const columns = [
		{
			title: 'Tên',
			dataIndex: 'Name',
			render: (text) => <>{text}</>
		},
		{
			width: 200,
			title: 'Chức năng',
			dataIndex: '',
			fixed: 'right',
			render: (data, item) => {
				return (
					<div className="d-fex gap-3">
						<Popconfirm
							title={
								<p>
									Xóa Lộ trình <span className="font-[500] text-[red]">{item.Name}</span>
								</p>
							}
							okText="Xóa"
							cancelText="Hủy"
							onConfirm={() => deleteStudyRouteTemplate(item)}
						>
							<IconButton
								loading={loading === `DELETE_${item.Id}`}
								tooltip="Xóa lộ trình"
								type="button"
								icon="remove"
								color="red"
							></IconButton>
						</Popconfirm>
						<IconButton
							onClick={() => {
								router.push({ pathname: '/options/study-route-template/detail', query: { slug: item.Id, key: nanoid(), name: item.Name } })
							}}
							tooltip="Xem chi tiết lộ trình"
							type="button"
							icon="eye"
							color="yellow"
						></IconButton>
						<IconButton
							onClick={() => {
								setRouteTemplateItem(item)
								setIsShow('UPDATE')
							}}
							tooltip="Cập nhật lộ trình"
							type="button"
							icon="edit"
							color="green"
						></IconButton>

						{/* <IconButton
							onClick={() => deleteStudyRouteTemplate(item)}
							loading={loading === `DELETE_${item.Id}`}
							tooltip="Xóa lộ trình"
							type="button"
							icon="remove"
							color="red"
						></IconButton> */}
					</div>
				)
			}
		}
	]

	const deleteStudyRouteTemplate = async (item) => {
		try {
			setLoading(`DELETE_${item.Id}`)
			const response = await studyRouteTemplateApi.deleteStudyRouteTemplate(item.Id)
			if (response.status == 200) {
				ShowNostis.success(response.data.message)
				const res = await studyRouteTemplateApi.getAllStudyRoute(apiParameters)
				if (res.status === 200) {
					setRouteTemplates(res.data.data)
					setTotalRow(res.data.totalRow)
				}
			}
			setLoading(``)
		} catch (error) {
			setLoading(``)
			ShowNostis.error(error.message)
		}
	}

	const _onFinish = async (params) => {
		try {
			if (isShow === 'CREATE') {
				const response = await studyRouteTemplateApi.createStudyRouteTemplate(params)
				if (response.status === 200) {
					ShowNostis.success(response.data.message)
					getAllStudyRouteTemplate()
					setIsShow('')
				}
			}
			if (isShow === 'UPDATE') {
				const payload = {
					Id: studyRouterTemplateItem.Id,
					Name: params.Name,
					Thumbnail: ''
				}
				const response = await studyRouteTemplateApi.updateStudyRouteTemplate(payload)
				if (response.status === 200) {
					ShowNostis.success(response.data.message)
					getAllStudyRouteTemplate()
					setIsShow('')
				}
			}
		} catch (error) {
			ShowNostis.error(error.message)
		}
	}

	return (
		<>
			<PrimaryTable
				onChangePage={(event: number) => setApiParameters({ ...apiParameters, pageIndex: event })}
				data={studyRouterTemplates}
				total={totalRow}
				loading={loading === 'GET_ALL'}
				columns={columns}
				pageSize={apiParameters.pageSize}
				TitleCard={
					<Input.Search
						className="primary-search max-w-[250px] ml-[8px]"
						onChange={(event) => {
							if (event.target.value == '') {
								setApiParameters({ ...apiParameters, pageIndex: 1, search: '' })
							}
						}}
						loading={loading === 'GET_ALL'}
						onSearch={(event) => setApiParameters({ ...apiParameters, pageIndex: 1, search: event })}
						placeholder="Tìm kiếm"
					/>
				}
				Extra={
					<PrimaryButton onClick={() => setIsShow('CREATE')} icon="add" background="green" type="button">
						Thêm mới
					</PrimaryButton>
				}
			></PrimaryTable>
			<Modal
				open={isShow ? true : false}
				destroyOnClose
				centered
				onCancel={() => setIsShow('')}
				title={isShow == 'UPDATE' ? 'Cập nhật mẫu lộ trình học' : 'Tạo mới mẫu lộ trình học'}
				footer={false}
			>
				<Form form={form} layout="vertical" onFinish={_onFinish}>
					<Form.Item>
						<InputTextField name="Name" label="Tên lộ trình học" />
					</Form.Item>
					<div className="d-flex justify-center ">
						<PrimaryButton type="submit" icon={isShow === 'UPDATE' ? 'save' : 'add'} background="primary">
							{isShow == 'UPDATE' ? 'Cập nhật' : 'Thêm mới'}
						</PrimaryButton>
					</div>
				</Form>
			</Modal>
		</>
	)
}

export default StudyRouteTemplatePage
