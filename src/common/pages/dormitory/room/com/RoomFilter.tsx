import { Form } from 'antd'
import React, { FC, useEffect } from 'react'
import MySelectDormitoryArea from '~/atomic/molecules/MySelectArea'
import MySelectDormitory from '~/atomic/molecules/MySelectDormitory'
import PrimaryButton from '~/common/components/Primary/Button'

type TFormRoomFilters = {
	DormitoryId?: number
	DormitoryAreaId?: number
}

type TProps = {
	baseFilter: TDormitoryRoomFilter
  handleFilter: (newFilter: TDormitoryRoomFilter) => void
}

export const RoomFilter: FC<TProps> = ({ baseFilter, handleFilter }) => {
	const [form] = Form.useForm<TFormRoomFilters>()

	const dormitoryId = Form.useWatch('DormitoryId', form)
	const dormitoryAreaId = Form.useWatch('DormitoryAreaId', form)

	useEffect(() => {
		if (baseFilter.DormitoryId) {
			form.setFieldsValue({
				DormitoryId:  baseFilter.DormitoryId || undefined,
				DormitoryAreaId: baseFilter.DormitoryAreaId || undefined
			})
		}
	}, [baseFilter.DormitoryAreaId, baseFilter.DormitoryId])

	const handleOnSearch = (data: TFormRoomFilters) => {
		const dataFilters = {
      ...data,
      PageIndex: 1,
      PageSize: 20,
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
      IsUse: undefined
    })
    form.resetFields()
  }

	return (
		<div className={`wrap-filter small`}>
			<Form layout="vertical" form={form} onFinish={handleOnSearch}>
				<Form.Item name={'DormitoryId'} label="Ký túc xá">
					<MySelectDormitory placeholder="Ký túc xá" />
				</Form.Item>
				<Form.Item name={'DormitoryAreaId'} label="Khu ký túc xá">
					<MySelectDormitoryArea DormitoryId={dormitoryId} placeholder="Khu ký túc xá" disabled={!Boolean(dormitoryId)} />
				</Form.Item>

				<div className='flex justify-end'>
					<PrimaryButton
						className="mr-2"
						background="disabled"
						type="button"
						children={<span>Đặt lại</span>}
						icon="reset"
						onClick={onReset}
					/>
					<PrimaryButton disable={!Boolean(dormitoryId)} background="blue" type="submit" children={<span>Tìm kiếm</span>} icon="search" />
				</div>
			</Form>
		</div>
	)
}
