import { useMutation } from '@tanstack/react-query'
import dormitoryWarningApi from '~/api/dormitory/dormitory-warning'

export default function useCreateDormitoryWarningMutation() {
	return useMutation({
		mutationFn: dormitoryWarningApi.createDormitoryWarning
	})
}
