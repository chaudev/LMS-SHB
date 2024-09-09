import { useMutation } from '@tanstack/react-query'
import { Form, Tooltip } from 'antd'
import { rollUpApi } from '~/api/rollup'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyModal, { TMyModalProps } from '~/atomic/atoms/MyModal'
import MySelectLearningStatus from '~/atomic/molecules/MySelectLearningStatus'
import MySelectRollUpStatus from '~/atomic/molecules/MySelectRollUpStatus'
import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNoti } from '~/common/utils'

type TForm = {
	Status: number
	LearningStatus: number
}

type TProps = TMyModalProps & {
	scheduleIds: string
	studentData: IStudentInClass[]
	onCancel: () => void
	onCallbackAfterSuccess?: () => void
}

const RollUpMultipleStudentModal = (props: TProps) => {
	const { open, onCancel, scheduleIds, studentData, onCallbackAfterSuccess, ...restProps } = props

	const [form] = Form.useForm<TForm>()
	const status = Form.useWatch('Status', form)

	const updateStatusMutation = useMutation({
		mutationFn: async (data: { Items: any[] }) => await rollUpApi.insertOrUpdateMultiple(data),
		onSuccess: () => {
			ShowNoti('success', 'Điểm danh thành công !')
			form.resetFields()
			onCancel()
			onCallbackAfterSuccess?.()
		},
		onError: (error) => ShowNoti('error', error.message)
	})

	const onFinish = async (data: TForm) => {
		const dataSubmit = {
			Items: studentData.map((item) => ({
				StudentId: item.StudentId,
				ScheduleIds: scheduleIds,
				...data
			}))
		}
		updateStatusMutation.mutate(dataSubmit)
	}

	return (
		<MyModal open={open} onCancel={onCancel} footer={false} {...restProps}>
			<div className="grid grid-cols-2 gap-2">
				<div className="">
					<span className="mb-4 font-bold text-[14px]">Học viên</span>
					<div className="mt-2 max-h-[300px] scrollable">
						<div className=" h-fit">
							{studentData?.map((item, index) => (
								<div key={item?.UserCode} className="py-1">
									<Tooltip
										title={
											<div>
												<span>Mã học viên </span>
												<span> - </span>
												<span>{item?.UserCode}</span>
											</div>
										}
									>
										<span className="font-semibold">
											{++index}. {item?.FullName}
										</span>
									</Tooltip>
								</div>
							))}
						</div>
					</div>
				</div>

				<Form form={form} layout="vertical" className="" onFinish={onFinish}>
					<MyFormItem name={'Status'} label="Điểm danh">
						<MySelectRollUpStatus className="col-12" />
					</MyFormItem>
					<MyFormItem name={'LearningStatus'} label="Học lực">
						<MySelectLearningStatus className="col-12" />
					</MyFormItem>
				</Form>

				<hr className="col-span-full !mt-[8px] mb-[16px]" />

				<div className="col-span-full flex items-center justify-center gap-2">
					<PrimaryButton
						background={'red'}
						type={'button'}
						icon="cancel"
						onClick={() => {
							form.resetFields()
							onCancel()
						}}
					>
						Hủy
					</PrimaryButton>
					<PrimaryButton
						disable={!status}
						background={'green'}
						type={'button'}
						icon="check"
						onClick={() => form.submit()}
						loading={updateStatusMutation.isPending}
					>
						Lưu
					</PrimaryButton>
				</div>
			</div>
		</MyModal>
	)
}

export default RollUpMultipleStudentModal
