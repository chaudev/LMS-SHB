import { Collapse, Empty, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { majorsRegistrationApi } from '~/api/majors/registration'
import { ShowNostis } from '~/common/utils'
import CardPaymentTimes from './CardPaymentTime'
import CardLearningHistory from './CardLearningHistory'
import HeaderPanalMajors from './HeaderPanalMajors'
import { foreignLanguageApi } from '~/api/foreign-language'
import { visaStatusApi } from '~/api/visa-status'
import { profileStatusApi } from '~/api/profile-status'
import { processApi } from '~/api/process'

interface TabMajors {}

interface IOptionType {
	foreignLanguage: IOption[]
	visaStatus: IOption[]
	profileStatus: IOption[]
	processingStatus: IOption[]
}

interface IOption {
	value: string | number
	title: string
}

const TabMajors: React.FC<TabMajors> = () => {
	const router = useRouter()
	const { StudentID } = router.query
	const [majors, setMajors] = useState<IMajorsRegistration[]>([])
	const [loading, setLoading] = useState<'' | 'GET_ALL'>('')
	const [panels, SetPanals] = useState<number[]>([])
	const [optionType, setOptionType] = useState<IOptionType>()

	const getMajorsRegistration = async () => {
		try {
			setLoading('GET_ALL')
			const params = {
				studentId: Number(StudentID),
				pageSize: 9999,
				pageIndex: 1
			}
			const response = await majorsRegistrationApi.getAllMajorsRegistration(params)

			if (response.status === 200) {
				setMajors(response.data.data)
				SetPanals([response.data.data[0].Id])
			}
			if (response.status === 204) {
				setMajors([])
			}
			setLoading('')
		} catch (error) {
			setLoading('')
			ShowNostis.error(error.message)
		}
	}
	const getAllOptionType = async () => {
		try {
			// setLoading('INIT_PAGE')
			const [foreignLanguage, visaStatus, profileStatus, processingStatus] = await Promise.all([
				foreignLanguageApi.getAll({ pageIndex: 1, pageSize: 9999 }),
				visaStatusApi.getAll({ pageIndex: 1, pageSize: 9999 }),
				profileStatusApi.getAll({ pageIndex: 1, pageSize: 9999 }),
				processApi.getAll({ pageIndex: 1, pageSize: 9999 })
			])

			let tempOption = { foreignLanguage: [], visaStatus: [], profileStatus: [], processingStatus: [] }

			if (foreignLanguage.status === 200) {
				let temp = []
				foreignLanguage.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.foreignLanguage = temp
			}
			if (visaStatus.status === 200) {
				let temp = []
				visaStatus.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.visaStatus = temp
			}
			if (profileStatus.status === 200) {
				let temp = []
				profileStatus.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.profileStatus = temp
			}
			if (processingStatus.status === 200) {
				let temp = []
				processingStatus.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.processingStatus = temp
			}

			setOptionType(tempOption)
			// setLoading('')
		} catch (error) {}
	}

	useEffect(() => {
		if (!!StudentID) {
			getAllOptionType()
			getMajorsRegistration()
		}
	}, [StudentID])

	return (
		<Spin spinning={loading === 'GET_ALL'}>
			<div className="d-flex flex-col gap-3">
				{majors && majors.length > 0 ? (
					majors.map((item) => (
						<Collapse
							key={item.Id}
							bordered={false}
							defaultActiveKey={[majors[0].Id]}
							onChange={(value) => {
								console.log(value)
								if (value && !panels.includes(item.Id)) {
									let refPanals = [...panels]
									refPanals.push(item.Id)
									SetPanals(refPanals)
								}
							}}
						>
							<Collapse.Panel
								key={item.Id}
								header={
									<HeaderPanalMajors
										majorsName={item.MajorsName}
										paymentTypeName={item.PaymentTypeName}
										giftName={item.GiftName}
										note={item.Note}
										statusName={item.StatusName}
										status={item.Status}
										paid={item.Paid}
										totalPrice={item.TotalPrice}
									/>
								}
							>
								<div className="d-flex flex-col gap-3">
									<CardPaymentTimes optionType={optionType} majorsId={item.Id} studentId={Number(StudentID)} panels={panels} />
									<CardLearningHistory majorsId={item.Id} studentId={Number(StudentID)} panels={panels} />
								</div>
							</Collapse.Panel>
						</Collapse>
					))
				) : (
					<Empty description="Không có dữ liệu"></Empty>
				)}
			</div>
		</Spin>
	)
}

export default TabMajors
