import { EVALUATION_TYPES } from '~/common/utils/constants'

// ** get border style
export const getBorderStyle = (type) => {
	switch (type) {
		case EVALUATION_TYPES.multipleChoice:
			return 'border-l-tw-blue'
		case EVALUATION_TYPES.essay:
			return 'border-l-tw-orange'
		case EVALUATION_TYPES.evaluate:
			return 'border-l-tw-secondary'
		default:
			break
	}
}

// ** get border style
export const getBorderBoardStyle = ({ index, rightCol, dataLength }) => {
	if (index === 0) {
		return `border-t border-l ${rightCol ? 'border-r' : ''}`
	} else if (index === dataLength - 1) {
		return `border-t border-l border-b ${rightCol ? 'border-r' : ''}`
	} else {
		return `border-t border-l ${rightCol ? 'border-r' : ''}`
	}
}
