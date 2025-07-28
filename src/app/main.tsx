
import { queryClient } from '@/app/config'
import { router } from '@/app/router'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

export function EntryPoint() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider value={defaultSystem}>
                    <RouterProvider router={router} />
                </ChakraProvider>
            </QueryClientProvider>
        </StrictMode>
    )
}

createRoot(document.getElementById('root')!).render(<EntryPoint />)
