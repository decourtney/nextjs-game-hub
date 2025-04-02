import React from "react";
import RegistrationForm from "./RegistrationForm";
import OAuthButtons from "../components/OAuthButtons";

const RegisterPage = () => {
  return (
    <section className="min-h-svh">
      <div className="md:max-w-[960px] md:mt-5 mx-auto bg-emerald-50 dark:bg-emerald-950 border-b-1 md:border-1 border-emerald-200 dark:border-emerald-800 rounded-sm shadow-md">
        {/* Heading */}
        <div className="p-8">
          <h2 className="text-emerald-700 dark:text-emerald-300">
            Create an account
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* OAuth Login */}
          <div className="col-span-1 p-8 border-t-1 border-emerald-200 dark:border-emerald-800">
            <h3 className="text-emerald-700 dark:text-emerald-300">
              Register with
            </h3>
            <OAuthButtons />

            {/* Divider with OR */}
            <div className="flex items-center justify-center my-6">
              <hr className="flex-grow border-t border-emerald-200 dark:border-emerald-800" />
              <span className="px-4 font-bold text-sm text-emerald-600 dark:text-emerald-400">
                OR
              </span>
              <hr className="flex-grow border-t border-emerald-200 dark:border-emerald-800" />
            </div>

            {/* Registration Form */}
            <RegistrationForm />
          </div>

          {/* Information Section */}
          <div className="col-span-1 p-8 border-t-1 md:border-l-1 border-emerald-200 dark:border-emerald-800">
            <p className="text-emerald-700 dark:text-emerald-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
              quod nisi minus eligendi officia natus nihil facere, culpa sequi
              consequuntur officiis, veritatis ullam voluptate, nobis est
              reprehenderit accusantium tenetur ipsam amet. Vitae, eum maxime ab
              vero et itaque distinctio illo pariatur tempora ad, sint facilis
              numquam delectus culpa, ullam eos..
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
