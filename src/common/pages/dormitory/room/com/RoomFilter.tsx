import { Form } from 'antd'
import React, { FC, useEffect } from 'react'
import MySelectDormitoryArea from '~/atomic/molecules/MySelectDormitoryArea'
import MySelectDormitory from '~/atomic/molecules/MySelectDormitory'
import PrimaryButton from '~/common/components/Primary/Button'
import MySelect from '~/atomic/atoms/MySelect'

type TFormRoomFilters = {
	DormitoryId?: number
	DormitoryAreaId?: number;
	IsUse?: number;
	IsFull?: number;
}

type TProps = {
	baseFilter: TDormitoryRoomFilter
  handleFilter: (newFilter: TDormitoryRoomFilter) => void
}

export const RoomFilter: FC<TProps> = ({ baseFilter, handleFilter }) => {
	const [form] = Form.useForm<TFormRoomFilters>()

	const dormitoryId = Form.useWatch('DormitoryId', form)
	// const dormitoryAreaId = Form.useWatch('DormitoryAreaId', form)

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
			IsUse: data.IsUse ? (data.IsUse === 1 ? true : false) : undefined,
			IsFull: data.IsFull ? (data.IsFull === 2 ? true : false) :undefined,

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
      IsUse: undefined,
			IsFull: undefined
    })
    form.resetFields()
  }

	return (
		<div className={`wrap-filter small`}>
			<Form layout="vertical" form={form} onFinish={handleOnSearch}>
				<Form.Item label="Tình trạng phòng" name={"IsFull"}>
					<MySelect placeholder="Tình trạng phòng"
						options={[
							{label: 'Còn trống', value: 1},
							{label: 'Hết chỗ', value: 2}
						]}
					/>
				</Form.Item>
				<Form.Item label="Tình trạng sử dụng" name={"IsUse"}>
					<MySelect placeholder="Tình trạng sử dụng"
						options={[
							{label: 'Đang sử dụng', value: 1},
							{label: 'Chưa sử dụng', value: 2}
						]}
					/>
				</Form.Item>

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
					<PrimaryButton  background="blue" type="submit" children={<span>Tìm kiếm</span>} icon="search" />
				</div>
			</Form>
		</div>
	)
}
