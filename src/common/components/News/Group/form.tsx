import { PlusOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Select } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { MdSettings } from 'react-icons/md'
import RestApi from '~/api/RestApi'
import { UploadFileApi } from '~/api/common/upload-image'
import { ShowNostis, ShowNoti } from '~/common/utils'
import ModalFooter from '../../Modal/ModalFooter'
import PrimaryButton from '../../Primary/Button'

const maxSize = 2 * 1024 * 1024 // Giới hạn kích thước ảnh 2MB

function GroupForm(props) {
	const { onRefresh, defaultData, isEdit = false } = props
	const [loading, setLoading] = useState(false)
	const [visible, setVisible] = useState(false)
	const [classOption, setClassOption] = useState([])
	const [files, setFiles] = useState([])

	const onDrop = useCallback((acceptedFiles) => {
		console.log(acceptedFiles)
		setFiles(
			acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file)
				})
			)
		)
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxSize: maxSize,
		onDropRejected() {
			ShowNoti('error', 'File quá lớn. Kích thước tối đa là 2MB.');
		}
	})
	const [form] = Form.useForm()

	const getAllClass = async () => {
		try {
			setLoading(true)
			const response = await RestApi.get<any>('NewsFeedGroup/class-available', {})
			if (response.status == 200) {
				const { data } = response.data
				setClassOption(data)
			} else {
				setClassOption([])
			}
		} catch (error) {
			ShowNostis.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (!isEdit) getAllClass()
	}, [])

	useEffect(() => {
		form.setFieldValue('Name', defaultData?.Name)
	}, [defaultData])

	async function onFinish(values) {
		try {
			setLoading(true)
			if (files.length > 0) {
				const response = await UploadFileApi.uploadImage(files[0])
				if (response.status == 200) {
					values.Background = response.data.data
				}
			}

			if (!isEdit) await RestApi.post('/NewsFeedGroup', values)
			else await RestApi.put('/NewsFeedGroup', { ...values, Id: defaultData.Id })

			ShowNostis.success('Thành công')
			form.resetFields()
			setFiles([])
			onRefresh()
			getAllClass()
			setVisible(false)
		} catch (error) {
			ShowNostis.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	const submitForm = () => form.submit()

	const onClassAvailableChange = (idClass: string) => {
		const nameClass = classOption.find((classItem) => classItem.Id == idClass)
		form.setFieldValue('Name', nameClass.Name)
	}

	return (
		<>
			{!isEdit && (
				<PrimaryButton
					onClick={() => setVisible(true)}
					className="w-full  mt-1 d-flex items-center"
					type="button"
					icon="add"
					background="primary"
				>
					Tạo nhóm
				</PrimaryButton>
			)}

			{!!isEdit && (
				<div className="ml-3 cc-group-settings" onClick={() => setVisible(true)}>
					<MdSettings size={22} />
				</div>
			)}

			<Modal
				open={visible}
				onCancel={() => setVisible(false)}
				closable={true}
				centered
				width={500}
				title="Thông tin nhóm"
				footer={
					<ModalFooter
						isEdit={isEdit}
						buttonFull
						loading={loading}
						groupId={defaultData && defaultData.Id}
						onCancel={() => setVisible(false)}
						onOK={submitForm}
					/>
				}
			>
				<Form form={form} className="grid grid-cols-2 gap-x-4 " layout="vertical" onFinish={onFinish} autoComplete="on">
					<Form.Item label="Ảnh bìa" name="Background" className="col-span-2">
						<div {...getRootProps()} className={`cc-form-new-group-item border-[${isDragActive ? '#B32025' : '#d9d9d9'}]  `}>
							<input {...getInputProps()} />

							{files[0]?.preview || defaultData ? (
								<img src={files[0]?.preview ? files[0]?.preview : defaultData?.BackGround} className="object-cover w-full h-full" />
							) : (
								<PlusOutlined />
							)}
						</div>
					</Form.Item>

					{!isEdit && (
						<Form.Item className="col-span-2" label="Lớp học" name="ClassId" required>
							<Select onChange={onClassAvailableChange}>
								{classOption.length > 0 &&
									classOption.map((item, index) => (
										<Select.Option key={index} value={item.Id}>
											<b className={`${item.Type === 1 ? 'text-[#f95a5a]' : 'text-[#50a14f]'}`}>{item.TypeName}</b> - {item.Name}
										</Select.Option>
									))}
							</Select>
						</Form.Item>
					)}

					<Form.Item className="col-span-2" label="Tên nhóm" name="Name" required>
						<Input disabled={loading} className="primary-input" />
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}

export default GroupForm
