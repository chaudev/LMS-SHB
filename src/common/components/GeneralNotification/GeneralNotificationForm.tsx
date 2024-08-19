import { Card, Form, Modal, Switch, Upload, UploadFile } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { branchApi } from '~/api/branch'
import { generalNotificationApi } from '~/api/general-notification'
import { permissionApi } from '~/api/permission'
import { userInformationApi } from '~/api/user/user'
import { ShowNoti } from '~/common/utils'
import { parseSelectArray, parseSelectArrayUser } from '~/common/utils/common'
import { RootState } from '~/store'
import { setBranch } from '~/store/branchReducer'
import EditorField from '../FormControl/EditorField'
import InputTextField from '../FormControl/InputTextField'
import SelectField from '../FormControl/SelectField'
import PrimaryButton from '../Primary/Button'
import type { RcFile, UploadProps } from 'antd/es/upload'
import { PlusOutlined } from '@ant-design/icons'
import { UploadFileApi } from '~/api/common/upload-image'
import { useQueryClient } from '@tanstack/react-query'

const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = (error) => reject(error)
	})

const GeneralNotificationForm = (props) => {
	const queryClient = useQueryClient();

	const branch = useSelector((state: RootState) => state.branch.Branch)
	const [form] = Form.useForm()

	const [allRole, setAllRole] = useState([])
	const [userSelect, setUserSelect] = useState([])
	const [selectAllUser, setSelectAllUser] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()
	const convertBranchSelect = useMemo(() => {
		return parseSelectArray(branch, 'Name', 'Id')
	}, [branch])

	const getAllStaff = async () => {
		try {
			const res = await permissionApi.getRolePermission()
			if (res.status === 200) {
				const convertDataRoles = parseSelectArray(res.data.data, 'Name', 'Id')
				setAllRole(convertDataRoles)
			}
			if (res.status === 204) {
				setAllRole([])
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getAllBranch = async () => {
		try {
			const res = await branchApi.getAll({ pageSize: 99999 })
			if (res.status === 200) {
				dispatch(setBranch(res.data.data))
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	useEffect(() => {
		getAllStaff()
	}, [])

	useEffect(() => {
		if (branch.length === 0) {
			getAllBranch()
		}
	}, [branch])

	useEffect(() => {
		if (convertBranchSelect) {
			const defaultSelectBranch = convertBranchSelect.map((branch) => branch.value)
			form.setFieldsValue({ branchIds: defaultSelectBranch })
		}
	}, [convertBranchSelect])

	useEffect(() => {
		if (selectAllUser) {
			const defaultSelectAllUser = userSelect?.map((user) => {
				return user.value
			})
			form.setFieldsValue({ UserIds: defaultSelectAllUser })
		} else {
			form.setFieldsValue({ UserIds: [] })
		}
	}, [selectAllUser])

	const handleChangeSelect = async (name, value) => {
		setSelectAllUser(false)
		if (form.getFieldValue('branchIds')?.length > 0 && form.getFieldValue('roleIds')?.length > 0) {
			try {
				const DATA_SUBMIT = {
					branchIds: form.getFieldValue('branchIds').join(','),
					roleIds: form.getFieldValue('roleIds').join(',')
				}
				const res = await userInformationApi.getAll(DATA_SUBMIT)
				if (res.status === 200) {
					const convertDataUser = parseSelectArrayUser(res.data.data, 'FullName', 'UserCode', 'UserInformationId')
					setUserSelect(convertDataUser)
				}
				if (res.status === 204) {
					setUserSelect([])
				}
			} catch (err) {
				ShowNoti('error', err.message)
			}
		} else {
			setUserSelect([])
		}
	}

	const handleSelectAllUser = (checked) => {
		setSelectAllUser(checked)
	}

	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [previewTitle, setPreviewTitle] = useState('')
	const [fileList, setFileList] = useState([])
	const handleCancel = () => setPreviewOpen(false)

	async function uploadFile(): Promise<any[]> {
		const originFiles = fileList?.map((file) => file.originFileObj)

		if (!originFiles || originFiles.length === 0) {
			return []
		}

		// Tạo một mảng các promises từ các lời gọi API
		const uploadPromises = originFiles.map((file) =>
			UploadFileApi.uploadImage(file)
				.then((response) => response.data.data) // Lấy dữ liệu từ response nếu thành công
				.catch((error) => {
					console.error(`Failed to upload file: ${file.name}`, error)
					return null // Trả về null hoặc một giá trị nào đó khi gặp lỗi
				})
		)

		// Sử dụng Promise.all để thực hiện tất cả các promises cùng lúc
		const results = await Promise.all(uploadPromises)

		return results // Trả về mảng chứa kết quả của tất cả các promises
	}

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile)
		}
		setPreviewImage(file.url || (file.preview as string))
		setPreviewOpen(true)
		setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
	}

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList)

	const handleBeforeUpload = (file) => {
		const isLt2M = file.size / 1024 / 1024 < 2
		if (!isLt2M) {
			ShowNoti('error', 'File quá lớn. Kích thước tối đa là 2MB.')
		}
		return isLt2M ? true : Upload.LIST_IGNORE // Ngăn upload nếu file lớn hơn 2MB
	}

	const onSubmit = async (data) => {
		setIsLoading(true)
		try {
			const rs = await uploadFile()
			const DATA_SUBMIT = {
				Content: data.Content,
				Title: data.Title,
				UserIds: data.UserIds.length > 0 ? data.UserIds.join(',') : '',
				IsSendMail: data.IsSendMail,
				Achievements: rs.length ? JSON.stringify(rs) : ''
			}
			const res = await generalNotificationApi.create(DATA_SUBMIT)
			if (res.status === 200) {
				setSelectAllUser(false)
				form.resetFields()
				queryClient.invalidateQueries({queryKey: ['GET /api/GeneralNotification']})
				setFileList([])
				ShowNoti('success', res.data.message)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		} finally {
			setIsLoading(false)
		}
	}

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Thêm file</div>
		</div>
	)

	return (
		<>
			<Card>
				<Form layout="vertical" form={form} onFinish={onSubmit} initialValues={{ IsSendMail: false }}>
					<div className="grid gap-4 grid-cols-2">
						<div>
							<InputTextField
								name="Title"
								label="Tiêu đề thông báo"
								isRequired
								rules={[{ required: true, message: 'Không để trống tiêu đề!' }]}
								disabled={isLoading}
							/>

							<SelectField
								className="label-full"
								label={`Trung tâm ${window?.innerWidth < 767 ? '' : '(Mặc định tất cả)'}`}
								name="branchIds"
								mode="multiple"
								optionList={convertBranchSelect}
								onChangeSelect={(value) => handleChangeSelect('branchIds', value)}
								rules={[{ required: true, message: 'Không để trung tâm!' }]}
								isRequired
								disabled={isLoading}
							/>

							<SelectField
								className="label-full"
								mode="multiple"
								name="roleIds"
								label="Chức vụ"
								optionList={allRole}
								onChangeSelect={(value) => handleChangeSelect('roleIds', value)}
								rules={[{ required: true, message: 'Không để trống chức vụ!' }]}
								isRequired
								disabled={form.getFieldValue('branchIds')?.length <= 0 || isLoading}
							/>

							<SelectField
								className="label-full"
								mode="multiple"
								name="UserIds"
								label={
									<div className="antd-custom-wrap ant-form-item-label flex items-center justify-between">
										<span>Tài khoản</span>
										<div>
											<span className="mr-2">Chọn tất cả</span>
											<Switch
												disabled={form.getFieldValue('roleIds')?.length <= 0 || form.getFieldValue('branchIds')?.length <= 0 || isLoading}
												checked={selectAllUser}
												onChange={handleSelectAllUser}
											/>
										</div>
									</div>
								}
								disabled={form.getFieldValue('roleIds')?.length <= 0 || form.getFieldValue('branchIds')?.length <= 0 || isLoading}
								optionList={userSelect}
								isLoading={isLoading}
								rules={[{ required: true, message: 'Không để trống tài khoản!' }]}
								isRequired
							/>

							<div>
								<span className="ant-col ant-form-item-label">File đính kèm</span>
								<Upload
									listType="picture-card"
									fileList={fileList}
									onPreview={handlePreview}
									onRemove={(event) => {}}
									onChange={handleChange}
									beforeUpload={handleBeforeUpload}
									disabled={isLoading}
									customRequest={({onSuccess}) => onSuccess("ok", null)} // chặn request tới antd
								>
									{fileList.length >= 6 ? null : uploadButton}
								</Upload>

								<Modal width={1000} centered open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
									{previewImage.includes('.mp4') && (
										<video className="shadow-md" controls id="video" src={previewImage}>
											<source src={previewImage} type="video/mp4" />
											Your browser does not support the video tag.
										</video>
									)}
									{!previewImage.includes('.mp4') && (
										<img className="shadow-md" draggable={false} alt="example" style={{ width: '100%' }} src={previewImage} />
									)}
								</Modal>
							</div>
							<div className="antd-custom-wrap ant-form-item-label flex items-center justify-between">
								<div>
									<Form.Item name="IsSendMail">
										<Switch disabled={isLoading} onChange={(checked) => form.setFieldsValue({ IsSendMail: checked })} />
										<label className="!ml-2">Gửi mail</label>
									</Form.Item>
								</div>
								<PrimaryButton background="green" type="submit" icon="add" disable={isLoading} loading={isLoading}>
									Tạo ngay
								</PrimaryButton>
							</div>
						</div>

						<div>
							<EditorField
								disabled={isLoading}
								name="Content"
								label="Nội dung"
								allowPasteImage={true}
								onChangeEditor={(value) => form.setFieldsValue({ Content: value })}
							/>
						</div>
					</div>
				</Form>
			</Card>
		</>
	)
}

export default GeneralNotificationForm
