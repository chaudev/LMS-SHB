import { useQuery } from '@tanstack/react-query'
import { classApi } from '~/api/class'
import { CLASS_TYPES } from '../constants'

const useClasses = (visible?: boolean) => {
	const data = useQuery({
		queryKey: ['get-all-classes'],
		queryFn: () =>
			classApi
				.getAll({ pageIndex: 1, pageSize: 99999, types: `${CLASS_TYPES.offline},${CLASS_TYPES.online}` })
				.then((data) => data.data.data)
	})

	return { ...data, classes: data.data }
}

export default useClasses
