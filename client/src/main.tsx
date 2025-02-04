import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import MainPage from './pages/MainPage.tsx';
import VolunteerPage from './pages/VolunteerPage.tsx';
import VolunteerForm from './pages/VolunteerForm.tsx';
import EditVolunteer from './pages/EditVolunteer.tsx';
import EditWork from './pages/EditWork.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />
      }, 
      {
        path: '/show-volunteers',
        element: <VolunteerPage />
      },
      {
        path: '/new-volunteer',
        element: <VolunteerForm />
      },
      {
        path: '/edit-volunteer',
        element: <EditVolunteer />
      },
      {
        path: '/edit-work',
        element: <EditWork />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}
