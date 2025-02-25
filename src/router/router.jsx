import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DasboardLayout from "../layouts/DasboardLayout";
import DashboardHome from "../pages/DashboardHome";
import OverViewPage from "../pages/OverViewPage";
import TransactionPage from "../pages/TransactionPage";
import StatisticsPage from "../pages/StatisticsPage";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    }, 
    {
        path: 'register', 
        element: <RegisterPage />
    },
    {
        path: '/dashboard',
        element: <DasboardLayout />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardHome />
            },
            {
                path: '/dashboard/overview',
                element: <OverViewPage />
            },
            {
                path: '/dashboard/transaction',
                element: <TransactionPage />
            },
            {
                path: '/dashboard/statistics',
                element: <StatisticsPage />
            }
        ]
    }
])