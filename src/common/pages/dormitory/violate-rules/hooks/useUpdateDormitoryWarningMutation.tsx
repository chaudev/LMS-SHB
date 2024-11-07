import { useMutation } from '@tanstack/react-query'
import dormitoryWarningApi from '~/api/dormitory/dormitory-warning'

export default function useUpdateDormitoryWarningMutation() {
	return useMutation({
		mutationFn: dormitoryWarningApi.updateDormitoryWarning
	})
}
