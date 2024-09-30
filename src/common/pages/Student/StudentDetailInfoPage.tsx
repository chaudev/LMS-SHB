import { Form, Modal, Skeleton, Tabs, TabsProps, Tooltip } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { userInformationApi } from '~/api/user/user'
import UploadImageField from '~/common/components/FormControl/UploadImageField'
import PrimaryButton from '~/common/components/Primary/Button'
import TabStudentDetail from '~/common/components/Student/TabStudentDetail'
import { ShowNoti } from '~/common/utils'
import { RootState } from '~/store'
import { TabBill } from './Tab/TabBill'
import { TabClassList } from './Tab/TabClassList'
import { TabClassListHistory } from './Tab/TabClassListHistory'
import { TabDiscountHistory } from './Tab/TabDiscountHistory'
import { TabStudyRoute } from './Tab/TabStudyRoute'
import { TabTestAppointment } from './Tab/TabTestAppointment'
import TabMajors from './Tab/TabMajors'
import { useRole } from '~/common/hooks/useRole'
import TabPaymentSession from './Tab/TabPaymentSession'
import TabStudentContract from '~/common/components/Student/TabStudentContract'
import { is } from '~/common/utils/common'

export interface IStudentDetailInfoPageProps {}

export default function StudentDetailInfoPage(props: IStudentDetailInfoPageProps) {
	const [studentDetail, setStudentDetail] = useState<IUserResponse>()
	const [isVisibleModal, setIsVisibleModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const [form] = Form.useForm()
	const userInformation = useSelector((state: RootState) => state.user.information)

	const { isStudent, isTeacher, isAdmin, isParents } = useRole()

	const getStudentDetail = async () => {
		try {
			const res = await userInformationApi.getByID(router.query.StudentID)

			if (res.status === 200) {
				setStudentDetail(res.data.data)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const items: TabsProps['items'] =
		is(userInformation).student || is(userInformation).parent
			? [
					{
						key: '1',
						label: `Chi tiết`,
						children: (
							<TabStudentDetail isNotUpdate={isTeacher || isParents} StudentDetail={studentDetail} setStudentDetail={setStudentDetail} refetch={getStudentDetail} />
						)
					},
					{
						key: '2',
						label: `Hợp đồng`,
						children: <TabStudentContract StudentDetail={studentDetail} />
					},
					{
						key: '3',
						label: `Lộ trình`,
						children: <TabStudyRoute StudentDetail={studentDetail} />
					},
					{
						key: '4',
						label: `Thanh toán`,
						children: <TabBill StudentDetail={studentDetail} />
					},
					// {
					// 	key: '10',
					// 	label: `Thu chi`,
					// 	children: <TabPaymentSession StudentDetail={studentDetail} />
					// },
					// {
					// 	key: '5',
					// 	label: `Lịch sử học`,
					// 	children: <TabClassListHistory StudentDetail={studentDetail} />
					// },
					{
						key: '9',
						label: `Chương trình học`,
						children: <TabMajors />
					}
			  ]
			: [
					{
						key: '1',
						label: `Chi tiết`,
						children: (
							<TabStudentDetail isNotUpdate={isTeacher || isParents} StudentDetail={studentDetail} setStudentDetail={setStudentDetail} refetch={getStudentDetail} />
						)
					},
					// {
					// 	key: '2',
					// 	label: `Hợp đồng`,
					// 	children: <TabStudentContract StudentDetail={studentDetail} />
					// },
					{
						key: '3',
						label: `Lớp học`,
						children: <TabClassList StudentDetail={studentDetail} />
					},
					{
						key: '4',
						label: `Lộ trình`,
						children: <TabStudyRoute StudentDetail={studentDetail} />
					},
					{
						key: '5',
						label: `Thanh toán`,
						children: <TabBill StudentDetail={studentDetail} />
					},
					{
						key: '10',
						label: `Thu chi`,
						children: <TabPaymentSession StudentDetail={studentDetail} />
					},
					// {
					// 	key: '6',
					// 	label: `Mã khuyến mãi`,
					// 	children: <TabDiscountHistory StudentDetail={studentDetail} />
					// },
					{
						key: '7',
						label: `Kiểm tra đầu vào`,
						children: <TabTestAppointment StudentDetail={studentDetail} />
					},
					// {
					// 	key: '8',
					// 	label: `Lịch sử học`,
					// 	children: <TabClassListHistory StudentDetail={studentDetail} />
					// },
					{
						key: '9',
						label: `Chương trình học`,
						children: <TabMajors />
					}
			  ]

	const onChange = (key: string) => {
		console.log(key)
	}

	useEffect(() => {
		if (router.query.StudentID) {
			getStudentDetail()
		}
	}, [router.query.StudentID])

	const onFinish = async (data) => {
		setIsLoading(true)
		try {
			let res = await userInformationApi.update({
				...data,
				UserInformationId: studentDetail.UserInformationId
			})
			if (res.status == 200) {
				ShowNoti('success', res.data.message)
				getStudentDetail()
				setIsVisibleModal(false)
			}
		} catch (error) {
			setIsLoading(false)
			ShowNoti('error', error.message)
		} finally {
			setIsLoading(false)
		}
	}

	if (!studentDetail) {
		return <Skeleton />
	}

	return (
		<div className="student-detail">
			<div className="contain">
				<div className="general-info">
					<div className="head">
						<div className="background"></div>
						<div className="more-info">
							<div className="name">{studentDetail.FullName}</div>
							<span className="email">{studentDetail.Email}</span>
						</div>
						<div className="avatar">
							<img src={studentDetail.Avatar || '/default-avatar.png'} alt="" />
							<div className="overlay" onClick={() => setIsVisibleModal(true)}>
								<Tooltip title="Tải ảnh lên">
									<FiUpload size={30} color="#d9d9d9" />
								</Tooltip>
							</div>
						</div>
					</div>
					<div className="body">
						<Tabs destroyInactiveTabPane defaultActiveKey="1" items={items} onChange={onChange} />
					</div>
				</div>
			</div>

			<Modal title="Cập nhật avatar" centered width={400} open={isVisibleModal} onCancel={() => setIsVisibleModal(false)} footer={null}>
				<Form form={form} layout="vertical" initialValues={{ remember: true }} onFinish={onFinish}>
					<div className="grid grid-cols-4 gap-x-4">
						<div className="col-span-4 flex justify-center items-center">
							<UploadImageField form={form} label="" name="Avatar" setIsLoadingImage={setIsLoading} />
						</div>

						<div className="col-span-4 flex justify-center items-center">
							<PrimaryButton background="blue" loading={isLoading} type="submit" children={<span>Lưu</span>} icon="save" />
						</div>
					</div>
				</Form>
			</Modal>
		</div>
	)
}
