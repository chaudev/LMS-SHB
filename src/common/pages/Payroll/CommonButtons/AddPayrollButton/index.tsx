import { useState } from 'react'
import PrimaryButton from '~/common/components/Primary/Button'
import PayrollModal from '../../PayrollModal'

type TProps = {
	refetch?: () => void
}

const AddPayrollButton = ({ refetch }: TProps) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<PrimaryButton background="green" type="button" icon="add" onClick={() => setIsOpen(true)}>
				Thêm mới
			</PrimaryButton>

			<PayrollModal open={isOpen} mode="create" onCancel={() => setIsOpen(false)} refetch={refetch} />
		</>
	)
}

export default AddPayrollButton
