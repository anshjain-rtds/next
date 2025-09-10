// app/components/AuthForms.tsx
"use client";

import { useActionState, useTransition } from "react";
import {
  AuthFormState,
  signInAction,
  signUpAction,
} from "@/actions/auth-actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthFormProps {
  mode: "signin" | "signup";
  onToggleMode: () => void;
}

export default function AuthForm({ mode, onToggleMode }: AuthFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialAuthState: AuthFormState = { error: null };
  const [signInState, signInFormAction] = useActionState<
    AuthFormState,
    FormData
  >(signInAction, initialAuthState);

  const [signUpState, signUpFormAction] = useActionState<
    AuthFormState,
    FormData
  >(signUpAction, initialAuthState);

  const currentState = mode === "signin" ? signInState : signUpState;
  const currentAction = mode === "signin" ? signInFormAction : signUpFormAction;

  // Handle successful auth
  useEffect(() => {
    if ("success" in currentState && currentState.success) {
      startTransition(() => {
        router.refresh();
      });
    }
  }, [currentState, router]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {mode === "signin" ? "Sign In" : "Sign Up"}
      </h2>

      <form action={currentAction} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            username
          </label>
          <input
            type="username"
            id="username"
            name="username"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isPending}
          />
          {currentState?.fieldErrors?.username && (
            <p className="mt-1 text-sm text-red-600">
              {currentState.fieldErrors.username[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isPending}
          />
          {currentState?.fieldErrors?.password && (
            <p className="mt-1 text-sm text-red-600">
              {currentState.fieldErrors.password[0]}
            </p>
          )}
        </div>
        {mode === "signup" &&
          "success" in currentState &&
          currentState.success && (
            <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded text-center">
              Signup successful! You can now sign in.
            </div>
          )}
        {currentState?.error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {currentState.error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending
            ? "Processing..."
            : mode === "signin"
            ? "Sign In"
            : "Sign Up"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={onToggleMode}
          className="text-blue-600 hover:text-blue-500 text-sm"
          disabled={isPending}
        >
          {mode === "signin"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}

// Combined component that handles both signin and signup
export function AuthContainer() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <AuthForm
      mode={mode}
      onToggleMode={() => setMode(mode === "signin" ? "signup" : "signin")}
    />
  );
}
