import { useQuery } from '@tanstack/react-query'
import { paymentMethodsApi } from '~/api/payment-method'

const useQueryPaymentMethodAll = () => {
	const data = useQuery({
		queryKey: ['get-all-payment-method'],
		queryFn: () => paymentMethodsApi.getAll().then((data) => data.data),
		staleTime: 5 * 60 * 1000
	})

	return { ...data }
}

export default useQueryPaymentMethodAll
