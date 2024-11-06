import { Upload } from 'antd'
import { useState } from 'react'
import { customerAdviseApi } from '~/api/customer'
import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNoti } from '~/common/utils'

const ImportCustomer = (props) => {
	const { onFetchData, className, branchId, disabled, onCancel} = props
	const [isLoading, setIsLoading] = useState(false)

	const onChange_ImportExcel = async (info) => {
		if (!branchId) {
			ShowNoti("error", "Vui lòng chọn trung tâm!")
			return
		}
		setIsLoading(true)
		try {
			let res = await customerAdviseApi.importCustomer(info, branchId)
			if (res.status == 200) {
				ShowNoti('success', 'Thành công')
				onCancel()
				onFetchData && onFetchData()
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Upload customRequest={(event) => onChange_ImportExcel(event.file)} className={className} showUploadList={false}>
			<PrimaryButton disable={disabled} className={className} loading={isLoading} type="button" icon="excel" background="yellow">
				Tạo nhanh
			</PrimaryButton>
		</Upload>
	)
}

export default ImportCustomer
