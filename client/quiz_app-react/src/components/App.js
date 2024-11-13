import { jsx as _jsx } from "react/jsx-runtime";
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
    return _jsx(Quiz, { userId: userId });
}
const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(Main, {}),
    },
    {
        path: '/quiz',
        element: _jsx(QuizWrapper, {}),
    },
    {
        path: '/score',
        element: _jsx(Score, {}),
    },
]);
const queryClient = new QueryClient();
function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(RouterProvider, { router: router }) }));
}
export default App;
