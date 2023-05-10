import { Form, Input, Select } from 'antd'
import PrimaryButton from '~/common/components/Primary/Button'

const FormProfileTemplate = ({ form, handleCreateUpdate, isModalOpen }) => {
	return (
		<Form
			layout="vertical"
			form={form}
			onFinish={(params) => {
				handleCreateUpdate(params)
			}}
			className="d-flex justify-center flex-col"
		>
			<Form.Item label="Không được xóa input này" hidden name="Id">
				<Input placeholder="Vui lòng nhập tên thông tin" />
			</Form.Item>
			<Form.Item label="Tên thông tin" name="Name" rules={[{ required: true, message: 'Vui lòng nhập tên thông tin' }]}>
				<Input placeholder="Vui lòng nhập tên thông tin" />
			</Form.Item>

			<Form.Item label="Kiểu thông tin" name="Type" rules={[{ required: true, message: 'Vui lòng nhập tên thông tin' }]}>
				<Select>
					<Select.Option value="1">Văn bản</Select.Option>
					<Select.Option value="2">Lựa chọn</Select.Option>
				</Select>
			</Form.Item>
			<div className="d-flex justify-center gap-4">
				<PrimaryButton className="text-white" type="button" icon="cancel" background="orange">
					Hủy
				</PrimaryButton>
				<PrimaryButton type="submit" icon={isModalOpen.type === 'CREATE' ? 'add' : 'edit'} background="blue">
					{isModalOpen.type === 'CREATE' ? 'Thêm Thông tin' : 'Cập nhật thông tin'}
				</PrimaryButton>
			</div>
		</Form>
	)
}
export default FormProfileTemplate
