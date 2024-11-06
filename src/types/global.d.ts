declare type IFormBaseProps = {
	visible: boolean
	onCancel?: any
	reloadData?: Function
}
type IOptionCommon = {
	title: string
	value: string | number
	options?: { [k: string]: any }
	date?: string
	disabled?: boolean
}

type TMyTable = {
	total: number
	loading: boolean
	onChangePage: any
	data: any[]
	refreshData: any
} & Omit<IPrimaryTable, 'columns'>
