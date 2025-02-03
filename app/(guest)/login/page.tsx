import { Logo } from "@/components/atoms/Avatar/Logo/Logo";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-blue-300">
      <Logo className="text-white" />
      <h1 className="text-white text-4xl font-semibold mb-3">Sign in</h1>
      <SignIn routing="hash" fallbackRedirectUrl={"/"} />
    </div>
  );
}
