import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MySchedulesPage from "./pages/MySchedulesPage";
import GitHubPage from "./pages/GitHubPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route path="" element={<LoginPage />} />
                    <Route path="schedules" element={<MySchedulesPage />} />
                    <Route path='repo' element={<GitHubPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}