import { Select, Form, DatePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import moment from 'moment'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { branchApi } from '~/api/branch'
import { IoAnalytics } from 'react-icons/io5'

import { StatisticPointStudent } from '~/common/components/Dashboard/StatisticPointStudent'
import { ListFeedback } from '~/common/components/Dashboard/ListFeedback'
import { feedbackStudentApi } from '~/api/feedbacks-student'
import DashboardStudents from './Student'
import StudentByAttenance from './Student/ByAttenance'
import { userInformationApi } from '~/api/user/user'
import { useRole } from '~/common/hooks/useRole'
import StatisticOverview from './Statistic/Overview'
import CustomerOfSales from './Statistic/CustomerOfSales'
import { ClassNew } from './Statistic/TestApppointment'
import Revenue from './Statistic/Revenue'
import TopLearning from './Statistic/TopLearning'
import TopPurpose from './Statistic/TopPurpose'
import NewClass from './Statistic/NewClass'
import RateTeacher from './Statistic/RateTeacher'
import NewCustomer from './Statistic/NewCustomer'
import TeacherRate from './Statistic/TeacherRate'
import TotalScheduleTeacher from './Statistic/TotalScheduleTeacher'
import Source from './Statistic/Source'
import TopJob from './Statistic/TopJob'
import StudentAge from './Statistic/StudentAge'
import FeedRating from './Statistic/FeedRating'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'

const Dashboard = () => {
	const user = useSelector((state: RootState) => state.user.information)

	const { isAdmin, isTeacher, isAcademic, isStudent, isSaler, isAccountant, isParents, isManager } = useRole()
	const listTodoApi = { branchIds: '', year: String(moment().year()) }

	const listTodoApiOverView = {
		branchIds: '',
		userId: ''
	}

	const [idStudent, setIdStudent] = useState(null)
	const [todoApi, setTodoApi] = useState(listTodoApi)
	const [todoApiOverView, setTodoApiOverView] = useState(listTodoApiOverView)
	const [allBranch, setAllBranch] = useState([])
	const [student, setStudent] = useState<{ label: string; value: string }[]>([])
	const initialFeedback = { pageSize: PAGE_SIZE, pageIndex: 1 }
	const [todoFeedback, setTodoFeedback] = useState(initialFeedback)
	const [feedback, setFeedback] = useState([])
	const [totalFeedback, setTotalFeedback] = useState(0)

	const viewWholeData = checkIncludesRole(listPermissionsByRoles.statistics.viewFullData, Number(user?.RoleId))

	// ----------------------------------------------------------------

	const getAllBranch = async () => {
		try {
			const { data } = await branchApi.getAll()
			setAllBranch(data.data)
		} catch (error) {
			console.log('error', error)
		}
	}

	const handleChangeBranch = (val) => {
		if (val && val.length > 0) {
			const branchs = val.toString()
			setTodoApi({ ...todoApi, branchIds: branchs })
			setTodoApiOverView({ ...todoApiOverView, branchIds: branchs })
		} else {
			setTodoApi({ ...todoApi, branchIds: '' })
			setTodoApiOverView({ ...todoApiOverView, branchIds: '' })
		}
	}

	const getFeedback = async () => {
		try {
			const res = await feedbackStudentApi.getAll(todoFeedback)
			if (res.status === 200) {
				setFeedback(res.data.data)
				setTotalFeedback(res.data.totalRow)
			}
			if (res.status === 204) {
				setFeedback([])
			}
		} catch (error) {}
	}

	const getUser = async () => {
		try {
			const res = await userInformationApi.getAll({ pageIndex: 1, pageSize: 9999, parentIds: user.UserInformationId.toString() })
			if (res.status == 200) {
				let temp = []
				res?.data?.data?.forEach((item) => {
					temp.push({ label: `${item?.FullName} - ${item.UserCode}`, value: item?.UserInformationId })
				})

				setStudent(temp)
			}
			if (res.status == 204) {
				setStudent([])
			}
		} catch (err) {
			console.log(err)
		}
	}

	const handleChangeStudent = (val) => {
		console.log('handleChangeStudent')

		setTodoApiOverView({ ...todoApiOverView, userId: val })
		setIdStudent(val)
	}

	useEffect(() => {
		if (user.UserInformationId) {
			getUser()
		}
	}, [user])

	useEffect(() => {
		getFeedback()
		getAllBranch()
	}, [])

	return (
		<div className="w-full d-flex flex-col  mx-auto dashboard gap-4">
			{viewWholeData ? <StudentByAttenance /> : ''}

			<div className="w-full grid grid-cols-1 tablet:grid-cols-3 gap-4">
				{isParents && (
					<div className="col-span-1 ">
						<Select onChange={handleChangeStudent} options={student} className="w-full h-[36px]"></Select>
					</div>
				)}
				{!isStudent && (
					<>
						<div className="col-span-1">
							<Select
								className="w-full h-[36px]"
								mode="multiple"
								onClear={() => {
									console.log('onClear')
								}}
								onChange={handleChangeBranch}
								allowClear
								placeholder="Trung tâm"
							>
								{allBranch?.length > 0 &&
									allBranch?.map((branch, index) => (
										<Select.Option value={branch.Id} key={index}>
											{branch.Name}
										</Select.Option>
									))}
							</Select>
						</div>
						<div className="col-span-1">
							<DatePicker
								className="w-full h-[36px] primary-input"
								onChange={(date: any, dateString: string) => {
									setTodoApi((pre) => ({ ...pre, year: dateString }))
									setTodoApiOverView((pre) => ({ ...pre, year: dateString }))
								}}
								picker="year"
								placeholder="Chọn năm"
							/>
						</div>
					</>
				)}
			</div>

			<StatisticOverview todoApiOverView={todoApiOverView} />

			{viewWholeData && <DashboardStudents />}

			{viewWholeData && (
				<>
					{isAcademic ? <Revenue todoApi={todoApi} /> : ''}
					<div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
						<div className="col-span-1">
							<TopLearning todoApi={todoApi} />
						</div>
						<div className="col-span-1">
							<TopPurpose todoApi={todoApi} />
						</div>
						<div className="col-span-1">
							<NewClass todoApi={todoApi} />
						</div>
						<div className="col-span-1">
							<NewCustomer todoApi={todoApi} />
						</div>
						<div className="col-span-1 tablet:col-span-2">
							<Source todoApi={todoApi} />
						</div>
						{/* <div className="col-span-1">
							<TopJob todoApi={todoApi} />
						</div> */}
					</div>
					<StudentAge todoApi={todoApi} />
					{isManager ? <FeedRating todoApi={todoApi} /> : ''}
				</>
			)}

			{isTeacher && (
				<div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
					<div className="col-span-1">
						<TeacherRate todoApi={todoApi} />
					</div>
					<div className="col-span-1">
						<TotalScheduleTeacher todoApi={todoApi} />
					</div>
				</div>
			)}

			{(isStudent || isParents) && (
				<>
					<StatisticPointStudent idStudent={idStudent} />
					<ListFeedback
						totalFeedback={totalFeedback}
						initialFeedback={initialFeedback}
						dataTable={feedback}
						setTodo={setTodoFeedback}
						todo={todoFeedback}
					/>
					<RateTeacher todoApi={todoApi} />
				</>
			)}

			{isSaler && (
				<div>
					<CustomerOfSales todoApi={todoApi} />
					<ClassNew todoFeedback={todoFeedback} />
				</div>
			)}

			{isAccountant && (
				<>
					<Revenue todoApi={todoApi} />
					<div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
						<div className="col-span-1">
							<NewClass todoApi={todoApi} />
						</div>
						<div className="col-span-1">
							<CustomerOfSales todoApi={todoApi} />
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default Dashboard

Dashboard.CardItem = ({ item }) => {
	return (
		<div className="col-span-3 p-3 rounded-md shadow-md bg-tw-white">
			<p className="text-[24px] ">{item.Name}</p>
			<div className="flex justify-between mt-3">
				<span className="text-lg font-bold">{item.Value}</span>

				<div className="icon ">
					<IoAnalytics size={30} />
				</div>
			</div>
		</div>
	)
}
