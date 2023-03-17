import { LayoutProps } from "../layout";

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="py-14 flex justify-center">
      {children}
    </div>
  );
}