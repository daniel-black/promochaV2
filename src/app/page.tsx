import { SparklesIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="px-4 py-28 text-center space-y-16 h-screen overflow-y-hidden bg-hero-pattern">
      <div className="text-7xl font-bold text-transparent space-y-2 bg-clip-text bg-gradient-to-br from-violet-900 to via-violet-800">
        <h1>Run promotions</h1>
        <h1>like a <span className="italic">pro</span>.</h1>
      </div>
      <h2 className="text-4xl text-violet-800 opacity-90">Manage promocodes and analytics all in one place</h2>
      <div className="space-x-5 text-lg flex justify-center">
        <Link
          href={'/sign-up'}
          className="text-2xl px-6 py-3 rounded-xl border border-violet-400 bg-violet-300 text-violet-800 flex items-center w-fit space-x-3"
        >
          <SparklesIcon className="h-6 w-6" />
          <span>Get Started</span>
        </Link>
      </div>
    </main>
  );
}