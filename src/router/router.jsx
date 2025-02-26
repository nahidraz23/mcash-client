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
                element: <DashboardHome />
            },
            {
                path: '/dashboard/overview',
                element: <DashboardHome />
            },
            {
                path: '/dashboard/sendmoney',
                element: <SendMoneyPage />
            },
            {
                path: '/dashboard/cashout',
                element: <CashOutPage />
            },
            {
                path: '/dashboard/cashin',
                element: <CashInPage />
            },
            {
                path: '/dashboard/requestmoney',
                element: <RequestMoneyPage />
            }, 
            {
                path: '/dashboard/agentmoneyrequest',
                element: <AdminRechargeRequests />
            },
            {
                path: '/dashboard/agentrequest',
                element: <AgentApprovalPage />
            }, 
            {
                path: '/dashboard/manageusers',
                element: <AdminUserManagementPage />
            },
            {
                path: '/dashboard/transactionhistory',
                element: <TransactionHistoryPage />
            },
            {
                path: '/dashboard/balanceinquiry',
                element: <BalanceInquiryPage />
            }
        ]
    }
])