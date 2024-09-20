import { useMutation, useQuery } from '@tanstack/react-query'
import { Input } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { staffSalaryRealApi } from '~/api/staff-salary-real'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { RootState } from '~/store'
import PayrollTable from './PayrollTable'
import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNoti } from '~/common/utils'
import ImportExcelButton from './CommonButtons/ImportExcelButton'
import AddPayrollButton from './CommonButtons/AddPayrollButton'

const defaultParams = {
	pageSize: 30,
	pageIndex: 1
}

const PayrollPage = () => {
	const userInformation = useSelector((state: RootState) => state.user.information)

	const [params, setParams] = useState<TGetStaffSalaryRealParams>(defaultParams)

	// ===== FETCH DATA =====
	const {
		data: dataQuery,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [staffSalaryRealApi.keyGetAll, [params.pageSize, params.pageIndex, params?.search]],
		queryFn: async () => {
			const data = await staffSalaryRealApi.getAll(params)
			return data.data
		}
	})

	// ===== METHODS =====
	// ----- Tải file mẫu -----
	const mutationDownloadTemplate = useMutation({
		mutationFn: async () => await staffSalaryRealApi.exportTemplateExcel(),
		onSuccess: (res) => {
			ShowNoti('success', 'Thành công !')
			window.open(res?.data?.data, '_blank')
		},
		onError: (error) => ShowNoti('error', error.message)
	})

	// ----- Xuất excel -----
	const mutationExportExcel = useMutation({
		mutationFn: async () => await staffSalaryRealApi.exportExcel(params),
		onSuccess: (res) => {
			ShowNoti('success', 'Thành công !')
			window.open(res?.data?.data, '_blank')
		},
		onError: (error) => ShowNoti('error', error.message)
	})

	return (
		<PayrollTable
			total={dataQuery?.totalRow || 0}
			data={dataQuery?.data}
			loading={isLoading}
			refreshData={refetch}
			onChangePage={(pageIndex, pageSize) => setParams({ ...params, pageIndex, pageSize })}
			TitleCard={
				<div className="flex-1">
					<Input.Search
						className="primary-search max-w-[250px]"
						onChange={(event) => {
							if (event.target.value == '') {
								setParams({ ...params, pageIndex: 1, search: '' })
							}
						}}
						onSearch={(val) => setParams({ ...params, pageIndex: 1, search: val })}
						placeholder="Tìm kiếm"
					/>
				</div>
			}
			Extra={
				<div className="flex items-center gap-[12px]">
					{checkIncludesRole(listPermissionsByRoles.account.payroll.create, Number(userInformation?.RoleId)) && (
						<>
							<PrimaryButton
								background="transparent"
								type="button"
								icon="download"
								loading={mutationDownloadTemplate.isPending}
								onClick={() => mutationDownloadTemplate.mutate()}
							>
								Tải file mẫu
							</PrimaryButton>

							<ImportExcelButton refetch={refetch} />
						</>
					)}

					<PrimaryButton
						background="transparent"
						type="button"
						icon="excel"
						loading={mutationExportExcel.isPending}
						onClick={() => mutationExportExcel.mutate()}
					>
						Xuất excel
					</PrimaryButton>

					{checkIncludesRole(listPermissionsByRoles.account.payroll.create, Number(userInformation?.RoleId)) && (
						<AddPayrollButton refetch={refetch} />
					)}
				</div>
			}
		/>
	)
}

export default PayrollPage
