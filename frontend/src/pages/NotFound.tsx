import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <p className="text-6xl font-extrabold text-teal-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        We couldn't find that page
      </h1>
      <p className="mt-3 text-slate-600">
        The link may be broken or the page may have moved. Everything we offer is one click
        away from the homepage.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
      >
        Back to home
      </Link>
    </div>
  );
}
