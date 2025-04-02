"use client";

import { Button, Form, Input, Link } from "@heroui/react";
import { signIn } from "next-auth/react";
import React, { FormEvent } from "react";

const LoginForm = () => {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
    });

    console.log(result);
  };

  return (
    <Form
      className="flex flex-col w-full gap-10"
      validationBehavior="native"
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder=" "
        type="email"
        classNames={{
          base: "max-w-[30rem] md:max-w-full",
          mainWrapper: "h-full",
          input: "text-md",
          inputWrapper:
            "h-full font-normal bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300",
          label: "text-emerald-700 dark:text-emerald-300",
          errorMessage: "text-red-500 dark:text-red-400",
        }}
      />

      <Input
        isRequired
        errorMessage="Please enter a password"
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder=" "
        type="password"
        classNames={{
          base: "max-w-[30rem] md:max-w-full",
          mainWrapper: "h-full",
          input: "text-md",
          inputWrapper:
            "h-full font-normal bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300",
          label: "text-emerald-700 dark:text-emerald-300",
          errorMessage: "text-red-500 dark:text-red-400",
        }}
      />

      <div className="flex gap-2 items-center">
        <Button
          color="primary"
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Log in
        </Button>
        <span className="text-emerald-700 dark:text-emerald-300">
          or{" "}
          <Link
            href="/register"
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            Create account
          </Link>{" "}
          ·{" "}
          <Link
            href="/"
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            Forgot password
          </Link>
        </span>
      </div>
    </Form>
  );
};

export default LoginForm;
