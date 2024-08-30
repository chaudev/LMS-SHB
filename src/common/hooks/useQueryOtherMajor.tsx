import { useQuery } from '@tanstack/react-query'
import { otherMajorApi } from '~/api/other-major'

const useQueryOtherMajor = (visible?: boolean) => {
	const data = useQuery({
		queryKey: ['get-all-major-group'],
		queryFn: () => otherMajorApi.getDropdown().then((data) => data.data.data),
		enabled: visible
	})

	return { ...data }
}

export default useQueryOtherMajor
