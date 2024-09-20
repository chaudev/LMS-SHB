import { FormInstance } from 'antd'
import MyForm, { TMyFormProps } from '~/atomic/atoms/MyForm'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyInput from '~/atomic/atoms/MyInput'
import MyInputNumber from '~/atomic/atoms/MyInputNumber'
import MySelectStaffAvailable from '~/atomic/molecules/MySelectStaffAvailable'

export type TPayrollForm = {
	UserId: number
	BankName: string
	BankNumber: string
	SalaryContract: number
	BaseSalary: number
	PerformanceSalary: number
	PhoneMoney: number
	GasMoney: number
	HousingAllowance: number
	LunchMoney: number
	ExtraAllowance: number
	ManagementAllowance: number
	SpecialAllowances: number
	NumberDaySalary: number
	ActualWorkDay: number
	DayOffAllow: number
	WorkDaysHour: number
	MoreHourOrdinaryDay: number
	MoreHourDayOff: number
	MoreHourHoliday: number
	WorkDaySalary: number
	TeachingHourSalary: number
	TotalOvertimePay: number
	Commission: number
	NewYearBonus: number
	UniformSupport: number
	AccommodationAllowance: number
	ProjectContract: number
	Other: number
	MinusLateOrLeavingEarly: number
	SI_HI_UI: number
	PIT: number
	OtherDeduction: number
	AdvancePayment: number
	ActualReceipt: number
}

type TProps = TMyFormProps & {
	form: FormInstance<TPayrollForm>
	onFinish: (data: TPayrollForm) => void
	disabledUserId?: boolean
}

const PayrollForm = (props: TProps) => {
	const { form, onFinish, disabledUserId, ...restProps } = props

	return (
		<MyForm form={form} layout="vertical" className="" onFinish={onFinish} {...restProps}>
			<div className="grid grid-cols-2 gap-x-[16px]">
				<MyFormItem name="UserId" label="Nhân viên">
					<MySelectStaffAvailable disabled={disabledUserId} />
				</MyFormItem>
				<MyFormItem name="BankName" label="Ngân hàng">
					<MyInput placeholder='Ngân hàng'/>
				</MyFormItem>
				<MyFormItem name="BankNumber" label="STK">
					<MyInput placeholder='STK' />
				</MyFormItem>
				<MyFormItem name="SalaryContract" label="Lương theo hợp đồng">
					<MyInputNumber placeholder='0'/>
				</MyFormItem>
				<MyFormItem name="BaseSalary" label="Lương cơ bản / Thử việc">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="PerformanceSalary" label="Lương hiện suất">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="PhoneMoney" label="Khoán điện thoại">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="GasMoney" label="Khoán xăng xe">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="HousingAllowance" label="Phụ cấp nhà ở">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="LunchMoney" label="Ăn trưa">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="ExtraAllowance" label="Phụ cấp thêm">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="ManagementAllowance" label="Phụ cấp quản lý">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="SpecialAllowances" label="Phụ cấp đặc thù riêng">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="NumberDaySalary" label="Số ngày công tính lương">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="ActualWorkDay" label="Ngày công thực tế">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="DayOffAllow" label="Ngày công phép">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="WorkDaysHour" label="Ngày / giờ công làm việc">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="MoreHourOrdinaryDay" label="Thêm giờ (ngày thường)">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="MoreHourDayOff" label="Thêm giờ (ngày nghỉ)">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="MoreHourHoliday" label="Thêm giờ (ngày lễ, tết)">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="WorkDaySalary" label="Lương ngày công">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="TeachingHourSalary" label="Lương giờ dạy">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="TotalOvertimePay" label="Tổng lương thêm giờ">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="Commission" label="Hoa hồng">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="NewYearBonus" label="Thưởng tết">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="UniformSupport" label="Hỗ trợ đồng phục">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="AccommodationAllowance" label="Khoán công tác phí, lưu trú">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="ProjectContract" label="Khoán dự án / vụ việc">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="Other" label="Khác">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="MinusLateOrLeavingEarly" label="Trừ đi trễ / về sớm">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="SI_HI_UI" label="BHXH / BHYT / BHTN (10.5%)">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="PIT" label="Thuế TNCN">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="OtherDeduction" label="Khoản giảm trừ khác">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
				<MyFormItem name="AdvancePayment" label="Tạm ứng">
					<MyInputNumber placeholder='0' />
				</MyFormItem>
			</div>
		</MyForm>
	)
}

export default PayrollForm
