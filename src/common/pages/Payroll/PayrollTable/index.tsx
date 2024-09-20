import { ColumnsType } from 'antd/lib/table'
import { useSelector } from 'react-redux'
import PrimaryTable from '~/common/components/Primary/Table'
import { _format, ShowNoti } from '~/common/utils'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { RootState } from '~/store'
import { useMutation } from '@tanstack/react-query'
import { staffSalaryRealApi } from '~/api/staff-salary-real'
import { ShowErrorToast } from '~/common/utils/main-function'
import { Popconfirm } from 'antd'
import IconButton from '~/common/components/Primary/IconButton'
import { useMemo } from 'react'
import UpdatePayrollButton from '../CommonButtons/UpdatePayrollButton'

type TPayrollTableProps = TMyTable & {
	showActionColumn?: boolean
}

const PayrollTable = (props: TPayrollTableProps) => {
	const { refreshData, showActionColumn = true, ...restProps } = props

	const userInformation = useSelector((state: RootState) => state.user.information)

	const isCanUpdate = checkIncludesRole(listPermissionsByRoles.account.payroll.update, Number(userInformation?.RoleId))
	const isCanDelete = checkIncludesRole(listPermissionsByRoles.config.otherMajor.delete, Number(userInformation?.RoleId))

	const mutationDelete = useMutation({
		mutationFn: (id: any) => {
			return staffSalaryRealApi.delete(id)
		},
		onSuccess(data, variables, context) {
			refreshData()
			ShowNoti('success', 'Xóa thành công')
			refreshData()
		},
		onError(data, variables, context) {
			ShowErrorToast(data)
		}
	})

	const defaultColumns: ColumnsType<TStaffSalaryReal> = [
		{
			title: 'STT',
			dataIndex: '',
			width: 54,
			fixed: 'left',
			render: (value, record, index) => <div className="text-center">{index + 1}</div>
		},
		{
			title: 'Mã nhân viên',
			dataIndex: 'StaffCode',
			fixed: 'left',
			render: (value) => <div className="min-w-[90px]">{value}</div>
		},
		{
			title: 'Tên nhân viên',
			dataIndex: 'StaffName',
			fixed: 'left',
			render: (value) => <div className="min-w-[90px]">{value}</div>
		},
		{
			title: 'Chức vụ',
			dataIndex: 'RoleName',
			render: (value) => <div className="min-w-[60px]">{value}</div>
		},
		{
			title: 'Ngân hàng',
			dataIndex: 'BankName',
			render: (value) => <div className="min-w-[60px]">{value}</div>
		},
		{
			title: 'STK',
			dataIndex: 'BankNumber',
			render: (value) => <div className="min-w-[60px]">{value}</div>
		},
		{
			title: 'Lương theo hợp đồng',
			dataIndex: 'SalaryContract',
			align: 'right',
			render: (value) => <div className="min-w-[140px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Lương cơ bản / Thử việc',
			dataIndex: 'BaseSalary',
			align: 'right',
			render: (value) => <div className="min-w-[160px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Lương hiện suất',
			dataIndex: 'PerformanceSalary',
			align: 'right',
			render: (value) => <div className="min-w-[100px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Khoán điện thoại',
			dataIndex: 'PhoneMoney',
			align: 'right',
			render: (value) => <div className="min-w-[100px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Khoán xăng xe',
			dataIndex: 'GasMoney',
			align: 'right',
			render: (value) => <div className="min-w-[90px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Phụ cấp nhà ở',
			dataIndex: 'HousingAllowance',
			align: 'right',
			render: (value) => <div className="min-w-[100px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Ăn trưa',
			dataIndex: 'LunchMoney',
			align: 'right',
			render: (value) => <div className="min-w-[60px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Phụ cấp thêm',
			dataIndex: 'ExtraAllowance',
			align: 'right',
			render: (value) => <div className="min-w-[80px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Phụ cấp quản lý',
			dataIndex: 'ManagementAllowance',
			align: 'right',
			render: (value) => <div className="min-w-[100px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Phụ cấp đặc thù riêng',
			dataIndex: 'SpecialAllowances',
			align: 'right',
			render: (value) => <div className="min-w-[140px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Số ngày công tính lương',
			dataIndex: 'NumberDaySalary',
			align: 'right',
			render: (value) => <div className="min-w-[150px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Ngày công thực tế',
			dataIndex: 'ActualWorkDay',
			align: 'right',
			render: (value) => <div className="min-w-[120px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Ngày công phép',
			dataIndex: 'DayOffAllow',
			align: 'right',
			render: (value) => <div className="min-w-[100px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Ngày / giờ công làm việc',
			dataIndex: 'WorkDaysHour',
			align: 'right',
			render: (value) => <div className="min-w-[150px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Thêm giờ (ngày thường)',
			dataIndex: 'MoreHourOrdinaryDay',
			align: 'right',
			render: (value) => <div className="min-w-[150px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Thêm giờ (ngày nghỉ)',
			dataIndex: 'MoreHourDayOff',
			align: 'right',
			render: (value) => <div className="min-w-[140px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Thêm giờ (ngày lễ, tết)',
			dataIndex: 'MoreHourHoliday',
			align: 'right',
			render: (value) => <div className="min-w-[150px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Lương ngày công',
			dataIndex: 'WorkDaySalary',
			align: 'right',
			render: (value) => <div className="min-w-[110px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Lương giờ dạy',
			dataIndex: 'TeachingHourSalary',
			align: 'right',
			render: (value) => <div className="min-w-[100px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Tổng lương thêm giờ',
			dataIndex: 'TotalOvertimePay',
			align: 'right',
			render: (value) => <div className="min-w-[130px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Hoa hồng',
			dataIndex: 'Commission',
			align: 'right',
			render: (value) => <div className="min-w-[60px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Thưởng tết',
			dataIndex: 'NewYearBonus',
			align: 'right',
			render: (value) => <div className="min-w-[70px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Hỗ trợ đồng phục',
			dataIndex: 'UniformSupport',
			align: 'right',
			render: (value) => <div className="min-w-[120px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Khoán công tác phí, lưu trú',
			dataIndex: 'AccommodationAllowance',
			align: 'right',
			render: (value) => <div className="min-w-[170px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Khoán dự án / vụ việc',
			dataIndex: 'ProjectContract',
			align: 'right',
			render: (value) => <div className="min-w-[150px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Khác',
			dataIndex: 'Other',
			align: 'right',
			render: (value) => <div className="min-w-[60px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Trừ đi trễ / về sớm',
			dataIndex: 'MinusLateOrLeavingEarly',
			align: 'right',
			render: (value) => <div className="min-w-[130px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'BHXH / BHYT / BHTN (10.5%)',
			dataIndex: 'SI_HI_UI',
			align: 'right',
			render: (value) => <div className="min-w-[180px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Thuế TNCN',
			dataIndex: 'PIT',
			align: 'right',
			render: (value) => <div className="min-w-[80px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Khoản giảm trừ khác',
			dataIndex: 'OtherDeduction',
			align: 'right',
			render: (value) => <div className="min-w-[130px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Tạm ứng',
			dataIndex: 'AdvancePayment',
			align: 'right',
			render: (value) => <div className="min-w-[60px]">{_format.numberToPrice(value || 0)}</div>
		},
		{
			title: 'Thực nhận',
			dataIndex: 'ActualReceipt',
			align: 'right',
			fixed: 'right',
			render: (value) => <div className="min-w-[70px]">{_format.numberToPrice(value || 0)}</div>
		}
	]

	const actionColumns: ColumnsType<TStaffSalaryReal> = [
		{
			title: 'Chức năng',
			align: 'center',
			fixed: 'right',
			width: 120,
			render: (text, record, index) => (
				<div className="flex">
					{isCanUpdate && <UpdatePayrollButton defaultData={record} refetch={refreshData} />}

					{isCanDelete && (
						<Popconfirm
							title="Bạn có chắc chắn muốn xóa không?"
							okText="Có"
							cancelText="Hủy"
							onConfirm={() => mutationDelete.mutateAsync(record.Id)}
							placement="left"
						>
							<IconButton type="button" icon="remove" color="red" onClick={() => {}} className="" tooltip="Xóa" />
						</Popconfirm>
					)}
				</div>
			)
		}
	]

	const columns = useMemo(() => {
		if (showActionColumn && (isCanUpdate || isCanDelete)) {
			return [...defaultColumns, ...actionColumns]
		}
		return defaultColumns
	}, [showActionColumn, isCanUpdate, isCanDelete])

	return <PrimaryTable columns={columns} {...restProps} />
}

export default PayrollTable
