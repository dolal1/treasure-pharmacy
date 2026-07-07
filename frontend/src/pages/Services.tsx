import { useServiceCategories } from "../api/hooks";
import ServiceCard from "../components/ServiceCard";
import { CategoryIcon } from "../lib/categories";

export default function Services() {
  const { data: categories, isLoading, isError } = useServiceCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900">Our services</h1>
        <p className="mt-4 text-lg text-slate-600">
          Transparent prices, licensed professionals, and written confirmation for every
          booking. All prices in Ugandan Shillings.
        </p>
      </div>

      {isLoading && <p className="mt-12 text-slate-500">Loading services…</p>}
      {isError && (
        <p className="mt-12 text-slate-500">
          We couldn't load the service list. Please refresh, or reach us on WhatsApp.
        </p>
      )}

      {(categories ?? []).map((category) => (
        <section key={category.slug} className="mt-14" aria-labelledby={category.slug}>
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-lg bg-teal-50 p-2.5 text-teal-700">
              <CategoryIcon slug={category.slug} className="h-6 w-6" />
            </span>
            <div>
              <h2 id={category.slug} className="text-2xl font-bold text-slate-900">
                {category.name}
              </h2>
              {category.blurb && <p className="text-sm text-slate-600">{category.blurb}</p>}
            </div>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
