import { ArrowUpIcon } from "@heroicons/react/24/outline";

export default function SignInRecommendation() {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-80">
      <h1 className="text-3xl font-bold text-slate-100 float-right text-right">
        <ArrowUpIcon className="h-32 w-32 float-right" aria-hidden="true" />
        <br />
        Welcome to Developer Journey App.
        <br />
        Sign in to play!
      </h1>
    </div>
  )
}
