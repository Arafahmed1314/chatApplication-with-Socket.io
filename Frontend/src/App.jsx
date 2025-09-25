import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./context/AuthProvider";
import useConversation from "./stateManage/useConversation";
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
    const { selectedConversation } = useConversation();

    return (
      <div className="flex h-screen w-full relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Mobile and Desktop Layout */}
        <div className="flex w-full h-full relative">
          {/* Left sidebar - Hidden on mobile when conversation is selected */}
          <div
            className={`w-full md:w-1/3 lg:w-1/4 md:flex-shrink-0 relative z-10 transition-transform duration-300 ${
              selectedConversation ? "hidden md:flex" : "flex"
            }`}
          >
            <Left />
          </div>

          {/* Right chat area - Show on mobile when conversation is selected */}
          <div
            className={`w-full md:w-2/3 lg:w-3/4 relative z-10 transition-transform duration-300 ${
              selectedConversation ? "flex" : "hidden md:flex"
            }`}
          >
            <Right />
          </div>
        </div>

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

      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        closeButton={false}
        style={{
          borderRadius: "12px",
        }}
      />
    </Router>
  );
}
