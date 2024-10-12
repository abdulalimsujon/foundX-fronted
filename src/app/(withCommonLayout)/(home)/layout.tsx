import { ReactNode } from "react";

const layout = ({
  children,
  recentPosts,
}: {
  children: ReactNode;
  recentPosts: ReactNode;
}) => {
  return (
    <div>
      {children}
      {recentPosts}
    </div>
  );
};

export default layout;
