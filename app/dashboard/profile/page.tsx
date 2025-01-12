import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth();
  const user = session?.user;
  const handleSignOut = async () => {
    "use server";
    await signOut();
    redirect("/");
  };

  const handleSwitchAccount = async () => {
    "use server";
    await signOut(); // Sign out of the current account
    await signIn("google", { redirectTo: "/dashboard" }); // Redirect to Google OAuth for signing in with another account
  };

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
          <form action={handleSignOut}>
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
          {user ? (
            <form action={handleSwitchAccount}>
              <button className="text-blue-500 hover:underline focus:outline-none">
                Want to sign in with a different account?
              </button>
            </form>
          ) : (
            "By signing in, you agree to our terms and privacy policy."
          )}
        </div>
      </div>
    </div>
  );
}
