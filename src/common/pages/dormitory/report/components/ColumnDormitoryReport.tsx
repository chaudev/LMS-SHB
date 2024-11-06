const columnDormitoryReport = [
	{
		title: 'Ký túc xá',
		dataIndex: 'Name',
		fixed: 'left',
		render: (value) => (
			<div>
				<p className="font-medium">{value}</p>
			</div>
		)
	},
	{
		title: 'Mã',
		dataIndex: 'DormitoryCode',
		fixed: 'left',
		render: (value) => (
			<div>
				<p className="font-medium">{value}</p>
			</div>
		)
	},
	{
		title: 'Số khu',
		dataIndex: 'TotalArea',
		className: 'min-w-[100px]',
		fixed: '',
		align: 'right',
		render: (value) => (
			<div>
				<p className="font-medium">{value}</p>
			</div>
		)
	},
	{
		title: 'Tổng số phòng',
		dataIndex: 'TotalRoom',
		className: 'min-w-[100px]',
		fixed: '',
		align: 'right',
		render: (value) => (
			<div>
				<p className="font-medium">{value}</p>
			</div>
		)
	},
	{
		title: 'Đang ở',
		dataIndex: 'RoomQuantityInUse',
		className: 'min-w-[100px]',
		fixed: '',
		align: 'right',
		render: (value) => (
			<div>
				<p className="font-medium">{value}</p>
			</div>
		)
	},
	{
		title: 'Còn trống',
		dataIndex: 'RoomQuantityAvailabe',
		className: 'min-w-[100px]',
		fixed: '',
		align: 'right',
		render: (value) => (
			<div>
				<p className="font-medium">{value}</p>
			</div>
		)
	},
	{
		title: 'Tổng số chỗ',
		dataIndex: 'TotalRoomQuantity',
		className: 'min-w-[100px]',
		fixed: '',
		align: 'right',
		render: (value) => (
			<div>
				<p className="font-medium">{value}</p>
			</div>
		)
	}
]

export default columnDormitoryReport
