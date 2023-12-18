import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import router from './pages';
import UserProvider from './core/UserProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
