import { Link } from "react-router-dom";
import { useBranches, useContent, useServiceCategories } from "../api/hooks";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  ShieldIcon,
  WhatsAppIcon,
} from "../components/icons";
import { CategoryIcon } from "../lib/categories";

const steps = [
  {
    title: "Choose a service",
    text: "Pick from lab tests, consultations, home care or bedside nursing — prices upfront.",
  },
  {
    title: "Tell us when and where",
    text: "Select your preferred date, time and branch — or request a visit at home.",
  },
  {
    title: "Get your reference",
    text: "You receive an instant booking reference and email confirmation. Our team calls to confirm.",
  },
];

export default function Home() {
  const { data: content } = useContent();
  const { data: categories } = useServiceCategories();
  const { data: branches } = useBranches();
  const whatsapp = content?.["whatsapp-number"]?.text ?? "256700123000";

  return (
    <>
      {content?.["home-announcement"]?.text && (
        <div className="bg-teal-900 px-4 py-2 text-center text-sm text-teal-50">
          {content["home-announcement"].text}
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold tracking-wide text-teal-800 uppercase">
              <ShieldIcon className="h-3.5 w-3.5" /> Licensed pharmacy · Kampala
            </p>
            <h1 className="mt-5 text-4xl leading-tight font-extrabold text-slate-900 sm:text-5xl">
              {content?.["home-hero-heading"]?.text ?? "Your health, delivered with care."}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              {content?.["home-hero-subheading"]?.text ??
                "Book lab tests, consultations and home care from Kampala's trusted pharmacy — online, in minutes."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="rounded-lg bg-teal-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
              >
                Book a service
              </Link>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:border-teal-600 hover:text-teal-700"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> Chat on WhatsApp
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
              {["Same-day lab results", "3 branches in Kampala", "Home visits available"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-1.5">
                    <CheckCircleIcon className="h-4 w-4 text-teal-600" /> {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(categories ?? []).map((category) => (
              <Link
                key={category.slug}
                to="/services"
                className="group rounded-2xl border border-teal-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-md"
              >
                <span className="inline-flex rounded-xl bg-teal-50 p-3 text-teal-700 group-hover:bg-teal-600 group-hover:text-white">
                  <CategoryIcon slug={category.slug} className="h-7 w-7" />
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">{category.name}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {category.services.length} service{category.services.length === 1 ? "" : "s"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services overview */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-slate-900">A complete digital clinic</h2>
          <p className="mt-3 text-lg text-slate-600">
            Everything you'd walk into a pharmacy for — now one booking away.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(categories ?? []).map((category) => (
            <div
              key={category.slug}
              className="flex flex-col rounded-xl border border-slate-200 p-6"
            >
              <span className="inline-flex w-fit rounded-lg bg-teal-50 p-2.5 text-teal-700">
                <CategoryIcon slug={category.slug} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{category.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {category.blurb}
              </p>
              <Link
                to="/services"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 hover:text-teal-800"
              >
                View services <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900">Booking takes two minutes</h2>
            <p className="mt-3 text-lg text-slate-600">
              No queues, no phone tag — and you always get a written confirmation.
            </p>
          </div>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="relative rounded-xl bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-lg font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Branches strip */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Find us across Kampala</h2>
            <p className="mt-3 text-lg text-slate-600">
              Walk in at any branch, or let us come to you.
            </p>
          </div>
          <Link
            to="/branches"
            className="inline-flex items-center gap-1.5 font-medium text-teal-700 hover:text-teal-800"
          >
            All branches &amp; maps <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {(branches ?? []).map((branch) => (
            <div key={branch.id} className="rounded-xl border border-slate-200 p-6">
              <span className="inline-flex rounded-lg bg-teal-50 p-2.5 text-teal-700">
                <MapPinIcon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-semibold text-slate-900">{branch.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{branch.address}</p>
              {branch.phone && (
                <p className="mt-2 text-sm font-medium text-teal-700">{branch.phone}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-gradient-to-r from-teal-700 to-teal-600">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
          <ClockIcon className="h-10 w-10 text-teal-200" />
          <h2 className="max-w-2xl text-3xl font-bold text-white">
            Skip the waiting room. Book your next test or consultation now.
          </h2>
          <Link
            to="/book"
            className="rounded-lg bg-white px-8 py-3 text-base font-semibold text-teal-700 shadow-sm transition-colors hover:bg-teal-50"
          >
            Book a service
          </Link>
        </div>
      </section>
    </>
  );
}
