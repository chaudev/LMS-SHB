import { Form, Input, Select } from 'antd'
import MySelectMajor from '~/atomic/molecules/MySelectMajor'
import PrimaryButton from '~/common/components/Primary/Button'
import styles from './styles.module.scss'

const FormProfileTemplate = ({ form, handleCreateUpdate, isModalOpen = { type: '' }, onCancelModal }) => {
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
				<Input className="primary-input" placeholder="Vui lòng nhập tên thông tin" />
			</Form.Item>
			{isModalOpen.type === 'CREATE' && (
				<Form.Item label="Kiểu thông tin" name="Type" rules={[{ required: true, message: 'Vui lòng nhập tên thông tin' }]}>
					<Select className="primary-input">
						<Select.Option value="1">Văn bản</Select.Option>
						<Select.Option value="2">Lựa chọn</Select.Option>
					</Select>
				</Form.Item>
			)}
			<Form.Item label="Chọn chương trình học" name="MajorIds" className={styles.majorSelection}>
				<MySelectMajor mode="multiple" className="min-h-[36px]" />
			</Form.Item>

			<div className="d-flex justify-center gap-4">
				<PrimaryButton onClick={onCancelModal} className="text-white" type="button" icon="cancel" background="orange">
					Hủy
				</PrimaryButton>
				<PrimaryButton
					type="submit"
					icon={isModalOpen.type === 'CREATE' ? 'add' : 'edit'}
					background={isModalOpen.type === 'CREATE' ? 'green' : 'primary'}
				>
					{isModalOpen.type === 'CREATE' ? 'Thêm thông tin' : 'Cập nhật thông tin'}
				</PrimaryButton>
			</div>
		</Form>
	)
}
export default FormProfileTemplate
