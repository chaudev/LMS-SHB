import { Card, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { giftApi } from '~/api/gift'
import { majorsApi } from '~/api/majors/majors'
import { majorsRegistrationApi } from '~/api/majors/registration'
import InputTextField from '~/common/components/FormControl/InputTextField'
import SelectField from '~/common/components/FormControl/SelectField'
import { ShowNostis } from '~/common/utils'

const MajorsRegistrationPage = () => {
	const [form] = Form.useForm()
	const StudentId = Form.useWatch('StudentId', form)
	const MajorsId = Form.useWatch('MajorsId', form)
	const MajorsOptions = Form.useWatch('MajorsOptions', form)

	const [studentAvaileblesOptions, setStudentAvaileblesOptions] = useState<{ title: string; value: number | string }[]>([])
	const [studentAvailebles, setStudentAvailebles] = useState<IMajorsRegistrationAvailble[]>([])
	const [majors, setMajors] = useState<IMajors[]>([])
	const [grifOptions, setGrifOptions] = useState<{ title: string; value: number | string }[]>([])

	const getMajorsRegistrationStudentAvailable = async () => {
		try {
			const response = await majorsRegistrationApi.getAllMajorsRegistrationAvailble()
			if (response.status === 200) {
				const templ = []
				response.data.data.map((item, index) => {
					templ.push({
						title: item.StudentName + ' - ' + item.StudentCode,
						value: item.StudentId
					})
				})
				setStudentAvaileblesOptions(templ)
				setStudentAvailebles(response.data.data)
			}
		} catch (error) {}
	}

	const getAllMajors = async () => {
		try {
			const response = await majorsApi.getAll({ pageSize: 9999, pageIndex: 1 })
			if (response.status === 200) {
				const templ = []
				response.data.data.forEach((item, index) => {
					templ.push({
						title: item.Name,
						value: item.Id
					})
				})

				form.setFieldValue('MajorsOptions', templ)
				setMajors(response.data.data)
			}
		} catch (error) {
			// ShowNostis.error(error.message)
		}
	}
	const getAllGrif = async () => {
		try {
			const response = await giftApi.getAll({ pageSize: 9999, pageIndex: 1 })
			if (response.status === 200) {
				const templ = []
				response.data.data.forEach((item, index) => {
					templ.push({
						title: item.Name,
						value: item.Id
					})
				})
				setGrifOptions(templ)
			}
		} catch (error) {
			// ShowNostis.error(error.message)
		}
	}

	useEffect(() => {
		getMajorsRegistrationStudentAvailable()
		getAllMajors()
        getAllGrif()
	}, [])

	useEffect(() => {
		if (StudentId) {
			const student = studentAvailebles.find((value) => {
				return value.StudentId == StudentId
			})
			if (student.HasMajors == true) {
				ShowNostis.warning('Học viên đã có nghành học. Vui lòng sử dụng tính năng chuyển ngành học!')
				form.setFieldValue('StudentId', '')
			}
			form.setFieldValue('MajorsId', '')
		}
	}, [StudentId])

	useEffect(() => {
		if (MajorsId) {
			const templ = majors.find((value) => {
				return value.Id == MajorsId
			})
			form.setFieldValue('MajorsId', templ.Id)
		} else {
		}
	}, [MajorsId])

	const _onFinish = (params) => {
		console.log('_onFinish', params)
	}
	return (
		<Card title="Đăng ký ngành học">
			<Form form={form} layout="vertical" onFinish={_onFinish}>
				<InputTextField name="MajorsOptions" label={''} hidden={true} />
				<SelectField
					className="col-span-2"
					name={'StudentId'}
					label="Chọn học viên"
					optionList={studentAvaileblesOptions}
					rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
				/>
				<SelectField
					className="col-span-2"
					name={'MajorsId'}
					label="Chọn ngành học"
					optionList={MajorsOptions}
					disabled={!StudentId}
					rules={[{ required: true, message: 'Vui lòng ngành học' }]}
				/>
				<InputTextField
					name="TotalPrice"
					disabled={!StudentId}
					label="Tên hình thức thanh toán"
					rules={[{ required: true, message: 'Vui lòng nhập tên hình thức  thanh toán' }]}
				/>
				<SelectField
					className="col-span-2"
					name={'GridId'}
					label="Chọn ngành học"
					optionList={grifOptions}
					disabled={!StudentId}
					rules={[{ required: true, message: 'Vui lòng ngành học' }]}
				/>
			</Form>
		</Card>
	)
}

export default MajorsRegistrationPage
