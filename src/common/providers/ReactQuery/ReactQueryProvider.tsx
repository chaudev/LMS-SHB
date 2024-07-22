import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// staleTime: 10000,
			refetchOnWindowFocus: false,
			refetchOnMount: false
		}
	}
})

function ReactQueryProvider({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
			{children}
		</QueryClientProvider>
	)
}

export default ReactQueryProvider
