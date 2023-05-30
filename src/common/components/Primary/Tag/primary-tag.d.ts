type IPrimaryTag = {
	color: 'green' | 'yellow' | 'blue' | 'red' | 'black' | 'disabled' | 'orange'
	children: React.ReactNode
	className?: string,
	width?: 'w-full' | 'w-auto'|string
}
