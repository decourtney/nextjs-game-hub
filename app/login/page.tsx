import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import OAuthButtons from "../components/OAuthButtons";

const LoginPage = () => {
  // TODO: bug fix: login form does style adjustment when focused - probably due to font style change when focused
  return (
    <section>
      <div className="md:max-w-[500px] md:mt-10 mx-auto bg-emerald-50 dark:bg-emerald-950 border-b-1 md:border-1 border-emerald-200 dark:border-emerald-800 rounded-sm shadow-md">
        <div className="p-8 border-b-1 border-emerald-200 dark:border-emerald-800">
          <h2 className="text-emerald-700 dark:text-emerald-300">
            Log in to your account
          </h2>
        </div>

        <div className="p-8 mx-auto">
          <LoginForm />

          {/* Divider with OR */}
          <div className="flex items-center justify-center my-6">
            <hr className="flex-grow border-t border-emerald-200 dark:border-emerald-800" />
            <span className="px-4 font-bold text-sm text-emerald-600 dark:text-emerald-400">
              OR
            </span>
            <hr className="flex-grow border-t border-emerald-200 dark:border-emerald-800" />
          </div>

          <OAuthButtons />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
