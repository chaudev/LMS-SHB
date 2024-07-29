import React, { useEffect, useState } from 'react'
import MyDivider from '~/atomic/atoms/MyDivider'
import ContractModal from '../../Info-Course/ContractManagement/components/ContractModal'
import MyModal from '~/atomic/atoms/MyModal'
import { Form } from 'antd'
import InputTextField from '~/common/components/FormControl/InputTextField'
import EditorField from '~/common/components/FormControl/EditorField'
import PrimaryButton from '~/common/components/Primary/Button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { contractApi } from '~/api/contract'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import { LiaFileContractSolid } from 'react-icons/lia'
import DatePickerField from '~/common/components/FormControl/DatePickerField'
import { resolveSoa } from 'dns'

interface ICreateContract {
	datas: {
		studentId: number
		majorId: number
	}
	contractData: any
	setContractData: Function
}

const CreateContract: React.FC<ICreateContract> = (props) => {
	const { datas, setContractData, contractData } = props
	const [contractContent, setContractContent] = useState('')
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [formContract] = Form.useForm()
	const changeContractContent = (value) => {
		setContractContent(value)
		setContractData({ ...contractData, ContractContent: value })
	}

	// ** get contract template
	const { data: contractTemplate, isLoading: isLoadingContractTemplate } = useQuery({
		queryKey: ['/get-student-contract-template', datas],
		queryFn: () => {
			return contractApi.getByStudentID(datas.studentId).then((res) => res.data.data)
		},
		enabled: isModalVisible && !!datas.studentId
	})

	useEffect(() => {
		if (contractTemplate) {
			formContract.setFieldValue('ContractContent', contractTemplate)
			setContractData({ ...contractData, ContractContent: contractTemplate })
		}
	}, [contractTemplate])

	const onSubmit = (data) => {
		try {
			setContractData({
				ContractContent: contractTemplate,
				ContractNumber: data?.ContractNumber,
				ContractSigningDate: data?.ContractSigningDate
			})
			console.log(data, 'huhhehehe')
			setIsModalVisible(false)
		} catch (error) {
			ShowErrorToast(error)
		}
	}

	const onCancel = () => {
		setIsModalVisible(false)
		formContract.setFieldsValue({
			ContractContent: null,
			ContractNumber: null,
			ContractSigningDate: null
		})
		setContractData({
			ContractContent: null,
			ContractNumber: null,
			ContractSigningDate: null
		})
	}

	const onClose = () => {
		setIsModalVisible(false)
	}

	return (
		<div>
			<div className="flex justify-between items-center">
				<p className="font-medium">
					Hợp đồng cam kết{' '}
					<span className={`font-normal ${contractData?.ContractContent ? '!text-primary' : ''}`}>
						{contractData?.ContractContent ? '(Đã thêm)' : '(Chưa có)'}{' '}
					</span>
				</p>
				<button
					type="button"
					onClick={() => setIsModalVisible(true)}
					className="font-normal p-2 rounded-[6px] hover:bg-primaryLight hover:text-primary transition flex items-center gap-1"
				>
					<LiaFileContractSolid size={18} /> {contractData?.ContractContent ? 'Chỉnh sửa hợp đồng' : 'Tạo hợp đồng'}
				</button>
			</div>
			<MyModal title={'Thêm hợp đồng'} open={isModalVisible} onCancel={onClose} footer={null} width={1000}>
				<div className="container-fluid">
					<Form form={formContract} layout="vertical" onFinish={onSubmit}>
						<div className="grid grid-cols-12 gap-x-4">
							<div className="w780:col-span-6 col-span-12">
								<InputTextField placeholder="Nhập mã hợp đồng" name="ContractNumber" label="Mã hợp đồng" />
							</div>
							<div className="w780:col-span-6 col-span-12">
								<DatePickerField
									placeholder="Ngày ký hợp đồng"
									name="ContractSigningDate"
									label="Ngày ký hợp đồng"
									mode="single"
									format="DD-MM-YYYY"
								/>
							</div>
							<div className="col-span-12">
								<EditorField label="Nội dung hợp đồng" name="ContractContent" onChangeEditor={changeContractContent} />
							</div>
							<div className="col-span-12 flex-all-center gap-2">
								<PrimaryButton icon={'add'} type="submit" background={'green'}>
									Xác nhận hợp đồng
								</PrimaryButton>
								<PrimaryButton icon={'cancel'} type="button" background={'transparent'} onClick={() => onCancel()}>
									Hủy bỏ
								</PrimaryButton>
							</div>
						</div>
					</Form>
				</div>
			</MyModal>
			<MyDivider />
		</div>
	)
}

export default CreateContract
