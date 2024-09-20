import { useState } from 'react'
import PrimaryButton from '~/common/components/Primary/Button'
import ImportPayrollExcelModal from '../../ImportPayrollExcelModal'

type TProps = {
	refetch?: () => void
}

const ImportExcelButton = ({ refetch }: TProps) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<PrimaryButton background="transparent" type="button" icon="file" onClick={() => setIsOpen(true)}>
				Import excel
			</PrimaryButton>

			<ImportPayrollExcelModal open={isOpen} onCancel={() => setIsOpen(false)} refetch={refetch} />
		</>
	)
}

export default ImportExcelButton
