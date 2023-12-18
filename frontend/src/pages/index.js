import { createBrowserRouter } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Register from './Register';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
]);

export default router;
