import { auth, signIn, signOut } from "@/auth";

export default async function SignIn() {
  const session = await auth();

  const user = session?.user;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {user ? "Welcome Back!" : "Sign In to Your Account"}
        </h1>
        <p className="text-gray-600 mb-6">
          {user
            ? `Logged in as ${user.name}`
            : "Access your personalized dashboard."}
        </p>
        {user ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-all"
            >
              Sign Out
            </button>
          </form>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all"
            >
              Sign in with Google
            </button>
          </form>
        )}
        <div className="mt-4 text-sm text-gray-500">
          {user
            ? "Want to sign in with a different account?"
            : "By signing in, you agree to our terms and privacy policy."}
        </div>
      </div>
    </div>
  );
}
