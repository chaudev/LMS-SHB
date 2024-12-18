import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Spin, Upload } from 'antd'
import React, { useState } from 'react'
import { Edit, X } from 'react-feather'
import { IoMdTrash } from 'react-icons/io'
import { MdAddCircleOutline, MdSave } from 'react-icons/md'
import { documentListApi } from '~/api/document-list'
import { ShowNoti } from '~/common/utils'

const DocumentListModal = ({ type, docInfo, onFetchDataForm, docID, docName }) => {
	const [isVisible, setIsVisible] = useState(false)
	const [submitLoading, setSubmitLoading] = useState({ type: '', loading: false })
	const [form] = Form.useForm()

	const addDocument = async (value) => {
		let dataUpdate = {
			DocumentName: value.DocumentName,
			CategoryID: docInfo.CategoryID,
			File: value.File.file.originFileObj
		}
		setSubmitLoading({ type: 'UPLOADING', loading: true })
		try {
			let res = await documentListApi.add(dataUpdate)
			if (res.status === 200) {
				ShowNoti('success', 'Thành công!')
				onFetchDataForm && onFetchDataForm()
				setIsVisible(false)
				form.resetFields()
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setSubmitLoading({ type: 'UPLOADING', loading: false })
		}
	}

	const updateDocument = async (value) => {
		let dataUpdate = {
			ID: docID,
			DocumentName: type == 'DELETE_DOC' ? '' : value.CategoryName,
			Enable: type == 'DELETE_DOC' ? false : true
		}

		setSubmitLoading({ type: 'UPLOADING', loading: true })
		try {
			let res = await documentListApi.update(dataUpdate)
			if (res.status === 200) {
				ShowNoti('success', 'Thành công!')
				onFetchDataForm && onFetchDataForm()
				setIsVisible(false)
				form.resetFields()
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setSubmitLoading({ type: 'UPLOADING', loading: false })
		}
	}

	const _onSubmit = async (value) => {
		if (type == 'ADD_DOC') {
			addDocument(value)
		}
		if (type == 'DELETE_DOC') {
			updateDocument(value)
		}
		if (type == 'EDIT_DOC') {
			updateDocument(value)
		}
	}

	return (
		<>
			{type == 'ADD_DOC' && (
				<button
					onClick={() => {
						setIsVisible(true)
						form.resetFields()
					}}
					className="btn btn-warning"
				>
					<MdAddCircleOutline size={18} className="mr-2" />
					Thêm tài liệu
				</button>
			)}
			{type == 'EDIT_DOC' && (
				<button
					onClick={() => {
						setIsVisible(true)
						form.resetFields()
					}}
					className="btn btn-icon edit"
				>
					<Edit />
				</button>
			)}
			{type == 'DELETE_DOC' && (
				<button
					onClick={() => {
						setIsVisible(true)
					}}
					className="btn btn-icon delete"
				>
					<X />
				</button>
			)}

			<Modal
				title={(type == 'ADD_DOC' && 'Thêm tài liệu') || (type == 'DELETE_DOC' && 'Xóa tài liệu') || (type == 'EDIT_DOC' && 'Sửa tài liệu')}
				onCancel={() => setIsVisible(false)}
				visible={isVisible}
				footer={false}
			>
				<Form form={form} layout="vertical" onFinish={_onSubmit}>
					<div className="row">
						{(type == 'ADD_DOC' && (
							<>
								<div className="col-12">
									<Form.Item label="Tên tài liệu" name="DocumentName" rules={[{ required: true, message: 'Bạn không được để trống' }]}>
										<Input onChange={(event) => {}} name="DocumentName" placeholder="Tên tài liệu" className="style-input" />
									</Form.Item>
								</div>
								<div className="col-12">
									<Form.Item
										label=" " // CHỔ NÀY BÙA ĐỀ HIỆN CÁI TOOLTIP. XÓA KHOẢN TRẮNG MẤT LUÔN TOOLTIP
										tooltip={{
											title:
												'File dạng: ".jpg", ".jpeg", ".png", ".bmp", ".mp4", ".flv", ".mpeg", ".mov", ".mp3", ".doc", ".docx", ".pdf", ".csv", ".xlsx", ".xls", ".ppt", ".pptx", ".zip", ".rar", tối đa 100mb',
											icon: (
												<div className="row ">
													<span className="mr-1 mt-3" style={{ color: '#000' }}>
														Nhấp để tải lên tài liệu
													</span>
													<i className="fas fa-question-circle"></i>
												</div>
											)
										}}
										name="File"
										rules={[{ required: true, message: 'Bạn không được để trống' }]}
									>
										<Upload maxCount={1} name="File">
											<Button icon={<UploadOutlined />}>Click to Upload</Button>
										</Upload>
									</Form.Item>
								</div>
								<div className="col-12 mb-4">
									<p className="font-weight-primary-red">*Lưu ý: Upload tối đa 100Mb</p>
								</div>
							</>
						)) ||
							(type == 'DELETE_DOC' && (
								<div className="col-12 justify-content-center">
									<h4 className="text-center">Bạn xác nhận muốn xóa tài liệu?</h4>
								</div>
							)) ||
							(type == 'EDIT_DOC' && (
								<div className="col-12">
									<Form.Item label="Tên tài liệu" name="CategoryName">
										<Input
											onChange={(event) => {}}
											name="CategoryName"
											placeholder="Tên tài liệu"
											className="style-input"
											defaultValue={docName}
										/>
									</Form.Item>
								</div>
							))}

						<div className="col-12 mt-3">
							<button type="submit" className={`btn ${type == 'DELETE_DOC' ? 'btn-danger' : 'btn-primary'} w-100`}>
								{type == 'DELETE_DOC' ? (
									<>
										<IoMdTrash size={18} className="mr-2" />
										Xóa
									</>
								) : (
									<>
										<MdSave size={18} className="mr-2" />
										Lưu
									</>
								)}
								{submitLoading.type == 'UPLOADING' && submitLoading.loading && <Spin className="loading-base" />}
							</button>
						</div>
					</div>
				</Form>
			</Modal>
		</>
	)
}

export default DocumentListModal
