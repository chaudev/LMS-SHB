import { motion } from 'framer-motion'

const LoadingLayout = () => {
	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<motion.div
				animate={{
					scale: [1, 0.9, 0.9, 1, 1],
					opacity: [1, 0.48, 0.48, 1, 1]
				}}
				transition={{
					duration: 2,
					ease: 'easeInOut',
					repeatDelay: 1,
					repeat: Infinity
				}}
			>
				<img className="h-[60px] w-[60px]" src="/logo/loading.png" />
			</motion.div>
			<motion.div
				animate={{
					scale: [1, 1.2, 1.2, 1, 1],
					rotate: [0, 270, 270, 0, 0],
					opacity: [1, 0.25, 0.25, 0.25, 1],
					borderRadius: ['25%', '25%', '50%', '50%', '25%']
				}}
				transition={{
					ease: 'linear',
					duration: 3.2,
					repeat: Infinity
				}}
				style={{
					width: 120,
					height: 120,
					position: 'absolute',
					border: 'solid 8px #b32025'
				}}
			/>
			<motion.div
				animate={{
					scale: [1.6, 1, 1, 1.6, 1.6],
					rotate: [270, 0, 0, 270, 270],
					opacity: [0.25, 1, 1, 1, 0.25],
					borderRadius: ['25%', '25%', '50%', '50%', '25%']
				}}
				transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
				style={{
					width: 100,
					height: 100,
					position: 'absolute',
					border: `solid 3px #b32025`
				}}
			/>
		</div>
	)
}

export default LoadingLayout
