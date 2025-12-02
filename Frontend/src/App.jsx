import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

// Lazy loaded components
const Layout = lazy(() => import("./components/Layout"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Home = lazy(() => import("./pages/Home"));

const Dashboard = lazy(() => import("./pages/Visitor/Dashboard"));
const GeneratePass = lazy(() => import("./pages/Visitor/GeneratePass"));
const VisitorPassDisplay = lazy(() =>
  import("./pages/Visitor/VisitorPassDisplay")
);
const InOut = lazy(() => import("./pages/Visitor/InOut"));
const Reports = lazy(() => import("./pages/Visitor/Reports"));
const History = lazy(() => import("./pages/Visitor/History"));

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
              <Route path="/visitor/dashboard" element={<Dashboard />} />
            )}
            {canAccess(["admin", "security", "hr"]) && (
              <Route path="/visitor/generate-pass" element={<GeneratePass />} />
            )}
            {canAccess(["admin", "security", "hr"]) && (
              <Route
                path="/visitor-pass-display/:passId"
                element={<VisitorPassDisplay />}
              />
            )}
            {canAccess(["admin", "security", "hr"]) && (
              <Route path="/visitor/in-out" element={<InOut />} />
            )}
            {canAccess(["admin", "security", "hr"]) && (
              <Route path="/visitor/reports" element={<Reports />} />
            )}
            {canAccess(["admin", "security", "hr"]) && (
              <Route path="/visitor/history" element={<History />} />
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