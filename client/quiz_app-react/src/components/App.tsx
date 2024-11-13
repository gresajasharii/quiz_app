import '../styles/App.module.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './Main';
import Quiz from './Quiz';
import Score from './Score';
import { useLocation } from 'react-router-dom';

// Wrapper component to pass userId to Quiz
function QuizWrapper() {
  const location = useLocation();
  const userId = location.state?.userId || '';

  return <Quiz userId={userId} />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/quiz',
    element: <QuizWrapper />,
  },
  {
    path: '/score',
    element: <Score />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
