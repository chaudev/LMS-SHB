import React, { ReactNode } from 'react'
type IFormInputText = {
	style?: object
	label: string | element
	name: string |[number,string]
	isRequired?: boolean
	className?: string
	allowClear?: boolean
	placeholder?: string
	disabled?: boolean
	rules?: array
	defaultValue?: string
	onChange?: any
	value?: any
	suffix?: element
	hidden?:boolean
}

type IUploadImageField = {
	style?: object
	label: string
	form: any
	name: string
	isRequired?: boolean
	multiple?: boolean
	className?: string
	disabled?: boolean
	rules?: array
	setIsLoadingImage?: Function
	max?: any
	onChangeImage?: any
}

type IFormInputNumber = {
	style?: object
	name: string
	label: string
	isRequired?: boolean
	className?: string
	allowClear?: boolean
	placeholder?: string
	disabled?: boolean
	rules?: array
	max?: number
	onChange?: any
	loading?: boolean
	hidden?:boolean
}

type IFormSelectField = {
	style?: object
	name: string | [number,string]
	label: string | element
	isRequired?: boolean
	className?: string
	placeholder?: string
	mode?: 'multiple' | 'tags'
	disabled?: boolean
	isLoading?: boolean
	rules?: array
	onChangeSelect?: function
	onSearch?: function
	onScroll?: function
	optionList: ISelectOptionList[] | []
	title?: string[] | string | ReactNode
	suffix?: element
	allowClear?:boolean
	hidden?:boolean
	initialValue?:any
}

type ISelectOptionList = {
	title: string
	value: any
	disabled?:boolean
}

type IEditorField = {
	label?: string
	name: string
	onChangeEditor: Function
	disableButton?: Function
	isRequired?: boolean
	disabled?: boolean
	rules?: array
	initialValue?: string
	placeholder?: string
	customFieldProps?: any
	id?: any
	height?: number
}

type IUploadFileField = {
	style?: object
	label: string
	form: any
	name: string
	buttonText?: string
	isRequired?: boolean
	multiple?: boolean
	className?: string
	disabled?: boolean
	rules?: array
	onChangeFile?: Function
	max?: number
}

type ITextBoxField = {
	style?: object
	label?: string | element
	name?: string
	rows?: number
	isRequired?: boolean
	className?: string
	allowClear?: boolean
	placeholder?: string
	disabled?: boolean
	rules?: array
	maxLength?: number
	onChange?: Function
	autoSize?:boolean
}

type IDatePickerField = {
	label: string |element
	name: string
	mode: 'range' | 'single'
	placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
	format?: string
	picker?: 'date' | 'showTime' | 'date' | 'week' | 'month' | 'quarter' | 'year'
	isRequired?: boolean
	className?: string
	classNamePicker?: string

	placeholderRange?: [string, string]
	placeholder?: string
	disabled?: boolean
	allowClear?: boolean
	rules?: array
	disabledDate?: any
	form?: any
	showTime?: any
	onChange?: FC
	suffix?: element
}
