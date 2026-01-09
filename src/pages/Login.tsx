import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-blue-50">
      <div className="text-center">
        <h1 className="mb-8 text-4xl font-bold text-blue-600">Chat App</h1>
        <button
          onClick={signInWithGoogle}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-blue-700 hover:shadow-xl"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
