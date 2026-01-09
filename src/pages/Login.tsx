import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MessageCircle, Chrome } from "lucide-react";

export default function Login() {
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-all hover:shadow-3xl">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 rounded-full bg-blue-100 p-4">
            <MessageCircle className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500">
            Sign in to access your chat rooms and conversations.
          </p>
        </div>

        <button
          onClick={signInWithGoogle}
          className="group flex w-full cursor-pointer items-center justify-center space-x-3 rounded-xl bg-white border-2 border-gray-100 px-6 py-3.5 font-semibold text-gray-700 transition-all hover:border-blue-100 hover:bg-blue-50 active:scale-95"
        >
          <Chrome className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
          <span>Sign in with Google</span>
        </button>

        <p className="mt-8 text-center text-xs text-gray-400">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
