import { useQuery } from '@tanstack/react-query'
import { forEach } from 'lodash'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { classTranscriptDetailApi } from '~/api/class-transcript'
import { saveGradesInClassApi } from '~/api/save-grades-in-class'
import { studentInClassApi } from '~/api/student-in-class'
import MyInput from '~/atomic/atoms/MyInput'
import MyInputNumber from '~/atomic/atoms/MyInputNumber'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { SAMPLE_GRADE_COLUMN_TYPES_OBJECTS } from '~/common/utils/constants'
import { ShowErrorToast } from '~/common/utils/main-function'

const DEFAULT_FILTER = { pageSize: PAGE_SIZE, pageIndex: 1 }

interface ITranscriptStudentTable {
	classTranscriptData: TClassTranscript
	isEditStudentGrades?: boolean
	saveStudentGrades: any
	setSaveStudentGrades: Function
	saveGradeInClass?: TSaveGradesInClass[]
	classId: number
}

const TranscriptStudentTable: React.FC<ITranscriptStudentTable> = (props) => {
	const { classTranscriptData, isEditStudentGrades, setSaveStudentGrades, saveStudentGrades, saveGradeInClass, classId } = props
	const [pageFilter, setPageFilter] = useState(DEFAULT_FILTER)
	const router = useRouter()

	// ** get student in class
	const { data: studentsInClass, isLoading: isLoadingStudentsInClass } = useQuery({
		queryKey: ['get/student-in-class', pageFilter, classId],
		queryFn: () => {
			return studentInClassApi.getAll({ ...pageFilter, classId: classId }).then((data) => data.data)
		},
		enabled: !!classId && router.isReady
	})

	// ** get class transcript columns
	const { data: classTranscriptColumns, isLoading: isLoadingClassTranscriptColumns } = useQuery({
		queryKey: ['get/class-transcript-detail-column', classTranscriptData?.Id],
		queryFn: () => {
			return classTranscriptDetailApi.getTranscriptColumns(classTranscriptData?.Id).then((data) => data.data)
		},
		enabled: !!classTranscriptData?.Id && router.isReady
	})

	// ** gen column dựa theo cột điểm cho từng học viên
	const genColumns = (data: TClassTranscriptDetail[]) => {
		const columns = [
			{
				title: 'Học viên',
				dataIndex: 'FullName',
				className: 'min-w-[100px]',
				fixed: 'left',
				render: (value, item) => {
					return (
						<div>
							<p className="font-medium">{value}</p>
							<p className="">{item?.UserCode}</p>
						</div>
					)
				}
			}
		]

		const scoreColumns = data?.map((item) => ({
			title: item.Name,
			dataIndex: `${item.Id}`,
			className: 'min-w-[200px]',
			key: item.Id,
			fixed: '',
			render: (value, data) => (
				<div>
					{isEditStudentGrades ? (
						<>
							{item?.Type == SAMPLE_GRADE_COLUMN_TYPES_OBJECTS.grades && (
								<MyInputNumber
									defaultValue={getStudentGrade(data?.StudentId, item.Id)}
									onChange={(e) => handleOnChangeGrade(e, data, item)}
								/>
							)}
							{item?.Type == SAMPLE_GRADE_COLUMN_TYPES_OBJECTS.comments && (
								<MyInput
									allowClear={false}
									defaultValue={getStudentGrade(data?.StudentId, item.Id)}
									onChange={(e) => handleOnChangeGrade(e.target.value, data, item)}
								/>
							)}
						</>
					) : (
						<p>{getStudentGrade(data?.StudentId, item.Id)}</p>
					)}
				</div>
			)
		}))

		return columns.concat(scoreColumns || [])
	}

	// ** lấy điểm đã lưu của từng cột so với từng học sinh trong lớp
	const getStudentGrade = (studentId, classTranscriptDetailId) => {
		try {
			if (saveGradeInClass?.length > 0) {
				const find = saveGradeInClass?.find(
					(item) => item?.ClassTranscriptDetailId === classTranscriptDetailId && item?.StudentId === studentId
				)
				if (find) {
					console.log(find?.Value)
					return find?.Value
				}
				return null
			}
		} catch (error) {
			ShowErrorToast(error)
		}
	}

	// ** xử lý lưu điểm khi onChange
	const handleOnChangeGrade = (value, student, item: TClassTranscriptDetail) => {
		let res = [...saveStudentGrades]

		// hàm dùng chung điều chỉnh hoặc thêm mới cột vào Details
		const updateOrAddDetail = (details, itemId, value) => {
			const existGrade = details.find((g) => g.ClassTranscriptDetailId === itemId)
			if (existGrade) {
				return details.map((d) => (d.ClassTranscriptDetailId === itemId ? { ...d, Value: value } : d))
			}
			return [...details, { ClassTranscriptDetailId: itemId, Value: value }]
		}

		// nếu đã có nhập cột điểm trước đó
		if (res.length > 0) {
			const existStudent = res.find((i) => i.StudentId === student.StudentId)

			// điều chỉnh cột điểm đã nhập trước đó
			if (existStudent) {
				const updatedDetails = updateOrAddDetail(existStudent.Details, item.Id, value)
				const updatedRes = res.map((i) => (i.StudentId === student.StudentId ? { ...i, Details: updatedDetails } : i))
				setSaveStudentGrades(updatedRes)
			} else {
				// Thêm điểm vừa nhập vô cột điểm mới
				const studentGrades = {
					ClassTranscriptId: item.ClassTranscriptId,
					StudentId: student.StudentId,
					Details: [{ ClassTranscriptDetailId: item.Id, Value: value }]
				}
				res.push(studentGrades)
				setSaveStudentGrades(res)
			}
		} else {
			// thêm data điểm đã nhập vào lần đầu
			const studentGrades = {
				ClassTranscriptId: item.ClassTranscriptId,
				StudentId: student.StudentId,
				Details: [{ ClassTranscriptDetailId: item.Id, Value: value }]
			}
			setSaveStudentGrades([studentGrades])
		}
	}

	const columns = genColumns(classTranscriptColumns?.data)

	return (
		<div>
			<PrimaryTable
				total={studentsInClass?.totalRow || 0}
				loading={isLoadingStudentsInClass}
				columns={columns}
				data={studentsInClass?.data || []}
				onChangePage={(pageIndex) => setPageFilter({ ...pageFilter, pageIndex: pageIndex })}
			/>
		</div>
	)
}

export default TranscriptStudentTable
