import React, { useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <>
      {isLogin ? (
        <LoginModal
          isOpen={isOpen}
          onClose={onClose}
          onSwitchToSignup={switchToSignup}
        />
      ) : (
        <SignupModal
          isOpen={isOpen}
          onClose={onClose}
          onSwitchToLogin={switchToLogin}
        />
      )}
    </>
  );
}
