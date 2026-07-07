import { Link, useParams } from "react-router-dom";
import { useService } from "../api/hooks";
import { ApiError } from "../api/client";
import { CheckCircleIcon } from "../components/icons";
import { CategoryIcon, HOME_VISIT_CATEGORIES } from "../lib/categories";
import { formatUGX } from "../lib/format";
import NotFound from "./NotFound";

const expectations = [
  "Instant booking reference and email confirmation",
  "A call from our team to confirm your appointment",
  "Care from licensed, experienced professionals",
];

export default function ServiceDetail() {
  const { slug } = useParams();
  const { data: service, isLoading, error } = useService(slug);

  if (error instanceof ApiError && error.status === 404) return <NotFound />;

  if (isLoading || !service) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-slate-500 sm:px-6">
        Loading service…
      </div>
    );
  }

  const isHomeVisit = HOME_VISIT_CATEGORIES.has(service.category);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-slate-500">
        <Link to="/services" className="hover:text-teal-700">
          Services
        </Link>{" "}
        / <span className="text-slate-700">{service.name}</span>
      </nav>

      <div className="mt-6 flex items-start gap-4">
        <span className="inline-flex rounded-xl bg-teal-50 p-3 text-teal-700">
          <CategoryIcon slug={service.category} className="h-8 w-8" />
        </span>
        <div>
          <p className="text-sm font-semibold tracking-wide text-teal-700 uppercase">
            {service.category_name}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">{service.name}</h1>
        </div>
      </div>

      <p className="mt-6 text-lg leading-relaxed text-slate-600">
        {service.description || service.short_description}
      </p>

      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Price</p>
            <p className="text-2xl font-bold text-slate-900">{formatUGX(service.price)}</p>
            {isHomeVisit && (
              <p className="mt-1 text-sm text-slate-500">
                Delivered at your home — no branch visit needed.
              </p>
            )}
          </div>
          <Link
            to={`/book?service=${service.slug}`}
            className="rounded-lg bg-teal-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
          >
            Book this service
          </Link>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-semibold text-slate-900">What to expect</h2>
      <ul className="mt-4 space-y-3">
        {expectations.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-slate-600">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
