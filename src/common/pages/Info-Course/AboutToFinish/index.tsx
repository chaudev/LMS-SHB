import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { studentInClassApi } from '~/api/student-in-class'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { is } from '~/common/utils/common'
import { RootState } from '~/store'
import AboutToFinishTable from './components/AboutToFinishTable'
import FilterBaseVer2 from '~/common/components/Elements/FilterBaseVer2'
import MySelect from '~/atomic/atoms/MySelect'
import MyInputNumber from '~/atomic/atoms/MyInputNumber'
import MyDatePicker from '~/atomic/atoms/MyDatePicker'
import PrimaryButton from '~/common/components/Primary/Button'
import { Form } from 'antd'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import moment from 'moment'

const AboutToFinish = () => {
	const router = useRouter()
	const { push, query } = router
	const userInfo = useSelector((state: RootState) => state.user.information)
	const [form] = Form.useForm()
	const selectedType = Form.useWatch('type', form)

	const isAllow = () => {
		if (is(userInfo).admin || is(userInfo).saler) {
			return true
		}
		return false
	}

	useEffect(() => {
		if (!isAllow()) {
			router.push('/')
		} else {
			form.setFieldsValue({
				type: query?.type || 'Lesson',
				lessonRemaining: query.lessonRemaining || 10,
				endDate: query?.endDate ? moment(query?.endDate) : undefined
			})
		}
	}, [])

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get-student-about-to-finish', query],
		queryFn: () => {
			return studentInClassApi
				.getStudentAboutToFinish({
					...query,
					pageSize: query.pageSize || PAGE_SIZE,
					pageIndex: query.pageIndex || 1,
					type: query?.type || 'Lesson',
					lessonRemaining: query.lessonRemaining || 10
				})
				.then((res) => res.data)
		}
	})

	const onSubmit = (data) => {
		router.push({
			query: {
				...query,
				...data,
				endDate: data?.endDate ? moment(data?.endDate).toISOString() : undefined,
				lessonRemaining: data?.lessonRemaining ? data?.lessonRemaining : undefined,
				pageIndex: 1
			}
		})
	}

	return (
		<div>
			{isAllow() && (
				<AboutToFinishTable
					total={data?.totalRow || 0}
					loading={isLoading}
					onChangePage={(pageIndex) => router.push({ query: { ...query, pageIndex: pageIndex } })}
					TitleCard={
						<Form form={form} layout="vertical" onFinish={onSubmit}>
							<div className="grid grid-cols-3 gap-x-2">
								<MyFormItem name="type" className="mb-0">
									<MySelect
										options={[
											{ label: 'Số buổi', value: 'Lesson' },
											{ label: 'Ngày', value: 'Day' }
										]}
										allowClear={false}
										className="min-w-[150px]"
									/>
								</MyFormItem>

								{selectedType == 'Lesson' && (
									<MyFormItem name="lessonRemaining" className="mb-0">
										<MyInputNumber className="h-[36px]" placeholder="Số buổi còn lại" />
									</MyFormItem>
								)}
								{selectedType == 'Day' && (
									<MyFormItem name="endDate" className="mb-0">
										<MyDatePicker className="rounded h-[36px] w-[200px]" placeholder="Chọn ngày kết thúc" format="DD/MM/YYYY" />
									</MyFormItem>
								)}
								<PrimaryButton background="blue" type="submit" children={<span>Tìm kiếm</span>} icon="search" />
							</div>
						</Form>
					}
					data={data?.data || []}
					refreshData={refetch}
				/>
			)}
		</div>
	)
}

export default AboutToFinish
