import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from './App';
import Main from './components/Main/Main';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Main />} />
      <Route path=":page" element={<Main />} />
      <Route path=":page/:pokemonName" element={<Main />} />
    </Route>
  )
);
