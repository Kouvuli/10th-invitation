import { ReactNode } from "react";
import ThemeToggle from "../components/ThemeToggle";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div
      className="
        min-h-screen
        text-text
        bg-linear-to-br
        from-base
        to-base-light
        transition-colors duration-500
        "
    >
      {/* Theme toggle nổi, không ảnh hưởng scroll */}
      <ThemeToggle />

      {children}
    </div>
  );
}
