
import { router } from '@/app/router'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

export function EntryPoint() {
    return (
        <StrictMode>
            <ChakraProvider value={defaultSystem}>
                <RouterProvider router={router} />
            </ChakraProvider>
        </StrictMode>
    )
}

createRoot(document.getElementById('root')!).render(<EntryPoint />)
