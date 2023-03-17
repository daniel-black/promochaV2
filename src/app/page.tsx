import Link from "next/link";


export default function LandingPage() {
  return (
    <main className="px-4 py-20 text-center space-y-4">
      <h1 className="text-5xl text-neutral-900">Run promotions like a pro.</h1>
      <h2 className="text-2xl text-neutral-700">Manage promocodes and analytics all in one place</h2>
      <div className="space-x-5 text-lg">
        <Link href={'/sign-up'} className="underline underline-offset-4">Get Started</Link>
      </div>
    </main>
  );
}