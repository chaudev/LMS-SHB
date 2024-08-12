import React, { useEffect, useState } from 'react'
import PrimaryTable from '../../Primary/Table'
import { Card, Popconfirm } from 'antd'
import ModalCreateClassTranscript from './components/ModalCreateClassTranscript'
import MySelectClassTranscript from '~/atomic/molecules/MySelectClassTranscript'
import { isNull, ShowErrorToast } from '~/common/utils/main-function'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import DeleteTableRow from '../../Elements/DeleteTableRow'
import { classTranscriptApi } from '~/api/class-transcript'
import { ShowNostis } from '~/common/utils'
import IconButton from '../../Primary/IconButton'
import PrimaryButton from '../../Primary/Button'
import ModalTranscriptDetail from './components/TranscriptDetail/ModalTranscriptDetail'
import TranscriptStudentTable from './components/TranscriptStudentTable'
import { useRouter } from 'next/router'
import { saveGradesInClassApi } from '~/api/save-grades-in-class'

const TranscriptPageV2 = () => {
	const [selectedClassTranscript, setSelectedClassTranscript] = useState(null)
	const queryClient = useQueryClient()
	const router = useRouter()
	const [openDelete, setOpenDelete] = useState(false)
	const [isEditStudentGrades, setIsEditStudentGrades] = useState(false)
	const [saveStudentGrades, setSaveStudentGrades] = useState<TPostSaveGradesInClass[]>([])
	const [isCreate, setIsCreate] = useState(false)

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
			console.log(formated, 'log---')
			setSaveStudentGrades(formated)
		}
	}, [savedGradesInClass])

	// ** handle save student grades
	const handleSaveStudentGrades = () => {
		try {
			console.log(saveStudentGrades, 'saveStudentGrades')
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
		<Card
			className="shadow-sm"
			title={
				<div className="flex items-center gap-2">
					<ModalCreateClassTranscript
						refreshData={() => {
							refreshData()
							setIsCreate(true)
						}}
					/>

					<MySelectClassTranscript
						classId={router.query.class}
						optionFilterProp="label"
						showSearch
						allowClear={false}
						className="min-w-[150px] custom-select-transcript"
						placeholder="Chọn bảng điểm"
						value={selectedClassTranscript?.Id}
						onChange={(e, item: any) => setSelectedClassTranscript(item?.obj)}
						setSelectedClassTranscript={setSelectedClassTranscript}
						isCreate={isCreate}
						setIsCreate={setIsCreate}
					/>

					{!isNull(selectedClassTranscript) && (
						<ModalCreateClassTranscript defaultData={selectedClassTranscript} refreshData={() => refreshData()} />
					)}
					{!isNull(selectedClassTranscript) && (
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
			}
			extra={
				<div className="flex flex-wrap items-center gap-2">
					{!isNull(selectedClassTranscript) && <ModalTranscriptDetail defaultData={selectedClassTranscript} />}
					{!isNull(selectedClassTranscript) && (
						<>
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
						</>
					)}
				</div>
			}
		>
			{isNull(selectedClassTranscript) && (
				<div className="h-[200px] flex items-center flex-col justify-center">
					<div>
						<p className="text-left font-medium">
							<span className="!text-primary">Bước 1.</span> Chọn bảng điểm mong muốn hoặc thêm mới
						</p>
						<p className="text-left font-medium">
							<span className="!text-primary">Bước 2.</span> Xem xét, điều chỉnh điểm số của học viên trong bảng điểm
						</p>
					</div>
				</div>
			)}
			{!isNull(selectedClassTranscript) && (
				<TranscriptStudentTable
					isEditStudentGrades={isEditStudentGrades}
					saveStudentGrades={saveStudentGrades}
					setSaveStudentGrades={setSaveStudentGrades}
					classTranscriptData={selectedClassTranscript}
					saveGradeInClass={savedGradesInClass}
				/>
			)}
		</Card>
	)
}

export default TranscriptPageV2
