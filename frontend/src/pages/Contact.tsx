import { Link } from "react-router-dom";
import { useBranches, useContent } from "../api/hooks";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "../components/icons";

export default function Contact() {
  const { data: content } = useContent();
  const { data: branches } = useBranches();
  const whatsapp = content?.["whatsapp-number"]?.text ?? "256700123000";

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-slate-900">Contact us</h1>
        <p className="mt-4 text-lg text-slate-600">
          The fastest way to reach us is WhatsApp — a pharmacist replies within minutes during
          opening hours (8:00–21:00, every day).
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <a
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hello Treasure Pharmacy!")}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-slate-200 p-6 transition-all hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
        >
          <span className="inline-flex rounded-lg bg-[#25D366]/10 p-2.5 text-[#25D366]">
            <WhatsAppIcon className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-semibold text-slate-900">WhatsApp</h2>
          <p className="mt-1 text-sm text-slate-600">Chat with a pharmacist now</p>
        </a>

        <a
          href="tel:+256700123000"
          className="rounded-xl border border-slate-200 p-6 transition-all hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
        >
          <span className="inline-flex rounded-lg bg-teal-50 p-2.5 text-teal-700">
            <PhoneIcon className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-semibold text-slate-900">Call us</h2>
          <p className="mt-1 text-sm text-slate-600">+256 700 123 000</p>
        </a>

        <a
          href="mailto:care@treasurepharmacy.example"
          className="rounded-xl border border-slate-200 p-6 transition-all hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md"
        >
          <span className="inline-flex rounded-lg bg-teal-50 p-2.5 text-teal-700">
            <MailIcon className="h-6 w-6" />
          </span>
          <h2 className="mt-4 font-semibold text-slate-900">Email</h2>
          <p className="mt-1 text-sm text-slate-600">care@treasurepharmacy.example</p>
        </a>
      </div>

      <h2 className="mt-14 text-2xl font-bold text-slate-900">Visit a branch</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {(branches ?? []).map((branch) => (
          <div key={branch.id} className="rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900">{branch.name}</h3>
            <p className="mt-2 flex items-start gap-2 text-sm text-slate-600">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              {branch.address}
            </p>
            {branch.phone && <p className="mt-2 text-sm text-slate-600">{branch.phone}</p>}
          </div>
        ))}
      </div>
      <Link
        to="/branches"
        className="mt-6 inline-block font-medium text-teal-700 hover:text-teal-800"
      >
        See maps and directions →
      </Link>
    </div>
  );
}
