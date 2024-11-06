import React, { useEffect, useState } from 'react'
import { Card, Popconfirm } from 'antd'
import MySelectClassTranscript from '~/atomic/molecules/MySelectClassTranscript'
import { isNull, ShowErrorToast } from '~/common/utils/main-function'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { classTranscriptApi } from '~/api/class-transcript'
import { ShowNostis } from '~/common/utils'
import PrimaryButton from '../../Primary/Button'
import { saveGradesInClassApi } from '~/api/save-grades-in-class'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { is } from '~/common/utils/common'
import ModalCreateClassTranscript from '../TranscriptV2/components/ModalCreateClassTranscript'
import TranscriptStudentTable from '../TranscriptV2/components/TranscriptStudentTable'
import ModalTranscriptDetail from '../TranscriptV2/components/TranscriptDetail/ModalTranscriptDetail'
import MySelectBranch from '~/atomic/molecules/MySelectBranch'
import MySelectClassByBranches from '~/atomic/molecules/MySelectClassByBranches'

type TParams = { branchId?: number; classId?: number }

const EnterScorePage = () => {
	const [selectedClassTranscript, setSelectedClassTranscript] = useState(null)
	const queryClient = useQueryClient()
	const [openDelete, setOpenDelete] = useState(false)
	const [isEditStudentGrades, setIsEditStudentGrades] = useState(false)
	const [saveStudentGrades, setSaveStudentGrades] = useState<TPostSaveGradesInClass[]>([])
	const [isCreate, setIsCreate] = useState(false)
	const userInfo = useSelector((state: RootState) => state.user.information)

	const [params, setParams] = useState<TParams>({
		branchId: undefined,
		classId: undefined
	})

	// ** handle cancel delete
	const handleCancel = () => {
		setOpenDelete(false)
	}

	// ** handle refresh data
	const refreshData = () => {
		queryClient.refetchQueries({ queryKey: ['get-all-transcript'] })
	}

	// ** handle delete class transcript
	const mutationDelete = useMutation({
		mutationFn: (id: any) => {
			return classTranscriptApi.delete(id)
		},
		onSuccess(data, variables, context) {
			refreshData()
			ShowNostis.success('Đã xóa')
			setSelectedClassTranscript(null)
			handleCancel()
		},
		onError(data, variables, context) {
			ShowErrorToast(data)
		}
	})

	// ** get saved grades in class
	const {
		data: savedGradesInClass,
		isLoading: isLoadingSavedGradesInClass,
		refetch: refetchSavedGradesInClass
	} = useQuery({
		queryKey: ['get/SaveGradesInClass', selectedClassTranscript?.Id],
		queryFn: async () => {
			const res = await saveGradesInClassApi.get({ pageSize: 9999, pageIndex: 1, classTranscriptId: selectedClassTranscript?.Id })
			return res.data.data
		},
		enabled: !!selectedClassTranscript?.Id
	})

	// ** lưu data để edit
	useEffect(() => {
		if (savedGradesInClass?.length > 0) {
			const formated = savedGradesInClass?.reduce((acc, item) => {
				let student = acc?.find((s) => s.StudentId === item.StudentId)
				if (!student) {
					student = {
						ClassTranscriptId: item.ClassTranscriptId,
						StudentId: item.StudentId,
						Details: []
					}
					acc.push(student)
				}
				student.Details.push({
					ClassTranscriptDetailId: item.ClassTranscriptDetailId,
					Value: item.Value
				})
				return acc
			}, [])
			setSaveStudentGrades(formated)
		}
	}, [savedGradesInClass])

	const onChangeParams = (newParams: TParams) => {
		setParams({
			...params,
			...newParams
		})
	}

	// ** handle save student grades
	const handleSaveStudentGrades = () => {
		try {
			mutationSaveGrades.mutateAsync(saveStudentGrades)
		} catch (error) {
			ShowErrorToast(error)
		}
	}

	const mutationSaveGrades = useMutation({
		mutationFn: (data: TPostSaveGradesInClass[]) => {
			return saveGradesInClassApi.add(data)
		},
		onSuccess(data, variables, context) {
			ShowNostis.success('Lưu thành công')
			refetchSavedGradesInClass()
		},
		onError(data, variables, context) {
			ShowErrorToast(data)
		}
	})

	return (
		<Card className="shadow-sm">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<MySelectBranch
						className="h-[36px] min-w-[250px]"
						value={params?.branchId}
						placeholder="Chọn trung tâm"
						onChange={(val) => {
							onChangeParams({ classId: null, branchId: val })
							setSelectedClassTranscript(null)
						}}
						allowClear={false}
					/>

					<MySelectClassByBranches
						className="h-[36px] min-w-[200px] max-w-[250px]"
						branchIds={`${params?.branchId}`}
						value={params?.classId}
						placeholder="Chọn lớp học"
						onChange={(val) => {
							onChangeParams({ ...params, classId: val })
							setSelectedClassTranscript(null)
						}}
						allowClear={false}
					/>

					<MySelectClassTranscript
						classId={params?.classId}
						optionFilterProp="label"
						showSearch
						allowClear={false}
						className="min-w-[200px] custom-select-transcript"
						placeholder="Chọn bảng điểm"
						value={selectedClassTranscript?.Id}
						onChange={(e, item: any) => setSelectedClassTranscript(item?.obj)}
						setSelectedClassTranscript={setSelectedClassTranscript}
						isCreate={isCreate}
						setIsCreate={setIsCreate}
					/>
					{(is(userInfo).admin || is(userInfo).manager || is(userInfo).academic || is(userInfo).teacher) && (
						<ModalCreateClassTranscript
							refreshData={() => {
								refreshData()
								setIsCreate(true)
							}}
							classId={params?.classId}
						/>
					)}

					{!isNull(selectedClassTranscript) &&
						(is(userInfo).admin || is(userInfo).manager || is(userInfo).academic || is(userInfo).teacher) && (
							<ModalCreateClassTranscript
								classId={params?.classId}
								defaultData={selectedClassTranscript}
								refreshData={() => refreshData()}
							/>
						)}
					{!isNull(selectedClassTranscript) &&
						(is(userInfo).admin || is(userInfo).manager || is(userInfo).academic || is(userInfo).teacher) && (
							<Popconfirm
								title={`Xóa ${selectedClassTranscript.Name}?`}
								open={openDelete}
								onConfirm={() => mutationDelete.mutateAsync(selectedClassTranscript.Id)}
								okButtonProps={{ loading: mutationDelete.isPending }}
								onCancel={handleCancel}
								placement="bottom"
							>
								<PrimaryButton background="red" type="button" icon="remove" onClick={() => setOpenDelete(true)} />
							</Popconfirm>
						)}
				</div>
			</div>

			<hr className="border-[#878787] mt-[12px] mb-4" />

			{isNull(selectedClassTranscript) && (
				<div className="min-h-[200px] flex items-center flex-col justify-center">
					{(is(userInfo).admin || is(userInfo).manager || is(userInfo).academic || is(userInfo).teacher) && (
						<div>
							<p className="text-left font-medium">
								<span className="!text-primary">Bước 1.</span> Chọn trung tâm
							</p>
							<p className="text-left font-medium">
								<span className="!text-primary">Bước 2.</span> Chọn lớp học
							</p>
							<p className="text-left font-medium">
								<span className="!text-primary">Bước 3.</span> Chọn bảng điểm mong muốn hoặc thêm mới
							</p>
							<p className="text-left font-medium">
								<span className="!text-primary">Bước 4.</span> Xem xét, điều chỉnh điểm số của học viên trong bảng điểm
							</p>
						</div>
					)}
					{!is(userInfo).admin && !is(userInfo).manager && !is(userInfo).academic && !is(userInfo).teacher && (
						<div>
							<img src="/images/choice.svg" draggable={false} className="w-[200px] mb-2" />
							<p className="text-left font-medium">Chọn bảng điểm để xem thông tin</p>
						</div>
					)}
				</div>
			)}

			{!isNull(selectedClassTranscript) && (
				<>
					{(is(userInfo).admin || is(userInfo).manager || is(userInfo).academic || is(userInfo).teacher) && (
						<div className="flex items-center justify-end gap-2 mb-[10px]">
							<ModalTranscriptDetail defaultData={selectedClassTranscript} />
							{!isEditStudentGrades && (
								<PrimaryButton background="blue" type="button" icon="none" onClick={() => setIsEditStudentGrades(true)}>
									Nhập điểm
								</PrimaryButton>
							)}
							{isEditStudentGrades && (
								<PrimaryButton
									disable={mutationSaveGrades?.isPending}
									background="red"
									type="button"
									icon="none"
									onClick={() => setIsEditStudentGrades(false)}
								>
									Hủy
								</PrimaryButton>
							)}
							{isEditStudentGrades && (
								<PrimaryButton
									disable={mutationSaveGrades?.isPending}
									background="blue"
									type="button"
									icon="save"
									onClick={() => handleSaveStudentGrades()}
								>
									Lưu tất cả
								</PrimaryButton>
							)}
						</div>
					)}

					<TranscriptStudentTable
						isEditStudentGrades={isEditStudentGrades}
						saveStudentGrades={saveStudentGrades}
						setSaveStudentGrades={setSaveStudentGrades}
						classTranscriptData={selectedClassTranscript}
						saveGradeInClass={savedGradesInClass}
						classId={params?.classId}
					/>
				</>
			)}
		</Card>
	)
}

export default EnterScorePage
