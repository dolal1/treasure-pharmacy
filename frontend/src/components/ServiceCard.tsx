import { Link } from "react-router-dom";
import type { Service } from "../api/types";
import { formatUGX } from "../lib/format";
import { ArrowRightIcon } from "./icons";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
        <span className="shrink-0 rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold whitespace-nowrap text-teal-700">
          {formatUGX(service.price)}
        </span>
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {service.short_description}
      </p>
      <div className="mt-5 flex items-center gap-3">
        <Link
          to={`/book?service=${service.slug}`}
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
        >
          Book now
        </Link>
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-800"
        >
          Details <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
