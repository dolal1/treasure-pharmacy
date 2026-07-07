import { Link } from "react-router-dom";
import { useContent } from "../api/hooks";
import { CheckCircleIcon, HomeIcon, ShieldIcon } from "../components/icons";

const values = [
  {
    icon: ShieldIcon,
    title: "Licensed & accountable",
    text: "Every pharmacist, clinical officer and nurse on our team is fully licensed and works under clear clinical protocols.",
  },
  {
    icon: HomeIcon,
    title: "Care that comes to you",
    text: "From medication delivery to overnight bedside nursing, we bring professional care into your home.",
  },
  {
    icon: CheckCircleIcon,
    title: "Transparent pricing",
    text: "Every service has a published price. No surprises at the counter, no hidden fees on a home visit.",
  },
];

export default function About() {
  const { data: content } = useContent();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900">About Treasure Pharmacy</h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-600">
          {content?.["about-intro"]?.text ??
            "Treasure Pharmacy combines licensed pharmaceutical care with a modern digital clinic, serving neighbourhoods across Kampala."}
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="rounded-xl border border-slate-200 p-6">
            <span className="inline-flex rounded-lg bg-teal-50 p-2.5 text-teal-700">
              <value.icon className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">{value.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-xl bg-slate-50 p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          Questions about a service or a prescription?
        </h2>
        <p className="mt-2 text-slate-600">
          Our team answers on WhatsApp every day — or book directly online.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/contact"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 hover:border-teal-600 hover:text-teal-700"
          >
            Contact us
          </Link>
          <Link
            to="/book"
            className="rounded-lg bg-teal-600 px-5 py-2.5 font-semibold text-white hover:bg-teal-700"
          >
            Book a service
          </Link>
        </div>
      </div>
    </div>
  );
}
