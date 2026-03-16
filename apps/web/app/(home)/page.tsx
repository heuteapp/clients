"use client";

import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 gap-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to HeuteApp</h1>
      <div className="flex gap-4">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
        <button
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          onClick={() => router.push("/signup")}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default HomePage;