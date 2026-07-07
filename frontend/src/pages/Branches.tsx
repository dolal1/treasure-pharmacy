import { useBranches } from "../api/hooks";
import { MapPinIcon, PhoneIcon } from "../components/icons";

export default function Branches() {
  const { data: branches, isLoading } = useBranches();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900">Our branches</h1>
        <p className="mt-4 text-lg text-slate-600">
          Three locations across Kampala — walk in any day, or book online and skip the queue.
        </p>
      </div>

      {isLoading && <p className="mt-12 text-slate-500">Loading branches…</p>}

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {(branches ?? []).map((branch) => (
          <div
            key={branch.id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            {branch.maps_embed_url ? (
              <iframe
                src={branch.maps_embed_url}
                title={`Map — ${branch.name}`}
                className="h-56 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="flex h-56 items-center justify-center bg-slate-100 text-slate-400">
                <MapPinIcon className="h-10 w-10" />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-slate-900">{branch.name}</h2>
              <p className="mt-2 flex items-start gap-2 text-sm text-slate-600">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                {branch.address}
              </p>
              {branch.phone && (
                <a
                  href={`tel:${branch.phone.replace(/\s/g, "")}`}
                  className="mt-2 flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  <PhoneIcon className="h-4 w-4" /> {branch.phone}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
