import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

// Lazy loaded components
const Layout = lazy(() => import("./components/Layout"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Home = lazy(() => import("./pages/Home"));

const VisitorPass = lazy(() => import("./pages/Visitor/VisitorPass"));
const VisitorDashboard = lazy(() => import("./pages/Visitor/Dashboard"));
const VisitorReports = lazy(() => import("./pages/Visitor/Reports"));
const VisitorInOut = lazy(() => import("./pages/Visitor/VisitorInOut"));
const VisitorPassDisplay = lazy(() =>
  import("./pages/Visitor/VisitorPassDisplay")
);
const VisitorHistory = lazy(() => import("./pages/Visitor/VisitorHistory"));

const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded((prev) => !prev);
  };

  const userRole = useSelector((state) => state.auth.user?.role || "");

  const canAccess = (allowedRoles) =>
    allowedRoles.includes(userRole) || userRole === "admin";
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Layout Route */}
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <Layout
                isSidebarExpanded={isSidebarExpanded}
                toggleSidebar={toggleSidebar}
              />
            }
          >
            <Route path="/" index element={<Home />} />

            {/*-------------------------------------------------------------- Visitor --------------------------------------------------------------*/}
            {canAccess(["admin", "security", "hr"]) && (
              <Route path="/visitor/dashboard" element={<VisitorDashboard />} />
            )}
            {canAccess(["admin", "security", "hr"]) && (
              <Route path="/visitor/generate-pass" element={<VisitorPass />} />
            )}
            {canAccess(["admin", "security", "hr"]) && (
              <Route
                path="/visitor-pass-display/:passId"
                element={<VisitorPassDisplay />}
              />
            )}
            {canAccess(["admin", "security", "hr"]) && (
              <Route path="/visitor/in-out" element={<VisitorInOut />} />
            )}
            {canAccess(["admin", "security", "hr"]) && (
              <Route path="/visitor/reports" element={<VisitorReports />} />
            )}
            {canAccess(["admin", "security", "hr"]) && (
              <Route path="/visitor/history" element={<VisitorHistory />} />
            )}

            {/*-------------------------------------------------------------- Catch All --------------------------------------------------------------*/}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
