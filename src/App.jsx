import { QueryClient, QueryClientProvider } from 'react-query';
import { DataProvider } from './context/BookContext';
import './App.css'
import AppRoutes from './config/AppRoutes';

function App() {
  const queryClient=new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <DataProvider>
          {AppRoutes()}
        </DataProvider>
    </QueryClientProvider>
  )
}

export default App
