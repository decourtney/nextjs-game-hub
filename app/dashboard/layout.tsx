import React from "react";
import DashboardNavbar from "./DashboardNavbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="max-w-[800px] mx-auto mt-5 border">
      <div className="p-5 border-b">
        <h1>Dashboard</h1>
      </div>
      <DashboardNavbar />
      <div className="p-5 border-t">{children}</div>
    </section>
  );
};

export default layout;
