type IPrimaryTag = {
	color: 'green' | 'yellow' | 'blue' | 'red' | 'black' |'primary' |'disabled' | 'orange'
	children: React.ReactNode
	className?: string,
	width?: 'w-full' | 'w-auto'|string
}
