import ReactDOM from 'react-dom/client';
import MainLayout from './layouts/MainLayout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFoundPage from './pages/NotFoundPage';
import MySchedulesPage from './pages/MySchedulesPage';
import GitHubPage from './pages/GitHubPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLayout />}>

        <Route path="schedules" element={<MySchedulesPage />} />
        <Route path='repo' element={<GitHubPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);