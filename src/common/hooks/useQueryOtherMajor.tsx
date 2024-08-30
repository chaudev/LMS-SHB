import { useQuery } from '@tanstack/react-query'
import { otherMajorApi } from '~/api/other-major'

const useQueryOtherMajor = (visible?: boolean) => {
	const data = useQuery({
		queryKey: [otherMajorApi.keyGetDropdown],
		queryFn: () => otherMajorApi.getDropdown().then((data) => data.data.data),
		enabled: visible
	})

	return { ...data }
}

export default useQueryOtherMajor
