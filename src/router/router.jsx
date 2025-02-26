import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";
import MainLayout from "../layouts/MainLayout";
import SendMoneyPage from "../pages/SendMoneyPage";
import CashOutPage from "../pages/CashOutPage";
import CashInPage from "../pages/CashInPage";
import RequestMoneyPage from "../pages/RequestMoneyPage";
import AgentApprovalPage from "../pages/AgentApprovalPage";
import AdminUserManagementPage from "../pages/AdminUserManagementPage";
import TransactionHistoryPage from "../pages/TransactionHistoryPage";
import BalanceInquiryPage from "../pages/BalanceInquiryPage";
import AdminRechargeRequests from "../pages/AdminRechargeRequests";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <LoginPage />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoutes>
                    <DashboardHome />
                </PrivateRoutes>
            },
            {
                path: '/dashboard/overview',
                element: <PrivateRoutes>
                    <DashboardHome />
                </PrivateRoutes>
            },
            {
                path: '/dashboard/sendmoney',
                element: <PrivateRoutes>
                    <SendMoneyPage />
                </PrivateRoutes>
            },
            {
                path: '/dashboard/cashout',
                element: <PrivateRoutes>
                    <CashOutPage />
                </PrivateRoutes> 
            },
            {
                path: '/dashboard/cashin',
                element: <PrivateRoutes>
                    <CashInPage />
                </PrivateRoutes> 
            },
            {
                path: '/dashboard/requestmoney',
                element: <PrivateRoutes>
                    <RequestMoneyPage />
                </PrivateRoutes> 
            },
            {
                path: '/dashboard/agentmoneyrequest',
                element: <PrivateRoutes>
                    <AdminRechargeRequests />
                </PrivateRoutes> 
            },
            {
                path: '/dashboard/agentrequest',
                element: <PrivateRoutes>
                    <AgentApprovalPage />
                </PrivateRoutes> 
            },
            {
                path: '/dashboard/manageusers',
                element: <PrivateRoutes>
                    <AdminUserManagementPage />
                </PrivateRoutes> 
            },
            {
                path: '/dashboard/transactionhistory',
                element: <PrivateRoutes>
                    <TransactionHistoryPage />
                </PrivateRoutes> 
            },
            {
                path: '/dashboard/balanceinquiry',
                element: <PrivateRoutes>
                    <BalanceInquiryPage />
                </PrivateRoutes>
            }
        ]
    }
])