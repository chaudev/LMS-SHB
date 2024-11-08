import { useMutation } from '@tanstack/react-query'
import dormitoryWarningApi from '~/api/dormitory/dormitory-warning'

export default function useDeleteDormitoryWarningMutation() {
	return useMutation({
		mutationFn: dormitoryWarningApi.deleteDormitoryWarning
	})
}
