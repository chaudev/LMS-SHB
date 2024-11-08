import { useState } from 'react'

import { ShowNoti } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

import ExpandTable from '~/common/components/Primary/Table/ExpandTable'

import violateRulesColumns from '~/common/pages/dormitory/violate-rules/components/ViolateRulesColumns'
import ViolateRulesFilter from '~/common/pages/dormitory/violate-rules/components/ViolateRulesFilter'
import useDeleteDormitoryWarningMutation from '~/common/pages/dormitory/violate-rules/hooks/useDeleteDormitoryWarningMutation'
import useDormitoryWarningListQuery from '~/common/pages/dormitory/violate-rules/hooks/useDormitoryWarningListQuery'
import useUpdateDormitoryWarningMutation from '~/common/pages/dormitory/violate-rules/hooks/useUpdateDormitoryWarningMutation'

export default function ViolateRulesTable() {
	const [search, setSearch] = useState<string>('')
	const [select, setSelect] = useState<string>('')

	const dormitoryWarningListQuery = useDormitoryWarningListQuery({ WarningLevel: select, Search: search } as any)
	const deleteDormitoryWarningMutation = useDeleteDormitoryWarningMutation()
	const updateDormitoryWarningMutation = useUpdateDormitoryWarningMutation()

	const handleDelete = async (id: number) => {
		try {
			if (deleteDormitoryWarningMutation.isPending) return
			const result = await deleteDormitoryWarningMutation.mutateAsync(id)
			dormitoryWarningListQuery.refetch()
			ShowNoti('success', result.data.message)
		} catch (error) {
			ShowErrorToast(error)
		}
	}

	const handleUpdate = async (body: TUpdateDormitoryWarning, cbHandleToggleModal: () => void) => {
		try {
			if (updateDormitoryWarningMutation.isPending) return
			const result = await updateDormitoryWarningMutation.mutateAsync(body)
			dormitoryWarningListQuery.refetch()
			ShowNoti('success', result.data.message)
			cbHandleToggleModal()
		} catch (error) {
			ShowErrorToast(error)
		}
	}

	return (
		<div>
			<ExpandTable
				TitleCard={<ViolateRulesFilter setSearch={setSearch} setSelect={setSelect} />}
				columns={violateRulesColumns(handleDelete, handleUpdate)}
				loading={dormitoryWarningListQuery.isPending || dormitoryWarningListQuery.isFetching}
				dataSource={dormitoryWarningListQuery?.data?.data?.data ?? []}
			/>
		</div>
	)
}
