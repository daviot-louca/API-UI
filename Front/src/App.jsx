/* ROUTER */
import { Routes, Route } from "react-router-dom";

/* PAGES ADMIN*/
import AdminPageTickets from "./pages/admin/AdminPageTickets";
import AdminPageUsers from "./pages/admin/AdminPageUsers";
import AdminPageDashboard from "./pages/admin/AdminPageDashboard";
import AdminPageCategories from "./pages/admin/AdminPageCategories";
import AdminPageMessagerie from "./pages/admin/AdminPageMessagerie";
import AdminMessagerieVide from "./components/admin/messagerie/AdminMessagerieVide";
import AdminPageTags from "./pages/admin/AdminPageTags";
import AdminPageCategoryTag from "./pages/admin/AdminPageCategoryTags";
import AdminPageConnaissances from "./pages/shared/AdminPageConnaissances";
import AdminPageConnaissancesDetail from "./pages/shared/AdminPageConnaissancesDetail";
import AdminPageConnaissancesCreate from "./pages/admin/AdminPageConnaissancesCreate";
import AdminPageEdit from "./pages/admin/AdminPageEdit";
/* PAGES SHARED*/
import LoginPage from "./pages/shared/LoginPage";
import RegisterPage from "./pages/shared/RegisterPage";
import HomePage from "./pages/shared/HomePage";

/* PAGES USER*/
import UserPage from "./pages/user/UserPage";
import Message from "./pages/user/Message";
import TicketPage from "./pages/user/TicketPage";
import FAQ from "./pages/user/FAQ";

/* PROTECTED ROUTES */
import ProtectedRoute from "./components/shared/ProtectedRoute";
import MessageVide from "./components/user/messages/MessageVide";
import DashboardLayout from "./components/admin/layout/DashboardLayout";
import DashboardLayoutUser from "./components/user/layout/DashboardLayoutUser";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* HOME */}
        <Route path="/home" element={<HomePage />} />

        {/* REGISTER */}
        <Route path="/register" element={<RegisterPage />} />

        {/* LOGIN */}
        <Route path="/login" element={<LoginPage />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/ticket"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminPageTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminPageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminPageDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messagerie/:ticketId"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminPageMessagerie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messagerie"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminMessagerieVide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminPageCategories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tags"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminPageTags />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tags/:categoryId"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminPageCategoryTag />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/connaissances"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <DashboardLayout>
                <AdminPageConnaissances />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/connaissances/:connaissanceId"
          element={
            <ProtectedRoute allowedRole="administrateur">
              <DashboardLayout>
                <AdminPageConnaissancesDetail />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={"/admin/connaissances/create"}
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminPageConnaissancesCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/admin/connaissances/edit/:editId"}
          element={
            <ProtectedRoute allowedRole="administrateur">
              <AdminPageEdit />
            </ProtectedRoute>
          }
        />
        {/* USER ROUTES */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRole="utilisateur">
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/tickets"
          element={
            <ProtectedRoute allowedRole="utilisateur">
              <TicketPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/message"
          element={
            <ProtectedRoute allowedRole="utilisateur">
              <MessageVide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/message/:ticketId"
          element={
            <ProtectedRoute allowedRole="utilisateur">
              <Message />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/faq"
          element={
            <ProtectedRoute allowedRole="utilisateur">
              <FAQ />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/user/connaissances"}
          element={
            <DashboardLayoutUser>
              <AdminPageConnaissances />
            </DashboardLayoutUser>
          }
        />
        <Route
  path={"/user/connaissances/:connaissanceId"}
  element={
    <DashboardLayoutUser>
      <AdminPageConnaissancesDetail />
    </DashboardLayoutUser>
  }
/>
      </Routes>
    </div>
  );
}

export default App;
