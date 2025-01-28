import React from "react";

export default function DashboardContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-2 flex flex-1 flex-col">
      <h2 className="text-2xl font-medium">{title}</h2>
      {children}
    </div>
  );
}
