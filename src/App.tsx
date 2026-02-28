import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout';
import {
  HomePage,
  DashboardPage,
  SeparationPage,
  GenerationPage,
  LibraryPage,
  LoginPage,
  RegisterPage,
} from '@/pages';
import { useAuthStore } from '@/store';

// 保护路由组件
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 公开路由 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 受保护路由 */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/separation"
          element={
            <ProtectedRoute>
              <Layout>
                <SeparationPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/generation"
          element={
            <ProtectedRoute>
              <Layout>
                <GenerationPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Layout>
                <LibraryPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 404 重定向 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
