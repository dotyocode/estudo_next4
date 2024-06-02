import Link from "next/link";
import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="w-full max-w-7xl mx-auto px-2">
    {children}
    </div>;
};

export default Container;
