import { createBrowserRouter } from 'react-router-dom';

import FactChecker from './views/FactChecker/FactChecker';
import Home from './views/Home/Home';


const router = createBrowserRouter([
  {
    Component: Home, 
    path: '/',
  },
  {
    Component: FactChecker,
    path: '/fact-checker',
  },
]);

export default router;
