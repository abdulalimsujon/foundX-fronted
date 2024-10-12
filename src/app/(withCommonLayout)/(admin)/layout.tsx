import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <h1>this is admin layout</h1>
      {children}
    </div>
  );
};

export default layout;
