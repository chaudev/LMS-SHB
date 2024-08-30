import React, { useEffect, useState } from 'react'
import { Select, DatePicker, Input, Form, Popover } from 'antd'
import { Filter } from 'react-feather'
import moment from 'moment'
import { ShowNoti } from '~/common/utils'
import { MdOutlineRestore, MdSearch } from 'react-icons/md'

const FilterBase = (props) => {
	const { dataFilter } = props
	const [form] = Form.useForm()
	const getVavalue = form.getFieldsValue()
	const { handleFilter, handleReset } = props
	const { RangePicker } = DatePicker

	const [listFilter, setListFilter] = useState(dataFilter)
	const [visible, setVisible] = useState(false)
	const { Option } = Select
	const dateFormat = 'DD/MM/YYYY'

	// ------------ RESET FILTER -------------
	const resetFilter = () => {
		let newFilter = listFilter.map((item) => {
			item.value = null
			return item
		})
		setListFilter(newFilter)
	}

	// ------------- ON SUBMIT -----------------
	const onSubmit = (params) => {
		listFilter
		handleFilter(listFilter)
		setVisible(false)
	}

	// ------------- RETURN NAME FILTER --------------
	const returnListFilter = (value, nameFilter) => {
		listFilter.every((item, index) => {
			if (item.name == nameFilter) {
				item.value = value
				return false
			}
			return true
		})

		setListFilter([...listFilter])
	}

	// ------------- GET VALUE FILTER ----------------
	const getValueFilter = (value, typeFilter, nameFilter) => {
		switch (typeFilter) {
			case 'date-range':
				if (value.length > 1) {
					let fromDate = moment(value[0].toDate()).format('YYYY/MM/DD')
					let toDate = moment(value[1].toDate()).format('YYYY/MM/DD')
					let valueFromDate = {
						name: 'fromDate',
						value: fromDate
					}
					let valueToDate = {
						name: 'toDate',
						value: toDate
					}
					listFilter.push(valueFromDate, valueToDate)
					setListFilter([...listFilter])
				} else {
					ShowNoti('error', 'Chưa chọn đầy đủ ngày')
				}
				break
			case 'date-single':
				let formatValue = moment(value.toDate()).format('YYYY/MM/DD')
				returnListFilter(formatValue, nameFilter)
				break
			case 'select':
				returnListFilter(value, nameFilter)
				break
			default:
				returnListFilter(value, nameFilter)
				break
		}
	}

	const handleChangeFilter = (visible) => {
		setVisible(visible)
	}

	const onReset = () => {
		handleReset()
		setVisible(false)
		resetFilter()
		form.resetFields()
	}

	const fieldOfFilter = (item, index) => {
		switch (item.type) {
			case 'select':
				return (
					<div key={index} className={item.col}>
						<Form.Item name={item.name} label={item.title}>
							<Select
								allowClear
								mode={item.mode}
								style={{ width: '100%' }}
								className="primary-input"
								showSearch
								optionFilterProp="children"
								onChange={(value) => getValueFilter(value, 'select', item.name)}
								placeholder={item.placeholder}
							>
								{item.optionList?.map((item, index) => (
									<Option key={index} value={item.value}>
										{item.title}
									</Option>
								))}
							</Select>
						</Form.Item>
					</div>
				)
			case 'text':
				return (
					<div key={index} className={item.col}>
						<Form.Item name={item.name} label={item.title}>
							<Input
								placeholder={item.placeholder}
								className="primary-input"
								onChange={(e) => getValueFilter(e.target.value, 'text', item.name)}
								allowClear={true}
							/>
						</Form.Item>
					</div>
				)
			case 'date-range':
				return (
					<div key={index} className={item.col}>
						<Form.Item name={item.name} label={item.title}>
							<RangePicker
								placeholder={['Bắt đầu', 'Kết thúc']}
								className="primary-input"
								format={dateFormat}
								onChange={(value) => getValueFilter(value, 'date-range', item.name)}
							/>
						</Form.Item>
					</div>
				)
			case 'date-single':
				return (
					<div className={item.col}>
						<Form.Item name={item.name} label={item.title}>
							<DatePicker
								className="primary-input"
								format={dateFormat}
								onChange={(value) => getValueFilter(value, 'date-single', item.name)}
							/>
						</Form.Item>
					</div>
				)
			default:
				return ''
		}
	}

	const content = (
		<div className={`wrap-filter small`}>
			<Form
				form={form}
				layout="vertical"
				onFinish={onSubmit}
				// onValuesChange={(changedValues, allValues) => {
				// 	console.log('changedValues', changedValues)
				// 	console.log('allValues', allValues)
				// }}
			>
				<div className="row">
					{dataFilter.map((item, index) => fieldOfFilter(item, index))}

					<div className="col-md-12">
						<Form.Item className="mb-0">
							<button type="button" className="light btn btn-secondary" style={{ marginRight: '10px' }} onClick={onReset}>
								<MdOutlineRestore size={18} className="mr-1" />
								Khôi phục
							</button>
							<button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>
								<MdSearch size={18} className="mr-1" />
								Tìm kiếm
							</button>
						</Form.Item>
					</div>
				</div>
			</Form>
		</div>
	)

	return (
		<>
			<Popover
				visible={visible}
				placement="bottomRight"
				content={content}
				trigger="click"
				overlayClassName="filter-popover"
				onVisibleChange={handleChangeFilter}
			>
				<button className="btn btn-secondary light btn-filter">
					<Filter />
				</button>
			</Popover>
		</>
	)
}

export default FilterBase
