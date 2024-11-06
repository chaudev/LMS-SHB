import clsx from 'clsx'
import React from 'react'

interface RenderBlockProps {
	label: string
	bgColor: string
	icon: any
	total: string | number
	className?: string
}

export default function RenderBlock({ label, bgColor, icon, total, className }: RenderBlockProps) {
	return (
		<div className={clsx('border rounded-tl-lg rounded-tr-lg overflow-hidden', className)}>
			<div className={clsx('flex items-center justify-between text-tw-white px-6 py-2.5', bgColor)}>
				<p className="font-semibold">{label}</p>
				<div className="p-2 bg-tw-white/20 rounded-lg">{icon}</div>
			</div>
			<div className="px-6 py-2">
				<p>Tổng cộng: {total}</p>
			</div>
		</div>
	)
}
