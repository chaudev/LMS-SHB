import { Form, Input, Popover } from 'antd'
import clsx from 'clsx'
import { FC, useEffect } from 'react'
import { Filter } from 'react-feather'
import MySelectDormitory from '~/atomic/molecules/MySelectDormitory'
import MySelectDormitoryArea from '~/atomic/molecules/MySelectDormitoryArea'
import MySelectDormitoryRoom from '~/atomic/molecules/MySelectDormitoryRoom'
import PrimaryButton from '~/common/components/Primary/Button'
import { dormitoryRegisterStatusFilter } from '~/enums/common'

/**
 *  const color = ['blue', 'green', 'yellow', 'gray']
 * return <div className={`tag ${color[status - 1]}`}>{record?.StatusName}</div>
 */
const color = ['blue', 'green', 'yellow', 'gray']

type TProps = {
	filter: TDormitoryRegisterParams
	handleFilter: (newFilter: TDormitoryRegisterParams) => void
}

type TFiltesLocal = {
	DormitoryId?: number
	DormitoryAreaId?: number
	DormitoryRoomId?: number
}

const RegisterFilter: FC<TProps> = ({ filter, handleFilter }) => {
	const [form] = Form.useForm<TFiltesLocal>()
	const dormitoryId = Form.useWatch('DormitoryId', form)
	const dormitoryAreaId = Form.useWatch('DormitoryAreaId', form)

	// useEffect(() => {
	// 	if (filter.DormitoryId) {
	// 		form.setFieldsValue({
	// 			DormitoryId: filter.DormitoryId || undefined,
	// 			DormitoryAreaId: filter.DormitoryAreaId || undefined,
	// 			DormitoryRoomId: filter.DormitoryRoomId || undefined
	// 		})
	// 	}
	// }, [filter.DormitoryAreaId, filter.DormitoryId])

	useEffect(() => {
		form.setFieldValue("DormitoryAreaId", undefined)
		form.setFieldValue("DormitoryRoomId", undefined)
	}, [dormitoryId])

	useEffect(() => {
		form.setFieldValue("DormitoryRoomId", undefined)
	}, [dormitoryAreaId])

	const handleOnSearch = (data: TFiltesLocal) => {
		const dataFilters = {
			...data,
			PageIndex: 1,
			PageSize: 20
		}

		handleFilter(dataFilters)
	}

	const onReset = () => {
		handleFilter({
			PageIndex: 1,
			PageSize: 20,
			Search: '',
			DormitoryId: undefined,
			DormitoryAreaId: undefined,
			DormitoryRoomId: undefined
		})
		form.resetFields()
	}

	const FilterContent = () => {
		return (
			<div className={`wrap-filter small`}>
				<Form layout="vertical" form={form} onFinish={handleOnSearch}>

					<Form.Item name={'DormitoryId'} label="Ký túc xá">
						<MySelectDormitory placeholder="Ký túc xá" />
					</Form.Item>
					<Form.Item name={'DormitoryAreaId'} label="Khu">
						<MySelectDormitoryArea DormitoryId={dormitoryId} placeholder="Khu ký túc xá" disabled={!Boolean(dormitoryId)} />
					</Form.Item>
					<Form.Item name={'DormitoryRoomId'} label="Phòng">
						<MySelectDormitoryRoom DormitoryId={dormitoryId} DormitoryAreaId={dormitoryAreaId} placeholder="Phòng" disabled={!Boolean(dormitoryId) || !Boolean(dormitoryAreaId)} />
					</Form.Item>

					<div className="flex justify-end">
						<PrimaryButton
							className="mr-2"
							background="disabled"
							type="button"
							children={<span>Đặt lại</span>}
							icon="reset"
							onClick={() => onReset()}
						/>
						<PrimaryButton background="blue" type="button" onClick={() => form.submit()} children={<span>Tìm kiếm</span>} icon="search" />
					</div>
				</Form>
			</div>
		)
	}

	return (
		<div className="flex gap-[8px]">
			<Popover placement="bottomLeft" overlayClassName={`filter-popover`} trigger={'click'} content={<FilterContent />}>
				<button className="btn btn-secondary light btn-filter">
					<Filter />
				</button>
			</Popover>

			<Input.Search
				className="primary-search max-w-[250px]"
				onChange={(event) => {
					if (event.target.value == '') {
						handleFilter({ ...filter, PageIndex: 1, Search: '' })
					}
				}}
				onSearch={(event) => handleFilter({ ...filter, PageIndex: 1, Search: event })}
				placeholder="Tìm kiếm"
			/>
			<div className="flex gap-2">
				{dormitoryRegisterStatusFilter.map((item) => (
					<div
						className={clsx(
							'tag !flex items-center cursor-pointer justify-center',
							item.value === filter.Status ? color[item.value - 1] : 'transparent'
						)}
						key={item.value}
						onClick={() => {
							if (filter.Status === item.value) {
								handleFilter({ ...filter, Status: undefined })
							} else {
								handleFilter({ ...filter, Status: item.value })
							}
						}}
					>
						<span className="font-normal text-[14px]">{item.label}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default RegisterFilter
