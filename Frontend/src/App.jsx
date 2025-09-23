import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import AuthModal from "./components/AuthModal";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import Left from "./home/left/Left";
import Right from "./home/right/Right";

// Standalone login page component
const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <LoginModal
        isOpen={true}
        onClose={() => {}}
        onSwitchToSignup={() => navigate("/signup")}
      />
    </div>
  );
};

// Standalone signup page component
const SignupPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <SignupModal
        isOpen={true}
        onClose={() => {}}
        onSwitchToLogin={() => navigate("/login")}
      />
    </div>
  );
};

export default function App() {
  const { authUser } = useAuth();

  // Chat page component with auth modal
  const ChatPage = () => {
    return (
      <div className="flex h-screen w-full relative">
        <Left />
        <Right />

        {/* Show auth modal if user is not authenticated */}
        {!authUser && (
          <AuthModal
            isOpen={!authUser}
            onClose={() => {}} // Modal closes when user logs in
          />
        )}
      </div>
    );
  };

  return (
    <Router>
      <div className="flex h-screen">
        <Routes>
          {/* Chat page with modal */}
          <Route path="/chat" element={<ChatPage />} />

          {/* Standalone auth routes using modal components */}
          <Route
            path="/login"
            element={
              !authUser ? <LoginPage /> : <Navigate to="/chat" replace />
            }
          />
          <Route
            path="/signup"
            element={
              !authUser ? <SignupPage /> : <Navigate to="/chat" replace />
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/chat" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
