// app/auth/page.tsx

import { AuthContainer } from "@/components/AuthForms";
import { getCustomSession } from '@/lib/session'
import GitHubSignInButton from "@/components/GithubSignInButton";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await getCustomSession();
  console.log(session)
  // Redirect if already authenticated via NextAuth
  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome Back
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Choose your preferred sign-in method
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* GitHub Auth Option */}
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <GitHubSignInButton />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with username</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Username/Password Auth */}
        <AuthContainer />
      </div>
    </div>
  );
}

