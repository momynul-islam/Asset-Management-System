import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Departments from "./pages/Departments";
import Vendors from "./pages/Vendors";
import Users from "./pages/Users";
import Activities from "./pages/Activities";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="assets" element={<Assets />} />
        <Route path="departments" element={<Departments />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="users" element={<Users />} />
        <Route path="activities" element={<Activities />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 2000,
              style: {
                backgroundColor: "#1f2937",
                color: "#d1d5db",
                border: "1px solid #10b981",
              },
            },
            error: {
              duration: 3000,
              style: {
                backgroundColor: "#1f2937",
                color: "#d1d5db",
                border: "1px solid #ef4444",
              },
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#1f2937",
              color: "#f3f4f6",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            },
          }}
        />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
