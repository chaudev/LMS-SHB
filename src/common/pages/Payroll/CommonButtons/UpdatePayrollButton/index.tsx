import { useState } from 'react'
import PayrollModal from '../../PayrollModal'
import IconButton from '~/common/components/Primary/IconButton'

type TProps = {
	defaultData: TStaffSalaryReal
	refetch?: () => void
}

const UpdatePayrollButton = ({ defaultData, refetch }: TProps) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<IconButton type="button" color="yellow" icon="edit" onClick={() => setIsOpen(true)} tooltip="Cập nhật" />

			<PayrollModal open={isOpen} mode="update" onCancel={() => setIsOpen(false)} defaultData={defaultData} refetch={refetch} />
		</>
	)
}

export default UpdatePayrollButton
